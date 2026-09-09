const pool = require("./pool");

async function getData() {

  const { rows } = await pool.query("SELECT * FROM userbase");

  return rows;

};

async function insertUser(fullname, username, password) {

await pool.query(`INSERT INTO userbase (fullname, username, password, membership)
VALUES 
  ('${fullname}', '${username}', '${password}', 'no');
`);

};



module.exports = { 
  getData,
  insertUser
};

