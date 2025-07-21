const cors = require("cors")
const express = require("express")
const { mongooseconnection } = require("./db")
const bodyParser = require("body-parser")
const ourPost = require("./user.Model")
const { default: mongoose } = require("mongoose")
const app = express()
// const dynamicCorsOptions = function(req, callback) {
//   let corsOptions;
//   if (req.path.startsWith('http://localhost:3000/getallpost')) {
//     corsOptions = {
//       origin: 'http://localhost:5173/', // Allow only a specific origin
//       credentials: true,            // Enable cookies and credentials
//     };
//   } else {
//     // Allow all origins for other routes
//     console.log("not allowed origin")
//   }
//   callback(null, corsOptions);
// };
app.use(cors(
    {
  "origin": "http://localhost:5173",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials":true,
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}








))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends:true}))
app.get("/User",(req,res)=>{
    res.send("hello world")
})
mongooseconnection()
app.listen(3000,(error)=>{
    if(error){
        console.log("server error",error.message)
}else{
    console.log("server has started at port 3000")
}
})
// creatingPost
app.post("/create",async(req,res)=>{
    if(!req.body){
        res.status(400).json("empty field")
    }
    try {
        console.log(req.body)
        const{
            author,title,description
        }=req.body
        // const newdata = {name:name,title:title,description:description}
        const savingData = await ourPost({author:author,title:title,description:description})
        savingData.save()
        res.status(200).json({data:savingData})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
// getting all post
app.get("/getallpost",async(req,res)=>{
try {
    const gettingAll = await ourPost.find()
    res.status(200).json({_data_has_been_found:gettingAll})
} catch (error) {
    res.status(400).json({error:error.message})
}   
})

// getting single data

app.get("/gettingSingleData/:magac",async(req,res)=>{
try {
    const{magac}=req.params  // getting Username 
    console.log( req.params.magac)
   const gettingOne = await ourPost.findOne({author:magac})
   
   if(!gettingOne){
    return res.status(404).json({message:"Data does not exist."})
      
   }
   res.status(200).json({message:"found the data.",gettingOne}) 
} catch (error) {
    res.status(404).json({message:error.message})
}
})

// Finding according to the Title.

app.get("/findingWithTitle/:title",async(req,res)=>{
try {
    const{title}=req.params
    const findingTitle = await ourPost.findOne({title:title})
    if(!findingTitle){
      return res.status(404).json({message:"Could not find data."})
    }
     res.status(200).json({message:"Found the data",findingTitle})
} catch (error) {
    res.status(404).json({message:error.message})
}
})


app.get("/gettingBydesc/:description",async(req,res)=>{
    try {
        const{description}=req.params
       const findBydesc = await ourPost.findOne({description:description})
     if(!findBydesc){
      return res.status(404).json({message:"Could not find data."})
     }
     res.status(200).json({message:"Found the data,",findBydesc})
    } catch (error) {
        res.status(405).json({message:error.message})
    }
})



// editing data

app.put("/update/:id",async(req,res)=>{
try {
    const{id}=req.params  // finding posts id from clirnt 1.e browser, postman etc
    const{author,title,description}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({message:"invalid id."})
    }
    const newupdatedData = {author:author,title:title,description:description}
    const existingUser = await ourPost.findByIdAndUpdate(id,newupdatedData)
    console.log(existingUser)
     res.status(200).json({message:existingUser})
} catch (error) {
    res.status(402).json({message:error.message})
}
})

// deleting data

app.delete("/delete/:id",async(req,res)=>{
try {
    const{id}=req.params // finding posts id from clirnt 1.e browser, postman etc
    const deletingData = await ourPost.findByIdAndDelete(id)
    res.status(200).json({message:"deleted the data.",deletingData})
} catch (error) {
    res.status(404).json({message:error.message})
}
})

// deleting data by title

app.delete("/deleteBytitle/:title",async(req,res)=>{
    try {
        const{title}=req.params
        const deletingBytitle = await ourPost.findOneAndDelete({title:title})
        if(!deletingBytitle){
          return  res.status(404).json({message:"data does not exist"})

        }
     res.status(200).json({message:"deleted data",deletingBytitle})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

// deleting all

app.delete("/deletingall",async(req,res)=>{
try {
    const deletingEverything = await ourPost.deleteMany()
    res.status(200).json({message:"deleted all",deletingEverything})
} catch (error) {
 res.status(404).json({message:error.message})   
}
})
