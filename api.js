import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 1000;
import express from 'express';
const app = express();
app.use(express.json());// ta ys2ra badi taba3 request ken men 2abel  lezem nnazel badi.parsel (badi dash parsel )
import cors from 'cors';
import {createDocument,createManyDocument,FindAllDocument,FindAllDocumentbyname,FindOneDocument,removeAllDocument,removeDocument,UpdateDocument,UpdateManyDocument } from './server.js';
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
    await removeDocument(_connection,req.body.name)
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
    res.send(data)

})

app.get('/Onestudent', async (req, res)=> {
    // console.log(req.body)
    // res.send(req.body)
    let  data = await FindOneDocument(_connection,req.body.name);
    res.send(data)

})

app.get('/studentbyname', async (req, res) => {
    console.log(req.query);  // Check the incoming query parameters
    let name = req.query.name;  // Get the name from query parameters

    // Call the database function to find the document by name
    let data2 = await FindAllDocumentbyname(_connection, name);

    res.send(data2);  // Send the result back to the client
});


app.put('/students', async (req, res)=> {
     await UpdateManyDocument(_connection,req.body.name,req.body.update);
    res.send('Done')

 })

//  app.put('/students', async (req, res)=> {
//     await UpdateManyDocument(_connection,req.body.name,req.body.update);
//    res.send('Done')

// })

app.put('/updatestudent', async (req, res)=> {
    await UpdateDocument(_connection,req.body.namest,req.body.update);
   res.send('Done')

})

// app.put('/onestudent', async (req, res)=> {
//     const { name, update } = req.body;
//     await UpdateDocument(_connection,name,update);
//    res.send('Done')
// })
// app.put('/updatestudent', async (req, res) => {
//     const { name, updatefield } = req.body;
//     try {
//         await UpdateManyDocument(name, updatefield);
//         res.send('Student updated successfully');
//     } catch (error) {
//         res.status(500).send('Error updating student');
//     }
// });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});