const { Router } = require("express");
const {
  registerUser,
  sendFriendRequest,
  updateFriendRequest,
  login,
  updateUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

const userRouter = new Router();

userRouter.post("/register", async (req, res) => {
  try {
    const data = await registerUser(req);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

userRouter.patch("/sendRequest/:friendId", async (req, res) => {
  try {
    const data = await sendFriendRequest(req);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

userRouter.patch("/updateRequest/:friendId", async (req,res) => {
    try {
        const data = await updateFriendRequest(req);
        res.send(data);
      } catch (error) {
        res.send(error.message);
      }
})

userRouter.post("/login", async (req,res) => {
  try {
    const data = await login(req);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
})


userRouter.get("/:userId", async(req,res) => {
  try {
    const data = await getUser(req);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
})
userRouter.get("/all", async(req,res) => {
  try {
    const data = await getUsers(req);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
})
userRouter.patch("/updateUser", async(req,res) => {
  try {
    const data = await updateUser(req);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
})

module.exports = userRouter;
