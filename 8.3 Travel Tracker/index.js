import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "12345", //change correct password!
  port: 5432,
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.

  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  console.log(result.rows);
  result.rows.forEach((country) => {
    console.log(country);
    countries.push(country.country_code);
  })
  res.render("index.ejs", {
    total: countries.length,
    countries: countries
  });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
