const expess=require("express")
const app =expess()
const server=require("http").Server(app)
const {v4:uuidv4}=require("uuid")
const io=require("socket.io")(server,{
    cors:{origin:"*"}
})

app.set("view engine","ejs")
app.use(expess.static("public"))


app.get("/",(req,res)=>{
    res.redirect(`/${uuidv4()}`)
})
app.get("/:room",(req,res)=>{
    res.render("index",{roomId:req.params.room})
})
io.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        io.emit("create_message",message)
    })
})
server.listen(3030)

