const mysql = require("mysql");
var PHPUnserialize = require("php-unserialize");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "table",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("connected");
  sql = "SELECT * FROM table where Telephone like '%{%' ";
  conn.query(sql, (err, res) => {
    if (err) throw err;
    res.map((data) => {
      let data_phone = PHPUnserialize.unserialize(data.Telephone);
      let res_phone = "";
      let index = 0;
      for (var key of Object.keys(data_phone)) {
        if (data_phone[key]?.type == "mobile") {
          if (index > 0) {
            res_phone += ",";
          }
          res_phone += data_phone[key]?.countryCode == "66" ? "0" : "";
          res_phone += data_phone[key]?.number;
          index++;
        }
      }
      console.log("res_phone", res_phone);
      sql =
        `UPDATE table SET Telephone='${res_phone}' WHERE UserID=${data.UserID}`;
      conn.query(sql, (err, res) => {
        if (err) throw err;
      });
    });
  });
});
