import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const clint = await MongoClient.connect(
      "mongodb+srv://rytrox:creepyno1456@cluster0.z7fxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = clint.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    clint.close;
    res.status(201).json({
      message: "Meetup inserted",
    });
  }
}

export default handler;
