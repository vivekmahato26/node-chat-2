const Messages = require("../model/messageSchema");
const Users = require("../model/userSchema");
const { v2: cloudinary } = require("cloudinary");
const path = require("path");
const { rmSync } = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const sendMessage = async ({ body, params, isAuth, userId, file }) => {
  try {
    if (!isAuth) {
      throw new Error("Please login");
    }
    const currDir = __dirname;
    const temp = currDir.split("\\");
    temp.pop();
    const rootDir = temp.join("\\");
    const uploadDir = path.join(rootDir, "uploads");
    const fileName = file.filename;
    const fileData = await cloudinary.uploader.upload(
      path.join(uploadDir, fileName)
    );
    rmSync(uploadDir, { recursive: true });
    const date = new Date();
    const message = {
      content: body.content,
      sender: userId,
      receiver: params.userId,
      createdAt: date,
      updatedAt: date,
      file: fileData.url,
    };
    const messageData = await Messages.create(message);
    const updateSender = await Users.findByIdAndUpdate(userId, {
      $push: { messages: messageData._id },
    });
    const updateReceiver = await Users.findByIdAndUpdate(params.userId, {
      $push: { messages: messageData._id },
    });
    return messageData;
  } catch (error) {
    return error.message;
  }
};

const getMessage = async ({ params, isAuth }) => {
  try {
    if (!isAuth) {
      throw new Error("Please login");
    }
    const data = await Messages.findById(params.messageId);
    return data;
  } catch (error) {
    return error.message;
  }
};

const getUserMessages = async ({ userId, isAuth }) => {
  try {
    if (!isAuth) {
      throw new Error("Please login");
    }
    const userData = await Users.findById(userId);
    const { messages } = userData;
    const messagePromise = messages.map((msgId) => Messages.findById(msgId));
    // const messagePromise = messages.map(msgId => axios.get("http://localhost:4000/messages/"+msgId))
    // const data = [];
    // for (const msgId of messages) {
    //   // fetch message  --- await Messages.findById(msgId)
    //   // add to data
    // }
    // return data;
    const data = await Promise.allSettled(messagePromise);
    return data;
  } catch (error) {
    return error.message;
  }
};

module.exports = { sendMessage, getMessage,getUserMessages };
