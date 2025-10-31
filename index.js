import dotenv from "dotenv";
import connect  from './src/db/connect.js';
import app from "./src/app.js"

dotenv.config();
//const PORT = process.env.PORT || 3000;

connect()
    .then(() => {
        app.listen(3000, () => {
            console.log(`🚀 Server running on http://localhost:${3000}`);
        });
    })
    .catch((err) => {
        console.log("❌ DB connection failed", err);
    })