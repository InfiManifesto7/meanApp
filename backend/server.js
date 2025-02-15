const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");


const cartRoutes = require("./routes/CartRoutes"); 
const AuthRouter = require("./routes/AuthRouter")
const productRoutes = require("./routes/Productroutes");
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const PORT = process.env.PORT ||3000; 



    app.use(cors({
        origin: "http://localhost:4200",
        credentials: true
    }));
    
     

app.use(bodyParser.json());
app.use("/api/cart", cartRoutes);
app.use("/api/Product",productRoutes)
app.use("/api/auth", AuthRouter  );
app.use('/api/admin', adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB...");
})
.catch(err => {
    console.log("MongoDB connection error:", err.message);
});






app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});



