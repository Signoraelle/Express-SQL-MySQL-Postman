const connection = require('./conf');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (request, response) => {
    response.send('Welcome to Express');
  });
  
  app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
  
    console.log(`Server is listening on ${port}`);
  });
  
// GET METHODE

app.get('/api/movies', (req, res) => {
connection.query('SELECT * from movie', (err, results) => {
  if(err) {
    res.status(500).send('Erreur lors de la récupération des films');
  } else {
    res.json(results);
  }
});
});

app.get('/api/movies/name', (req, res) => {
  connection.query('SELECT name from movie', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des noms');
    } else {
      res.json(results);
    }
  });
});

// POST METHODE

app.post('/api/movies', (req, res) => {
  const formData = req.body;
connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
  if(err) {
    console.log(err);
    res.status(500).send("Erreur lors de la sauvegarge d'un film") ;
  } else {
    res.sendStatus(200);
  }
});  
});

// PUT METHODE

app.put('/api/movies/:id', (req, res) => {
const formData = req.body;
const idMovies = req.params.id;
connection.query('UPDATE movie SET ? WHERE id = ?', [formData, idMovies], err => {
  if(err) {
    console.log(err);
    res.status(500).send('Error editing a movie')
  } else {
    res.sendStatus(200);
  }
});
});

// DELETE METHODE
// listen to the url "/api/employees" with the verb DELETE

app.delete('/api/movies/:id', (req, res) => {

  // Get the data sent
  const idMovies = req.params.id;

  // connection to the database, and insert the employee
  connection.query('DELETE FROM movie WHERE id = ?', [idMovies], err => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
       console.log(err);
      res.status(500).send("Error deleting an employee");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});
