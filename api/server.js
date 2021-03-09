//IMPORTS
const express = require('express');
const userRoute = require('./routes/v1/user');
const productRoute = require('./routes/v1/product');
//CONFIGS
const app = express();

//middleware
app.use(express.json())
app.use('/v1', userRoute);
app.use('/v1', productRoute);

const PORT = process.env.PORT || 3355;
app.listen(PORT, () =>{console.log(`SERVER RUNING ON: http://localhost:${PORT} `)});
