import db from "./fireStore";

export default async function getWords(req, res) {
  try {
    const { gameId } = req.query;
    const roomsRef = db.collection("game_room");
    const getRoomDetails = await roomsRef.where("roomId", "==", gameId).get();

    if (getRoomDetails.empty) {
      const error = new Error("Game room does not exist");
      error.code = "404";
      throw error;
    }

    let roomData;
    getRoomDetails.forEach((doc) => {
      roomData = doc.data();
    });

    const { words } = roomData;
  
    return res.status(200).send({status: "success", message: 'Game words retrieved successfully', data: words });
  } catch (error) {
throw new Error('Unable to retrieve game')
  }
}
