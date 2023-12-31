const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
type:mongoose.Schema.Types.ObjectId,
requiured:true,
ref:"User"
    },
    name:{
        type:String,
        requiured:[true,"Please Add the contact name"],
    },
    emial:{
        type:String,
        requiured:[true,"Please Add the contact email"],
    },
    phone:{
        type:String,
        requiured:[true,"Please Add the contact phone number"],
    },
},{
    timestamps:true,
    }
    );
    module.exports= mongoose.model("Contact",contactSchema);