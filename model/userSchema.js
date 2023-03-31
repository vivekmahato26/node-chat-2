const { Schema, model, SchemaTypes } = require("mongoose");


const userSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true
    },
    username: {
        type: SchemaTypes.String,
        required: true
    },
    phone: {
        type: SchemaTypes.Number,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    createdAt: {
        type: SchemaTypes.String,
        required: true
    },
    updatedAt: {
        type: SchemaTypes.String,
        required: true
    },
    friends: {
        type: [SchemaTypes.ObjectId],
        required: true,
        ref: "Users"
    },
    friendRequests: {
        type: [SchemaTypes.ObjectId],
        required: true,
        ref: "Users"
    },
    messages: {
        type: SchemaTypes.Array,
        required: true
    },
})

module.exports = model("Users", userSchema);