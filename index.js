const express=require("express")
const route=require("./Routes/category");
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config()
// const validated = require("./Middleware/useMiddleware");

const app=express();
app.use(cors({
    origin:"*"
}))
const port=process.env.port
app.use(express.json())
app.use("/api/category",route)
app.listen(port,()=>{
    console.log(`Server is running in port.${port}`)
})