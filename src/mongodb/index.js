import { MongoClient } from "mongodb";

const MONGODB_SETTING = {
  uri: "mongodb+srv://devmaysoft:devmaysoft@cluster0.bjfird1.mongodb.net/mongodb+srv://admin:nguyenlehuu070900@cluster0.lp5othy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  db_name: "banhang-maysoft"
};

let client;
let database;

export async function connectToDatabase() {
  if (!client || !client.topology.isConnected()) {
    client = new MongoClient(MONGODB_SETTING.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(MONGODB_SETTING.db_name);
  }
  return database;
}

export async function closeDatabaseConnection() {
  if (client && client.isConnected()) {
    await client.close();
  }
}
