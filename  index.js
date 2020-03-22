const connection = require("./conf");

// listen to "/api/employees"
app.get("/api/employees", (req, res) => {
  // connection to the database, and selection of employees
  connection.query("SELECT * from employee", (err, results) => {
    if (err) {
      //  If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      // If everything went well, we send the result of the SQL query as JSON.
      res.json(results);
    }
  });
});
