import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 1000;
import express from 'express';
const app = express();
app.use(express.json());// ta ys2ra badi taba3 request ken men 2abel  lezem nnazel badi.parsel (badi dash parsel )
import cors from 'cors';
import {createDocument,createManyDocument,FindAllDocument,FindOneDocument,removeAllDocument,removeDocument, UpdateManyDocument } from './server.js';
app.use(cors());
let _connection = process.env.M;

app.get('/', (req, res)=> {
    res.send('api is working')
})

app.post('/students', async (req, res)=> {
    // console.log(req.body)
    // res.send(req.body)
    await createDocument(_connection,req.body)
    res.send('Done')

})
app.post('/Manystudents', async (req, res)=> {
    
    // res.send(req.body)
    await createManyDocument(_connection,req.body)
     console.log(req.body)
    res.send('Done')

})
app.delete('/students', async (req, res)=> {
    // console.log(req.body)
    // res.send(req.body)
    await removeDocument(_connection,req.body._id)
    res.send('Done')

})
app.delete('/deletestudents', async (req, res)=> {
    // console.log(req.body)
    // res.send(req.body)
    await removeAllDocument(_connection)
    res.send('Done')

})

app.get('/students', async (req, res)=> {
    // console.log(req.body)
    // res.send(req.body)
    let  data = await FindAllDocument(_connection);
    console.log(data)
    res.send(data)

})

app.get('/Onestudent', async (req, res)=> {
    // console.log(req.body)
    // res.send(req.body)
    let  data = await FindOneDocument(_connection,req.body._id);
    console.log(data)
    res.send(data)

})

app.put('/students', async (req, res)=> {
     await UpdateManyDocument(_connection,req.body._id,req.body.update);
    res.send('Done')

})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});