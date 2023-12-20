import mongoose from "mongoose"
const messageSchema =  new mongoose.Schema({
    content:
    {
        type:String,
        trim:true,
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    readBy:[
        {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    }]

},{timestamps:true});


export const Message = mongoose.models.messages ||mongoose.model("messages",messageSchema);
