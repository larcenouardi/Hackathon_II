const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/depenses', (req, res) => {
  res.sendFile(__dirname + '/views/depenses.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res) => {
 
  
  res.sendFile(__dirname + '/views/register.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    let rawdata = fs.readFileSync('inscription.json');
    let users = JSON.parse(rawdata);

    const found = users.find((element) => element.username == username && element.password == password );

    if (found != null) {
      // Authentification réussie, rediriger vers la page des dépenses
      res.send({success : true});
    } else {
     
      res.send({success : false, message : "Le nom d'utilisateur ou le mot de passe entré est incorrect. Veuillez réessayer."});
    }
  });

app.post('/register', (req, res) => {
  // Gérer l'inscription de l'utilisateur

  let rawdata = fs.readFileSync('inscription.json');
  let users = JSON.parse(rawdata);

  console.log(users)
  users.push(req.body)
   saveData(users)
  res.send({success : true});
});

const fs = require('fs');
const readline = require('readline');

// Création d'une interface pour lire l'entrée utilisateur depuis la console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Fonction pour enregistrer les données dans un fichier JSON
function saveData(data) {
  const jsonData = JSON.stringify(data);
 
  fs.writeFile('inscription.json', jsonData, 'utf8', (err) => {
    if (err) throw err;
    
    console.log("Inscription réussie. Les données ont été sauvegardées dans le fichier inscription.json");
    
    
    rl.close();
  });
}




// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000.');
});