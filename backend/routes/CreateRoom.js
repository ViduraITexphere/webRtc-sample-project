const express = require("express");
const bodyParser = require("body-parser");
const Rooms = require("../models/Rooms");

const router = express.Router();

router.use(bodyParser.json());

//save story
router.post("/room/create", async (req, res) => {
  let newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();
    return res.status(200).json({
      success: "Story saved successfully",
      data: savedRoom
    });
  } catch (err) {
    return res.status(404).json({
      error: err.message
    });
  }
});



// router.get("/story/:email", async (req, res) => {
//   try {
//     const { email } = req.params;
//     const stories = await Stories.find({ assignees: email }).exec();
//     return res.status(200).json({
//       success: true,
//       existingStories: stories
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: "No story found"
//     });
//   }
// });



module.exports = router;