const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

let database = {};

/* SAVE */
app.post("/save", (req,res)=>{
const {username,grosh,cps} = req.body;
database[username] = {grosh,cps};
res.sendStatus(200);
});

/* LOAD */
app.get("/load/:user",(req,res)=>{
res.json(database[req.params.user] || null);
});

/* LEADERBOARD */
app.get("/leaderboard",(req,res)=>{
let board = Object.entries(database)
.map(([username,data])=>({username,grosh:data.grosh}))
.sort((a,b)=>b.grosh-a.grosh)
.slice(0,10);
res.json(board);
});

app.listen(3000,()=>console.log("Server running on port 3000"));
