package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"
   "net/http"
   "strings"
   "hash/crc32"
)

var database *gorm.DB
var err error

type User struct {
   ID uint `gorm:"AUTO_INCREMENT" json:"id" form:"id"`
   Email string `gorm: "not null; unique" json:"email" form:"email"`
   Username string `gorm:"not null;" json:"username" form:"username"`
   Password string `gorm:"not null" json:"password" "form:"password"`
   Score uint `json:"score" form:"score"`
   IsAdmin bool `gorm:"not null" json:"isadmin" form`
}

type Question struct {
   ID uint `gorm:"AUTO_INCREMENT" json:"id" form:"id"`
   Question string `json:"question" form:"question"`
   Quiz string `json:"quiz" form:"quiz"`
   Option1 string `json:"option1" form:"option1"`
   Option2 string `json:"option2" form:"option2"`
   Option3 string `json:"option3" form:"option3"`
   Option4 string `json:"option4" form:"option4"`
   Answer1 bool `json:"answer1" form:"answer1"`
   Answer2 bool `json:"answer2" form:"answer2"`
   Answer3 bool `json:"answer3" form:"answer3"`
   Answer4 bool `json:"answer4" form:"answer4"`
}

type Quiz struct {
   ID uint `gorm:"AUTO_INCREMENT; not null" json:"id" form:"id"`
   Title string `json:"title" form:"title"`
   Genre string `json:"genre" form:"genre"`
}

type FinishedQuizzes struct {
   Title string `json:"title" form:"title"`
   Email string `json:"email" form:"email"` //Email of the person attempting the quiz
   Score int `json:"score" form:"genre"`
}

type Genre struct {
   ID uint `gorm: "not null; unique" json:"id" form:"id"`
   Genre string `json:"genre" form:"genre"`
}

type OptionsStruct struct {
   Option1 string `json:"option1"`
   Option2 string `json:"option2"`
   Option3 string `json:"option3"`
   Option4 string `json:"option4"`
}

type AnswerStruct struct {
   Option1 bool `json:"option1"`
   Option2 bool `json:"option2"`
   Option3 bool `json:"option3"`
   Option4 bool `json:"option4"`
}

type tempQuestion struct {
   Question string `json:"question" form:"question"`
   Quizid uint `json:"quizid"`
   Genreid uint `json:"genreid" form:"genreid"`
   Options OptionsStruct `json:"options"`
   Answers AnswerStruct `json:"answers"`
}

type TempFinishedQuizStruct struct {
   ID uint `json:"id"`
   Email string `json:"email"`
   Title string `json:"title"`
   Answer1 bool `json:"answer1"`
   Answer2 bool `json:"answer2"`
   Answer3 bool `json:"answer3"`
   Answer4 bool `json:"answer4"`
}


func main() {
   database, err = gorm.Open("sqlite3", "./quiz.db")
   if err != nil {
      fmt.Println(err)
   }
   defer database.Close()

   database.AutoMigrate(&User{})
   database.AutoMigrate(&Question{})
   database.AutoMigrate(&Quiz{})
   database.AutoMigrate(&FinishedQuizzes{})
   database.AutoMigrate(&Genre{})

   r := gin.Default()

   r.POST ("/createUser", createUser)
   r.POST ("/login", login)
   r.POST ("/getPerson", getUser)

   r.POST ("/newQuestion", newQuestion)
   r.POST ("/createGenre", createGenre)
   r.POST ("/createQuiz", createQuiz)
   r.POST ("/createQuestion", createQuestion)
   r.POST ("/lookForQuiz", lookForQuiz)
   r.POST ("/FinishedQuiz", FinishedQuiz)
   r.POST ("/getScoresFromAttemptedQuizzes", getScoresFromAttemptedQuizzes)

   r.GET ("/getGenres", getAllGenre)
   r.GET ("/getScores", getScores)
   r.GET ("/getQuizzes", getAllQuizzes)
   r.POST ("/getSpecificQuizzes", getSpecificQuizzes)
   r.POST ("/getSpecificQuestions", getSpecificQuestions)

   r.GET ("/getUsers", getUsers)
   r.GET ("/getScoresForQuiz/:title", getScoresForQuiz)
   r.POST ("/updateQuestion", updateQuestion)
   r.DELETE ("/deleteQuestion/:id", deleteQuestion)
   r.DELETE ("/deleteUser/:id", deleteUser)

   r.Use((cors.Default()))

   r.Run(":8080")     
}

