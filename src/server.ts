import Express from "express";
import loaders from "@/loaders/index";

const PORT = process.env.NODE_ENV !== "test" ? 3001: 3002;

const app = Express();
loaders(app);
app.on("error", (err) => console.error(err));
const server = app.listen(PORT, ()=>{
    console.log("Server Started");
});

export default server;