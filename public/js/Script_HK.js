const formulaire = document.getElementById("formulaire");
const listeDepenses = document.getElementById("liste-depenses");
const total = document.getElementById("total");
const exportButton = document.getElementById("export-button");

let depenses = [];
let totalDepenses = 0;

function ajouterDepense(description, montant) {
  const depense = {
    description: description,
    montant: parseFloat(montant),
  };
  depenses.push(depense);
  totalDepenses += depense.montant;
}

function afficherDepenses() {
  listeDepenses.innerHTML = "";
  depenses.forEach(function (depense, index) {
    const ligne = document.createElement("tr");

    const description = document.createElement("td");
    description.textContent = depense.description;
    ligne.appendChild(description);

    const montant = document.createElement("td");
    montant.textContent = depense.montant.toFixed(2) + " DH";
    ligne.appendChild(montant);

    const actions = document.createElement("td");
actions.classList.add("actions");
    const modifierButton = document.createElement("button");
    modifierButton.textContent = "Modifier";
    modifierButton.addEventListener("click", function () {
      modifierDepense(index);
    });
    actions.appendChild(modifierButton);

    const supprimerButton = document.createElement("button");
    supprimerButton.textContent = "Supprimer";
    supprimerButton.addEventListener("click", function () {
      supprimerDepense(index);
    });
    actions.appendChild(supprimerButton);

    ligne.appendChild(actions);

    listeDepenses.appendChild(ligne);
  });
}

function calculerTotal() {
  total.textContent = totalDepenses.toFixed(2) + " DH";
}

function modifierDepense(index) {
  const nouvelleDescription = prompt("Entrez la nouvelle description :");
  const nouveauMontant = prompt("Entrez le nouveau montant :");
  if (nouvelleDescription.trim() === "" || nouveauMontant.trim() === "") {
    return;
  }
  const ancienMontant = depenses[index].montant;
  depenses[index].description = nouvelleDescription;
  depenses[index].montant = parseFloat(nouveauMontant);
  totalDepenses += depenses[index].montant - ancienMontant;
  afficherDepenses();
  calculerTotal();
}

function supprimerDepense(index) {
  const montantSupprime = depenses[index].montant;
  depenses.splice(index, 1);
  totalDepenses -= montantSupprime;
  afficherDepenses();
  calculerTotal();
}

function exporterCSV() {
  let csvContent = "Description,Montant\n";
  depenses.forEach(function (depense) {
    csvContent += `${depense.description},${depense.montant.toFixed(2)}\n`;
  });

  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "depenses.csv");
  document.body.appendChild(link);
  link.click();
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

exportButton.addEventListener("click", exporterCSV);
