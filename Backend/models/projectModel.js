const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Tixkshanshu_Tcode:Monu%407091@t-code.qrybk.mongodb.net/?retryWrites=true&w=majority&appName=T-code")

const projectSchema=new mongoose.Schema({
    title:String,
    createdBy:String,
    date:{
        type:Date,
        default:Date.now
    },
    htmlCode:{
        type:String,
        default:`
        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    
    </body>
    </html>`
    },
    cssCode:{
        type:String,
        default:`
        body{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }`
  },
  jsCode: {
    type: String,
    default: 'console.log("Hello World")'
  },
},{timestamps:true});


module.exports = mongoose.model("Project", projectSchema);