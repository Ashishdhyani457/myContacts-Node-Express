const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        requiured:[true,"Please Add the user name"],
    }, 
    email:{
        type:String,
        requiured:[true,"Please Add the user email address"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        requiured:[true,"Please Add the user password"],
    },
},{
    timestamps:true,
    }
    );
    module.exports= mongoose.model("User",userSchema);