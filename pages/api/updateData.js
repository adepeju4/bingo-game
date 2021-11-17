import db from "./fireStore";

export default async function updateData(req, res) {
  try {
    const { collection, doc, data } = req.query;
    const setCollection = db.collection(collection).doc(doc);

    let setDoc = await setCollection.set(data, { merge: true });

    return {
      status: "success",
      message: "successfully added document",
      data: setDoc,
    };
  } catch (error) {
    console.log(error);
  }
}
