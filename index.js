const express=require("express")
const cors=require("cors")
const route=require("./Routes/category");
const validated = require("./Middleware/useMiddleware");
const port=5000
const app=express();
const middleware=(req,res,next)=>{
    console.log("This is Appilcation Middleware")
    next();
}
app.use(cors({
    origin:"*"
}))
app.use(middleware)
app.use(express.json())
app.use("/api/category",route)
app.listen(port,()=>{
    console.log(`Server is running in port.${port}`)
})