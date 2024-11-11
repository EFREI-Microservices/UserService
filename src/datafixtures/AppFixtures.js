const UserModel = require("../models/User");
const Role = require("../enum/RolesEnum");
const bcrypt = require("bcrypt");

const loadFixtures = async () => {
    const admin = await UserModel.findOne({ username: "admin" });
    if (admin) {
        return;
    }

    console.log("Loading fixtures...");

    const newUser = new UserModel({
        username: "user",
        password: await bcrypt.hash("user", 10),
        role: Role.USER,
    });

    const newAdmin = new UserModel({
        username: "admin",
        password: await bcrypt.hash("admin", 10),
        role: Role.ADMIN,
    });

    await newUser.save();
    await newAdmin.save();

    console.log("Fixtures loaded successfully.");
};

module.exports = { loadFixtures };
