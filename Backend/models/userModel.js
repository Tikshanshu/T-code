let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Online-IDE")


let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date:{
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
},{timeStamps:true});

module.exports = mongoose.model('User', userSchema); // 'User' is the name of the collection