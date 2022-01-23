const express = require('express');
const app = express();
app.use(express.json())  //bunu kullanmayı unutma yoksa veri alamazsın json formatında

const userroute = require('./routes/userRoute')

const postroute = require('./routes/postRoute')

app.use('/user', userroute);

app.use('/post', postroute)

const port =3000;

app.listen(port,()=>{

    console.log(`Server ${port} nolu porttan ayağa kalktı`)
})