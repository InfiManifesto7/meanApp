const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({  
    
    username:{
        type :String,
        required :true,
    
    },
    email:{
        type :String,
        required :true,
    },
    
    password:{
        type :String,
        required :true,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" } 
    
    
    
});

const UserModel = mongoose.model('user',Userschema);
module.exports = UserModel;    