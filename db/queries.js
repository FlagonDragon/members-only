const pool = require("./pool");

async function getData() {

  const { rows } = await pool.query("SELECT * FROM userbase");

  return rows;

};

async function getUser(username) {

  const { rows } = await pool.query(`SELECT * FROM userbase WHERE username = '${username}'`);

  return rows;

};

async function insertUser(fullname, username, password) {

  await pool.query(`INSERT INTO userbase (fullname, username, password, membership)
  VALUES 
    ('${fullname}', '${username}', '${password}', 'no');
  `);

};

async function joinClub(username, status) {

  await pool.query(`UPDATE userbase
SET membership = '${status}'
WHERE username = '${username}';
  `);

};

async function getMessages() {

  const { rows } = await pool.query(`SELECT * FROM messages
  `);

  return rows;

};

async function insertMessage(username, title, text) {

//   await pool.query(`INSERT INTO messages (username, title, text)
// VALUES 
//   ('${username}', '${title}', '${text}');
//   `);

  await pool.query(`INSERT INTO messages (username, title, text)
VALUES 
  ($1, $2, $3)
  `, [username, title, text]);

};

async function deleteMessage(id) {

  await pool.query(`DELETE FROM messages WHERE id = ($1);
  `, [id]);

};

module.exports = { 
  getData,
  insertUser,
  joinClub,
  getMessages,
  insertMessage,
  deleteMessage
};