func getUsers (c *gin.Context) {
   var u []User
   if err := database.Find(&u).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, u)
   }
}


func getScoresFromAttemptedQuizzes (c *gin.Context) {
   var g FinishedQuizzes
   var tempG []FinishedQuizzes

   c.BindJSON(&g)

   if err := database.Where("email = ?", g.Email).Find(&tempG).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, tempG)
   }
}


func getScoresForQuiz (c *gin.Context) {
   id := c.Params.ByName("title")
   var tempG []FinishedQuizzes

   fmt.Println("title->"+id)

   if err := database.Where("title = ?", id).Order("score desc").Find(&tempG).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, tempG)
   }
}


func getScoresForGenre (c *gin.Context) {
   id := c.Params.ByName("title")
   var tempG []FinishedQuizzes

   fmt.Println("title->"+id)

   if err := database.Where("title = ?", id).Order("score desc").Select("DISTINCT \"score\".*").Find(&tempG).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, tempG)
   }
}

func getScores (c *gin.Context) {
   var tempG []FinishedQuizzes

   if err := database.Order("score desc").Find(&tempG).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, tempG)
   }
}


func createGenre (c *gin.Context) {
   var g Genre
   c.BindJSON(&g)  

   database.Create (&g)

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, g)
}

func createQuiz (c *gin.Context) {
   var q Quiz
   c.BindJSON(&q)

   database.Create (&q)

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, q)
}

func lookForQuiz (c *gin.Context) {
   var q Quiz
   var q2 Quiz
   c.BindJSON(&q)

   fmt.Println("%v", q)

   if err := database.Where("id = ?", q.ID).First(&q2).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.JSON(http.StatusOK, q2)
   }

   c.Header("access-control-allow-origin", "*")
}

func lookForQuestions (c *gin.Context) {
   var q Question
   var q2 []Question
   c.BindJSON(&q)

   fmt.Println("%v", q)

   if err := database.Where("id = ?", q.ID).First(&q2).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.JSON(http.StatusOK, q2)
   }

   c.Header("access-control-allow-origin", "*")
}

func FinishedQuiz (c *gin.Context) {
   fmt.Println("reached")
   var f []TempFinishedQuizStruct
   var g FinishedQuizzes
   c.BindJSON(&f)
   fmt.Println("all answers recieved %v", f)
   fmt.Println("quizTITLE %v", f[0].Title)

   g.Title = f[0].Title
   g.Email = f[0].Email

   var q []Question

   if err := database.Where("quiz = ?", f[0].Title).Find(&q).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      fmt.Println("q->%v", q)
   }

   score := 0

   numberOfQuestions := len(f)
   for i := 0; i < numberOfQuestions; i++ {
      fmt.Println("%v %v %v %v", f[i].Answer1, f[i].Answer2, f[i].Answer3, f[i].Answer4)
   
      var correctAnswer = 0
      if (f[i].Answer1 == q[i].Answer1) {
         fmt.Println("passed conditon ", i)
         correctAnswer += 1
      }  else {
         fmt.Println("failed conditon ", i)
      }
      if (f[i].Answer2 == q[i].Answer2) {
         fmt.Println("passed conditon ", i)
         correctAnswer += 1
      }  else {
         fmt.Println("failed conditon ", i)
      }
      if (f[i].Answer3 == q[i].Answer3) {
         fmt.Println("passed conditon ", i)
         correctAnswer += 1
      }  else {
         fmt.Println("failed conditon ", i)
      }
      if (f[i].Answer4 == q[i].Answer4) {
         fmt.Println("passed conditon ", i)
         correctAnswer += 1
      }  else {
         fmt.Println("failed conditon ", i)
      }

      fmt.Println ("answer finally -> ", correctAnswer)
      if correctAnswer == 4 {
         fmt.Println("CORRECT ANSWER")
         score += 1
      }
   }

   g.Score = score
 
   database.Create (&g)

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, g)
}

