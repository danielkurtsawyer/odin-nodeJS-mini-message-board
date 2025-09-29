const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  console.log(rows);
  return rows;
}

async function getMessage(id) {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id=${id}`);
  return rows.pop();
}

async function insertMessage({ text, name }) {
  const now = new Date().toLocaleDateString("en-CA");
  await pool.query(
    `INSERT INTO messages (text, "user", added) VALUES ('${text}', '${name}', '${now}');`
  );
}

module.exports = {
  getAllMessages,
  getMessage,
  insertMessage,
};
