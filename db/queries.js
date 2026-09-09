const pool = require("./pool");

async function getData() {

  const { rows } = await pool.query("SELECT * FROM userbase");

  return rows;

};

async function insertUser(fullname, username) {

await pool.query(`INSERT INTO userbase (fullname, username, membership)
VALUES 
  ('${fullname}', '${username}', 'no');
`);

};



module.exports = { 
  getData,
  insertUser
};

