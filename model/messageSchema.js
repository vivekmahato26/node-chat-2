const {Schema,model,SchemaTypes} = require("mongoose");

const messageSchema = new Schema({
    content: {
        type: SchemaTypes.String,
        required: true
    },
    file : {
        type: SchemaTypes.String,
        required:false
    },
    sender: {
        type: SchemaTypes.ObjectId,
        require: true,
        ref:"Users"
    },
    receiver: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref:"Users"
    },
    createdAt:{
        type: SchemaTypes.String,
        required:true
    },
    updatedAt:{
        type:SchemaTypes.String,
        required: true
    }
})

module.exports = model("Messages",messageSchema);