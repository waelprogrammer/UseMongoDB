import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
uuidv4();
let mongoclient;

async function connectDB(uri) {
    try {
        mongoclient = new MongoClient(uri);
        await mongoclient.connect();
        console.log('Connecting to MongoDb Succeeded!!')
        return mongoclient;
    }
    catch (error) { // bfout 3laya ba 2eza fi error
        console.error('Error to connect to MongoDB!!!')
    }
    // b8ad al nazar 2eza fi error 2aw la2 la7 yfout 3ala l finally
    finally {
        console.log('This Line of code will be executed regardless if the previous code succede or threw am exception')

    }
}

export async function createDocument(_connection, obj) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        // obj._id = uuidv4(); // package bye3tini id metel ma mongodb bye3tini id ye3ni bas ta na3ref 2enno fi package bye3tini id mosta7il yetkarrar
        await collection.insertOne(obj);
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        // db.close() haydeh men 2abel 
        mongoclient.close();// haydeh new la 7ata ysakro 2aktar
        console.log('the mongodb close')
    }
}

export async function createManyDocument(_connection, obj) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        // obj._id = uuidv4(); // package bye3tini id metel ma mongodb bye3tini id ye3ni bas ta na3ref 2enno fi package bye3tini id mosta7il yetkarrar
        await collection.insertMany(obj);
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        // db.close() haydeh men 2abel 
        mongoclient.close();// haydeh new la 7ata ysakro 2aktar
        console.log('the mongodb close')
    }
}
export async function removeDocument(_connection, _id) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        await collection.deleteOne({ _id });
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        // db.close() haydeh men 2abel 
        mongoclient.close();// haydeh new la 7ata ysakro 2aktar
        console.log('the mongodb close')
    }
}

export async function removeAllDocument(_connection) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        await collection.deleteMany({});
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        // db.close() haydeh men 2abel 
        mongoclient.close();// haydeh new la 7ata ysakro 2aktar
        console.log('the mongodb close')
    }
}

export async function FindAllDocument(_connection) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        let toreturn = await collection.find({}).toArray();// find() dont return Json data i t give you a record ye3ni bedelni 3ala 2awal we7ed 
        // find() bte3tini cursor ye3ni bet5alini 2et7akam bel data ma betrou7 betjibon kellon la2an 2eza keno ktar ma byet7amal al jehez fa la hek heyeh bet5lini 2et7akam jib chi mo3ayan 2aw 7et 7ad ba3da 2aw shu ma badi 
        // fa lahek 2eza 2ana baddi data kella w moser badi zedla toAraay() b7awelon la array of objects 
        return toreturn;
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        // db.close() haydeh men 2abel 
        mongoclient.close();// haydeh new la 7ata ysakro 2aktar
        console.log('the mongodb close')
    }
}

export async function FindOneDocument(_connection, _id) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        let toreturn = await collection.findOne({ _id });
        return toreturn;
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        mongoclient.close();
        console.log('the mongodb close')
    }
}

export async function UpdateManyDocument(_connection, _id,update) {
    try {
        let mongoclient = await connectDB(_connection);
        const db = mongoclient.db('school');
        const collection = db.collection('students');
        await collection.updateMany({ _id }, { $set: update });
    } catch (error) {
        console.log('the document dont insert')
    }
    finally {
        mongoclient.close();
        console.log('the mongodb close')
    }
}