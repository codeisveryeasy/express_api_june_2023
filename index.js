//import express
let express = require('express')
let prog = require('./programming')
let mongoose = require('mongoose')

//create express app
let app = express()

//enable express app to use JSON content-type
app.use(express.json())

//define the port for API to run
//OR
//define the port where API will be exposed
let PORT = 1234

//setup connection string
let conSt = "mongodb+srv://mongodbuser:mongopassword@cluster0.nezoluq.mongodb.net/youtube"

//use connection string to connect to database
mongoose.connect(conSt)
let db = mongoose.connection

//check if connection is success only once
db.once('open', () => {
    console.log("Connected to mongodb database in cloud")
})


//create first api
//GET http://localhost:1234/
//Here, in 1234/  -> / is root endpoint
app.get("/", (request, response) => {
    console.log("request received")
    console.log("GET")
    console.log(request.url)
    response.send("<h1>Hello from Express API Server, GET</h1>")
})


//create first api
//POST http://localhost:1234/
//Here, in 1234/  -> / is root endpoint
app.post("/", (request, response) => {
    console.log("request received")
    console.log("POST")
    console.log(request.url)
    response.send("<h1>Hello from Express API Server, POST</h1>")
})


//create second api
//http://localhost:1234/get/all
//Here,  /get/all is endpoint
app.get("/get/all", (request, response) => {
    console.log("request received of type GET")
    console.log(request.url)
    //connect to mongodb and get all documents from programming collection
    prog.find({})
        .then((data) => {
            console.log(data)
            response.json(data)
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })
})


//create second api
//http://localhost:1234/get/video/hash-key-of-video
//Here,  /get/video/hash-key-of-video is endpoint
app.get("/get/video/:key", (request, response) => {
    console.log("request received of type GET")
    console.log(request.url)
    console.log("find video with id")
    console.log(request.params.key)
    //query mongodb database for video with given id
    prog.findById(request.params.key)
        .then((data) => {
            console.log(data)
            response.json(data)
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })
})

//http://localhost:1234/add/video/
//Here,  /add/video is endpoint
app.post("/add/video", (request, response)=>{
    console.log("request received of type POST")
    console.log(request.url)
    //read the request body from the incoming request
    console.log(request.body)
    //create new programming instance
    let newVideo = new prog()
    console.log(newVideo)
    //newVideo = request.body
    newVideo.videoid = request.body.videoid
    newVideo.likes = request.body.likes
    newVideo.dislikes = request.body.dislikes
    newVideo.title = request.body.title
    console.log(newVideo)
    //save newVideo in database
    newVideo.save()
        .then((data)=>{
            response.json({
                "status":"success",
                "saved":data
            })
        })
        .catch((error)=>{
            response.json(error)
        })
})



//define a PORT for API to run
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})