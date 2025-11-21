
import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
