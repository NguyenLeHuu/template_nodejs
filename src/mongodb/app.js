import { MongoClient } from "mongodb";
const MONGODB_SETTING={
  uri : "mongodb+srv://admin:nguyenlehuu070900@cluster0.lp5othy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  db_name: "cho_thue_phong_tro"
}

export async function insertOne(collection,payload) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(MONGODB_SETTING.uri);
        try {
            const database = client.db(MONGODB_SETTING.db_name);
            const collectionRef = database.collection(collection);
            const result = await collectionRef.insertOne(payload);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
          resolve(result);
        } catch (e) {
           console.log(e);
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    );
}
export async function findOne(collection,payload) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(MONGODB_SETTING.uri);
        try {
            const database = client.db(MONGODB_SETTING.db_name);
            const collectionRef = database.collection(collection);
            const result = await collectionRef.findOne(payload);
            console.log(`A document was found : ${result}`);
          resolve(result);
        } catch (e) {
           console.log(e);
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    )
}
export async function findAll(collection,payload) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(MONGODB_SETTING.uri);
        try {
            const database = client.db(MONGODB_SETTING.db_name);
            const collectionRef = database.collection(collection);
            const cursor = await collectionRef.find(payload);
            const result = await cursor.toArray();
            console.log(`Many document was found : ${result}`);
          resolve(result);
        } catch (e) {
           console.log(e);
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    );
}
export async function updatetOne(collection,payload) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(MONGODB_SETTING.uri);
        try {
            const database = client.db(MONGODB_SETTING.db_name);
            const collectionRef = database.collection(collection);
            if(payload.filter &&payload.data){

              const result = await collectionRef.updateOne(
                payload.filter,
                { $set: payload.data },
                { upsert: false }
              );
            console.log(`A document was update : ${result}`);
          resolve(result);
        }

        } catch (e) {
           console.log(e);
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    );
}
export async function upsert(collection,payload) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(MONGODB_SETTING.uri);
        try {
            const database = client.db(MONGODB_SETTING.db_name);
            const collectionRef = database.collection(collection);
            if(payload.filter &&payload.data){

              const result = await collectionRef.updateOne(
                payload.filter,
                { $set: payload.data },
                { upsert: true }
              );
            console.log(`A document was updasert : ${result}`);
          resolve(result);
        }

        } catch (e) {
           console.log(e);
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    );
}
export async function deleteFunction(collection,payload) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(MONGODB_SETTING.uri);
        try {
            const database = client.db(MONGODB_SETTING.db_name);
            const collectionRef = database.collection(collection);
            const result = await collectionRef.deleteOne(
              payload
            );
          console.log(`A document was delete : ${result}`);
          resolve(result);
        } catch (e) {
          console.log(e);
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    );
}



