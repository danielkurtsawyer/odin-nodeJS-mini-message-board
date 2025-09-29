const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: 1,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: 2,
  },
];

let id = 3;

indexRouter.get("/", messagesController.getMessages);
indexRouter.get("/new", (req, res) =>
  res.render("form", {
    title: "New Message",
  })
);

indexRouter.get("/message/:id", messagesController.getMessage);

indexRouter.post("/new", messagesController.newMessagePost);

module.exports = indexRouter;
