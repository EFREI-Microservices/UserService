const { Validator } = require("jsonschema");
const Role = require("../enum/RolesEnum");

module.exports = {
    verifyUser: (user) => {
        if (!user) {
            throw new Error("Les informations de l'utilisateur sont invalides ou manquantes.");
        }
        let validator = new Validator();
        let userSchema = {
            type: "object",
            properties: {
                username: {
                    type: "string",
                    errorMessage: "Nom d'utilisateur incorrect.",
                },
                password: {
                    type: "String",
                    minLength: 6,
                    errorMessage: "Mot de passe incorrect.",
                    pattern: "^(?=.*[A-Z])(?=.*[0-9]).+$", // Le password doit contenir au moins une majuscule et 1 chiffre
                },
                role: {
                    type: "string",
                    enum: [Role.ADMIN, Role.USER],
                    errorMessage: "Role incorrect.",
                },
            },
            required: ["username", "password"],
        };

        let result = validator.validate(user, userSchema);

        if (result.errors.length) {
            const errorInputsMsg = result.errors
                .map((error) => {
                    return error.schema.errorMessage || error.message;
                })
                .join(" ");

            throw new Error(errorInputsMsg);
        }
    },
};
