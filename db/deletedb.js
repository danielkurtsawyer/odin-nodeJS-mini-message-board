require("dotenv").config();

const { Client } = require("pg");

const now = new Date().toLocaleDateString("en-CA");

console.log(now);

const SQL = `DELETE FROM messages`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
