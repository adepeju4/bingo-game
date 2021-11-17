import db from "./fireStore";


export default async function addData(req, res) {
  try {
    const { collection } = req.query;
    const doc = req.body;
    const { gameMaster, roomId, playerRole } = doc;
    if (!collection || !doc) {
      return res
        .status(400)
        .send({
          status: "failed",
          message: "no collection or doc specified",
          data: null,
        });
    }

    const insertDoc = await db.collection(collection).add(doc);
   await db.collection("room_users").add({
     playerName: gameMaster,
     playerRole,
     gameId: roomId,
   });
    

    return res.status(200).send({
      status: "success",
      message: "Doc inserted successfully ",
      data: {
        docId: insertDoc.id,
      },
    });
  } catch (error) {
   throw new Error('Unable to create game')
  }
}
