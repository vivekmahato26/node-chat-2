const {Router} = require("express");
const multer = require("multer");
const { sendMessage, getMessage, getUserMessages } = require("../controllers/messageController");
const upload = multer({ dest: 'uploads/' })
const messageRouter = new Router();

messageRouter.post("/send/:userId",upload.single(),async(req,res) => {
    try {
        const data = await sendMessage(req);
        res.send(data);
    } catch (error) {
        res.send(error.message)
    }
})

messageRouter.get("/message/:messageId", async (req,res) => {
    try {
        const data = await getMessage(req);
        res.send(data);
    } catch (error) {
        res.send(error.message)
    }
})
messageRouter.get("/all", async (req,res) => {
    try {
        const data = await getUserMessages(req);
        res.send(data);
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = messageRouter;