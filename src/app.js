require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || "3003";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const apiRouter = require("./routes");
const cors = require("cors");
const { loadFixtures } = require("./datafixtures/AppFixtures");

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "UserService",
            description: "Swagger for UserService. All routes start with '/api'",
            version: "1.1.0",
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected");
        if (process.env.ENV === "dev") {
            loadFixtures();
        }
    })
    .catch((error) => {
        console.log(`Database connection error ${error}`);
        console.log(`Failed to connect to ${process.env.DATABASE_URL}`);
    });

app.use("/api/", apiRouter);

app.listen(port, () => {
    console.log("server is running");
});
