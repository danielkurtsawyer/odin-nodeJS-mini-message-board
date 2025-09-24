const { Router } = require("express");

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

indexRouter.get("/", (req, res) =>
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  })
);
indexRouter.get("/new", (req, res) =>
  res.render("form", {
    title: "New Message",
  })
);

indexRouter.get("/message/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const message = messages.find((message) => message.id === Number(id));
  console.log(message);

  if (!message) {
    res.status(404).send("Message not found");
    return;
  }
  res.render("messagePage", {
    title: `Message ${id} Details`,
    message: message,
  });
});

indexRouter.post("/new", (req, res) => {
  const user = req.body.name;
  const text = req.body.text;
  const added = new Date();
  messages.push({ text: text, user: user, added: added, id: id++ });
  res.redirect("/");
});

module.exports = indexRouter;
