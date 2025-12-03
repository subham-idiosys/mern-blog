const mongoose = require("mongoose");
require("dotenv").config();

const buildConnectionUri = () => {
    const env = process.env.NODE_ENV || "development";
    if (env === "production") {
        return process.env.MONGO_URI_PROD || process.env.MONGO_URI;
    }
    return process.env.MONGO_URI_DEV || process.env.MONGO_URI;
};

exports.connect = () => {
    const connectionUri = buildConnectionUri();

    if (!connectionUri) {
        console.error("No MongoDB URI configured for the current environment.");
        process.exit(1);
    }

    mongoose.connect(connectionUri).then(() => {
            console.log("DB connected successfully!");
        }).catch((error) => {
            console.log("DB connection failed.");
            console.error(error);
            process.exit(1);
        });
};