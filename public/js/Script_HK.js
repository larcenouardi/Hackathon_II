const formulaire = document.getElementById("formulaire");
const listeDepenses = document.getElementById("liste-depenses");
const total = document.getElementById("total");

let depenses = [];

function ajouterDepense(description, montant) {
  const depense = {
    description: description,
    montant: parseFloat(montant),
  };
  depenses.push(depense);
}

function afficherDepenses() {
  listeDepenses.innerHTML = "";
  depenses.forEach(function (depense) {
    const ligne = document.createElement("tr");

    const description = document.createElement("td");
    description.textContent = depense.description;
    ligne.appendChild(description);

    const montant = document.createElement("td");
    montant.textContent = depense.montant.toFixed(2) + " DH";
    ligne.appendChild(montant);

    listeDepenses.appendChild(ligne);
  });
}

function calculerTotal() {
  const totalDepenses = depenses.reduce(function (total, depense) {
    return total + depense.montant;
    }, 0);
    
    total.textContent = totalDepenses.toFixed(2) + " DH";
    }
    
    formulaire.addEventListener("submit", function (event) {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const montant = document.getElementById("montant").value;
    if (description.trim() === "" || montant.trim() === "") {
    return;
    }
    ajouterDepense(description, montant);
    afficherDepenses();
    calculerTotal();
    formulaire.reset();
    });