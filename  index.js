//const connection = require("./conf");

const bodyParser = require("body-parser");
// Data stored in req.body
const formData = req.body;
// TODO saves data in the table (step 3)

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// listen to the url "/api/employees" with the verb POST
app.post("/api/MOVIE", (req, res) => {
  // Get the data sent
  const formData = req.body;

  // connection to the database, and insertion of the employee
  connection.query("INSERT INTO MOVIE  SET ?", formData, (err, results) => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send("Error saving an employee");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});
