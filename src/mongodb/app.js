import { MongoClient } from "mongodb";
const uri = "mongodb+srv://admin:nguyenlehuu070900@cluster0.lp5othy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function insertOne(data) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(uri);
        try {
            const database = client.db("cho_thue_phong_tro");
            const haiku = database.collection("user");
            const result = await haiku.insertOne(data);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
          resolve(result);
        } catch (e) {
          reject(e);
        }
        finally {
            await client.close();
        }
      }
    );
}


