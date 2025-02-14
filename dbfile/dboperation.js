const sql = require("mssql");
const config = require("./config");

const createUser = async (userData) => {
  try {
    console.log("Received User Data:", userData);

    if (!userData.username || !userData.password || !userData.email) {
      throw new Error("Missing required fields");
    }

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("username", sql.NVarChar, userData.username)
      .input("password", sql.NVarChar, userData.password)
      .input("email", sql.NVarChar, userData.email)
      .query(
        "INSERT INTO Users (username, password, email) VALUES (@username, @password, @email)"
      );
    return result;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

const getUser = async (username, password) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .query("SELECT * FROM Users WHERE username = @username AND password = @password");
    return result.recordset[0];
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

module.exports = { createUser, getUser };