
// Ajouter un gestionnaire d'événements pour le formulaire de connexion
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    login(username, password);
  });
}

// Fonction pour se connecter à l'application
function login(username, password) {
  // Envoyer les informations de connexion au serveur
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      // Rediriger l'utilisateur vers la page des dépenses
      if (data.success) {
        window.location.href = '/depenses';
      } else {
        // Afficher un message d'erreur
        const errorDiv = document.querySelector('#error');
        errorDiv.textContent = data.message;
        errorDiv.style.display = 'block';
      }
    })
    .catch(error => console.error(error));
}



const registerForm = document.querySelector('#register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;
    register(username, email, password, confirmPassword);
  });
}


function register(username, email, password, confirmPassword) {

  console.log({ username, email, password, confirmPassword })
  // Envoyer les informations de connexion au serveur
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, confirmPassword })
  })
    .then(response => response.json())
    .then(data => {
     
      if (data.success) {
        window.location.href = '/login';
      } else {
        const errorDiv = document.querySelector('#error');
        errorDiv.textContent = data.message;
        errorDiv.style.display = 'block';
      }
    })
    .catch(error => console.error(error));
}
