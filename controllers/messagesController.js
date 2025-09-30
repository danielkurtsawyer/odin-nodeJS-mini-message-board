const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const userErr = "must be between 1 and 255 characters.";
const textErr = "must be between 1 and 500 characters.";

const addExtraSingleQuote = (value) => {
  if (typeof value === "string") {
    return value.replace(/'/g, "''"); // Replaces each single quote with two single quotes
  }
  return value;
};

const validateMessage = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Name ${userErr}`),
  body("text")
    .trim()
    .escape()
    .isLength({ min: 1, max: 500 })
    .withMessage(`Message ${textErr}`),
];

async function getMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
}

async function getMessage(req, res) {
  const { id } = req.params;
  const message = await db.getMessage(id);

  if (!message) {
    res.status(404).send("Message not found");
    return;
  } else {
    res.render("messagePage", {
      title: `Message ${id} Details`,
      message: message,
    });
  }
}

const newMessagePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("form", { title: "New Message", errors: errors.array() });
    }

    const { text, name } = req.body;
    await db.insertMessage({ text, name });
    res.redirect("/");
  },
];

module.exports = {
  getMessages,
  getMessage,
  newMessagePost,
};
