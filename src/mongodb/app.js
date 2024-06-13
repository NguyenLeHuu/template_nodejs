import { connectToDatabase, closeDatabaseConnection } from "./index";

export async function insertOne(collection, payload) {
  try {
    const db = await connectToDatabase();
    const collectionRef = db.collection(collection);
    const result = await collectionRef.insertOne(payload);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function findOne(collection, payload) {
  try {
    const db = await connectToDatabase();
    const collectionRef = db.collection(collection);
    const result = await collectionRef.findOne(payload);
    // console.log(`A document was found: ${result}`);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function findAll(collection,payload,startIndex,limit) {
  try {
    const db = await connectToDatabase();
    const collectionRef = db.collection(collection);
    const cursor = await collectionRef.find(payload).skip(startIndex).limit(limit);
    const result = await cursor.toArray();
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateOne(collection, payload) {
  try {
    const db = await connectToDatabase();
    const collectionRef = db.collection(collection);
    if (payload.filter && payload.data) {
      const result = await collectionRef.updateOne(
        payload.filter,
        { $set: payload.data },
        { upsert: false }
      );
      if (result.modifiedCount > 0) {
        return result;
      } else {
        throw new Error("Không tìm thấy tài liệu để cập nhật");
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function upsert(collection, payload) {
  try {
    const db = await connectToDatabase();
    const collectionRef = db.collection(collection);
    if (payload.filter && payload.data) {
      const result = await collectionRef.updateOne(
        payload.filter,
        { $set: payload.data },
        { upsert: true }
      );
      // console.log(`A document was upserted: ${result}`);
      return result;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteFunction(collection, payload) {
  try {
    const db = await connectToDatabase();
    const collectionRef = db.collection(collection);
    const result = await collectionRef.deleteOne(payload);
    if (result.deletedCount > 0) {
      return result;
    } else {
      throw new Error("Không tìm thấy tài liệu để xóa");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
