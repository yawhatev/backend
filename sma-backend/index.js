import express from "express";
import router from "./routes/routes.js";
import cors from "cors"

const app = express()
const port = 3005

app.use(express.json());
app.use(cors());

//routing
app.use("/api", router);


app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server is starting at port: ", port)
})