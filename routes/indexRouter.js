const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

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

indexRouter.post("/new", (req, res) => {
  const user = req.body.name;
  const text = req.body.text;
  const added = new Date();
  messages.push({ text: text, user: user, added: added });
  res.redirect("/");
});

module.exports = indexRouter;
