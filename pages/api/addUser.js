import db from "./fireStore";

export default async function addUser(req, res) {
  try {
    const { collection } = req.query;
    const doc = req.body;
    const { playerName, gameId } = doc;
    if (!collection || !doc) {
      return res
        .status(400)
        .send({
          status: "failed",
          message: "no collection or doc specified",
          data: null,
        });
    }

   

    const roomsRef =  db.collection('game_room')
    const getRoomDetails = await roomsRef.where('roomId', '==', gameId).get();

    const roomUsersRef = db.collection('room_users');
    const roomUsersSnapshot = await roomUsersRef.where('gameId', '==', gameId).get();

    let roomData;
    const roomUsers = [];
    if (getRoomDetails.empty) {
      const error = new Error("Game room does not exist");
      error.message = "Game room does not exist";
      error.code = "404";
      throw error;
    }
    
    getRoomDetails.forEach((doc) => {
      roomData = doc.data()
    });

    roomUsersSnapshot.forEach((doc) => {
      roomUsers.push(doc.data());
    })


    
    if (Number(roomData.totalPlayers) === roomUsers.length) {
      const error = new Error("Game room is filled up");
      error.code = "401";
      error.message = "Game room is filled up";
      throw error;
    }


   const insertUser =  await db.collection(collection).add(doc);
    
    

    return res.status(200).send({
      status: "success",
      message: `player ${playerName} joined game: ${gameId} successfully `,
      data: {
        DocId: insertUser.id,
      },
    });
  } catch (error) {
 
    return res.status(error.code).send({ status: "failed", message: error.message});
  }
}
