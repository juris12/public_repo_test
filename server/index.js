require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const PORT =  process.env.PORT || 5000;
app = express()
app.use(((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
}))
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions));


app.use('/users', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.all('*',(req,res) => {
    res.status(404);
    if(req.accepts('json')){
        res.json({message:"404 Not Found"});
    }else{
        res.type('txt').send('404 Not Found');
    }
})
app.listen(PORT,() => console.log(`Srver running at PORT ${PORT}`));