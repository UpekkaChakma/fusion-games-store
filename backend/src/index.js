import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB();
const port = process.env.PORT || 7000;
app.listen(port);
console.log("app is running on port:", port);
