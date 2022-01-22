const express = require('express');
const app = express();
app.use(express.json())  //bunu kullanmayı unutma yoksa veri alamazsın json formatında

const userrouter = require('./routers/userRouter')

app.use('/user', userrouter);

const port =3000;

app.listen(port,()=>{

    console.log(`Server ${port} nolu porttan ayağa kalktı`)
})