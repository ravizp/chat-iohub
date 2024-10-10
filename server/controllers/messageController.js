const { Message, User, Room } = require("../models");
const user = require("../models/user");

class messageController {
  static async readMessage(req, res) {
    const { roomId } = req.params;
    try {
      const messages = await Message.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"], // Menampilkan hanya username dan email
          },
          {
            model: Room,
            attributes: ["name"], // Menampilkan nama room
          },
        ],
        where: {
          roomId,
        },
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createMessage(req, res) {
    const { roomId } = req.params;
    const { userId, email, username } = req.loginInfo;
    const { message_text } = req.body;
    console.log(userId, email, username);

    try {
      // Check if a file is uploaded
      // if (!req.file) {
      //   return res.status(400).json({ message: "Image is required" });
      // }

      // // Log the file details to check if path or secure_url is present
      // console.log("File details:", req.file);

      // // Save the file's path (or secure URL if you're using Cloudinary)
      // const fileUrl = req.file.path || req.file.secure_url;

      // if (!fileUrl) {
      //   return res.status(500).json({ message: "Failed to upload image" });
      // }

      // Create a new message with the image URL as message_text
      const newMessage = await Message.create({
        roomId,
        userId,
        message_text, // Save the file URL instead of the whole object
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = messageController;
