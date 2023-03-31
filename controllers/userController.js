const { genSalt, hash, compare } = require("bcrypt");
const Users = require("../model/userSchema");

const registerUser = async ({ body }) => {
  try {
    const { email, phone, username, password } = body;
    const checkEmail = await Users.find({ email });
    if (checkEmail.length) {
      throw new Error("Email already taken");
    }
    const checkPhone = await Users.find({ phone });
    if (checkPhone.length) {
      throw new Error("Phone already taken");
    }
    const checkUsername = await Users.find({ username });
    if (checkUsername.length) {
      throw new Error("Username already taken");
    }
    const salt = await genSalt();
    const hashedPass = await hash(password, salt);
    const date = new Date();
    const data = await Users.create({
      ...body,
      createdAt: date,
      updatedAt: date,
      password: hashedPass,
      friends: [],
      messages: [],
    });
    return data;
  } catch (error) {
    return error.message;
  }
};
const login = async ({ body }) => {
  try {
    const { email, password } = body;
    const user = await Users.find({ email });
    if (!user.length) {
      throw new Error("User not found");
    }
    const checkPass = await compare(password, user[0].password);
    if (!checkPass) {
      throw new Error("Wrong Creds");
    }
    const userData = JSON.stringify({
      userId: user[0]._id,
      email: user[0].email,
    });
    const token = CryptoJS.AES.encrypt(
      userData,
      process.env.CRYPTO_SECRET
    ).toString();
    return {
      token,
      userId: user[0]._id,
      email: user[0].email,
    };
  } catch (error) {
    return error.message;
  }
};
const getUser = async ({ params }) => {
  try {
    const user = await Users.findById(params.userId);
    return user;
  } catch (error) {
    return error.message
  }
};
const getUsers = async () => {
  try {
    const users = await Users.find({});
    return users;
  } catch (error) {
    return error.message
  }
};
const updateUser = async ({ body,userId }) => {
  try {
    const user = await Users.findByIdAndUpdate(userId,{
      ...body
    });
    return user;
  } catch (error) {
    return error.message
  }
};
const sendFriendRequest = async ({ params, userId, isAuth }) => {
  try {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }
    const updateUser = await Users.findByIdAndUpdate(params.friendId, {
      $push: {
        friendRequests: userId,
      },
    });
    return updateUser;
  } catch (error) {
    return error.message;
  }
};
const updateFriendRequest = async ({ body, params, userId, isAuth }) => {
  try {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }
    const { response } = body;
    const updateUser = await Users.findByIdAndUpdate(userId, {
      $pull: {
        friendRequests: params.friendId,
      },
    });
    if (response == "accepted") {
      await Users.findByIdAndUpdate(userId, {
        $push: {
          friends: params.friendId,
        },
      });
    }
    return updateUser;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  registerUser,
  login,
  getUser,
  updateUser,
  sendFriendRequest,
  updateFriendRequest,
  getUsers
};