func deleteQuestion (c *gin.Context) {
   id := c.Params.ByName("id")
   fmt.Println("id->",id)
   var u Question
   fmt.Println("reched delete")
   d := database.Where("id = ?", id).Delete(&u)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, u)
}

func deleteUser (c *gin.Context) {
   id := c.Params.ByName("id")
   fmt.Println("id->",id)
   var u User
   fmt.Println("reched delete")
   d := database.Where("id = ?", id).Delete(&u)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, u)
}

func createQuestion (c *gin.Context) {
   var q Question
   c.BindJSON(&q)

   database.Create (&q)

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, q)
}

func updateQuestion (c *gin.Context) {
   var g Question
   c.BindJSON(&g)
   fmt.Println("%v", g)

   var tempG Question

   if err := database.Where("id = ?", g.ID).First(&tempG).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }

   tempG.Question = g.Question
   tempG.Option1 = g.Option1
   tempG.Option2 = g.Option2
   tempG.Option3 = g.Option3
   tempG.Option4 = g.Option4
   tempG.Answer1 = g.Answer1
   tempG.Answer2 = g.Answer2
   tempG.Answer3 = g.Answer3
   tempG.Answer4 = g.Answer4

   database.Save (&tempG)

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, tempG)
}

func getAllGenre (c *gin.Context) {
   var genres []Genre
   if err := database.Find(&genres).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, genres)
   }
}

func getAllQuizzes (c *gin.Context) {
   var quizzes []Quiz
   if err := database.Find(&quizzes).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, quizzes)
   }
}

func getUser (c *gin.Context) {
   c.Header("access-control-allow-origin", "*")

   var user User
   var user2 User
   c.BindJSON(&user)

   if err := database.Where("email = ?", user.Email).First(&user2).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.JSON(http.StatusOK, user2)
   }
}

func getSpecificQuizzes (c *gin.Context) {
   var quizzes []Quiz
   var g Genre
   c.BindJSON(&g)
   fmt.Println("it happened")
   fmt.Println ("genre-> %v", g.Genre)

   if err := database.Where("genre = ?", g.Genre).Find(&quizzes).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, quizzes)
      fmt.Println("%v", quizzes)
   }
}

func getSpecificQuestions (c *gin.Context) {
   var questions []Question
   var q Quiz
   c.BindJSON(&q)
   fmt.Println("it happened")
   fmt.Println ("quiz-> %v", q)

   if err := database.Where("quiz = ?", q.Title).Find(&questions).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, questions)
      fmt.Println("%v", questions)
   }
}

func newQuestion (c *gin.Context) {
   var q tempQuestion
   c.BindJSON(&q)  

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, q)
}

func getQuestionFromID (c *gin.Context) {
   var q tempQuestion
   c.BindJSON(&q)  

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, q)
}

func createUser (c *gin.Context) {
   var u User 
   c.BindJSON(&u)
   fmt.Println("%v", u)
   database.Create (&u)

   c.Header("access-control-allow-origin", "*")
   c.JSON(http.StatusOK, u)
}

func login (c *gin.Context) {
   var user User
   var user2 User 
   c.BindJSON(&user)
   c.Header("access-control-allow-origin", "*")

   if strings.Trim(user.Email, " ") == "" || strings.Trim(user.Password, " ") == "" {
      c.JSON(http.StatusUnauthorized, gin.H{"error": "Parameters can't be empty"})
      return
   }
   if strings.Trim(user.Email, "") == "" || strings.Trim(user.Password, "") == "" {
      c.JSON(http.StatusUnauthorized, gin.H{"error": "Parameters can't be empty"})
      return
   }
   if err := database.Where("email = ?", user.Email).First (&user2).Error; err != nil {
      c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
      c.AbortWithStatus(404)
      return
   }
   if user.Password == user2.Password {
      c.Header("access-control-allow-origin", "*")
      c.JSON(http.StatusOK, user2)
   } else {
      c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate session token"})
   }
}


func getHash(filename string) (uint32, error) {
  h := crc32.NewIEEE()
  h.Write([]byte(filename))
  return h.Sum32(), nil
}
