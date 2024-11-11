const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User");
const { verifyUser } = require("../validator/UserValidator");
const Role = require("../enum/RolesEnum");

module.exports = {
    register: async (req, res) => {
        try {
            verifyUser(req.body);
            const { username, password, role } = req.body;

            const existingUser = await UserModel.findOne({ username });
            if (existingUser) {
                return res.status(400).send({
                    message: "Un compte avec ce nom d'utilisateur existe déjà",
                });
            }

            const hash = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username,
                password: hash,
                role: role || Role.USER,
            });

            await newUser.save();
            res.status(201).send({
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Impossibe d'enregistrer l'utilisateur",
            });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).send({
                message: "L'utilisateur n'existe pas",
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).send({
                message: "Le mot de passe est incorrect",
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        res.send({
            message: "Connexion réussie",
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                token,
            },
        });
    },
};