import express from "express"
import bodyParser from "body-parser"

import {router as usersRouter} from "./routes/users.js"

const app = express()
const PORT = 5000


app.use(bodyParser.json())
app.use("/users", usersRouter)


app.get("/", (req, res)=> {
    res.json("HI there")
})



app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)) 

