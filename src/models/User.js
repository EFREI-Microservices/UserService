const mongoose = require("mongoose");
const Role = require("../enum/RolesEnum");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [Role.ADMIN, Role.USER],
        required: false,
        default: Role.USER,
    },
});

module.exports = mongoose.model("User", UserSchema);
