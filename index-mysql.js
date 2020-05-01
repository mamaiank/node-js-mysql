const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("connected");
  //   sql = "INSERT INTO product (product_name, product_price) values ('TV',22222)";
  //   conn.query(sql, (err, res) => {
  //     if (err) throw err;
  //     console.log("insert complete");
  //   });
  //   sql = "INSERT INTO product (product_name, product_price) values ('mouse',33333)";
  //   conn.query(sql, (err, res) => {
  //     if (err) throw err;
  //     console.log("insert complete");
  //   });
  sql = "SELECT * FROM product";
  conn.query(sql, (err, res) => {
    if (err) throw err;
    console.log("select 1 complete");
    console.log(res);
  });
  sql = "SELECT * FROM product WHERE product_price < 15000";
  conn.query(sql, (err, res) => {
    if (err) throw err;
    console.log("select 2 complete");
    console.log(res);
  });
  sql = "call getProduct();";
  conn.query(sql, (err, res) => {
    if (err) throw err;
    console.log("select 3 complete");
    console.log(res);
  });
});
