const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/UserRoutes');
const courseRoutes = require('./routes/CourseRoute');
const profileRoutes = require('./routes/ProfileRoute');
const {cloudinaryConnect} = require('./config/cloudinaryConnect');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dbConnect = require('./config/database');
const PORT = process.env.PORT || 4000;
dbConnect()
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
cloudinaryConnect();
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Server running"
    })
})
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`);
})