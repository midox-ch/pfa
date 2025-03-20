const articlesInitiaux = [
    {
        nom: "HP", 
        categorie: "Ordinateur", 
        quantite: 5, 
        prix: 200000,
    },
    {
        nom: "Imprimante scanner", 
        categorie: "Imprimante", 
        quantite: 8, 
        prix: 50000,
    },
    {
        nom: "Cable VGA", 
        categorie: "Accessoire", 
        quantite: 89, 
        prix: 1500,
        fabrication: "2022-09-18T18:55:00",
        expiration: "2022-09-16T18:57:00"
    },
    {
        nom: "souris", 
        categorie: "Accessoire", 
        quantite: 90, 
        prix: 6000,
    }
];



// Fonction pour ajouter un article au tableau
function ajouterArticle(id,categorie,image,nom,prix,quantite) {
    fetch("http://localhost:8083/api/produits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id,categorie,image,nom,prix,quantite })
    });
}



// Initialiser le tableau avec les données initiales
window.onload = function() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ""; // Effacer d'abord le contenu
    
    articlesInitiaux.forEach(article => {
        ajouterArticle(article);
    });
}

// Gérer l'ajout d'un nouvel article
document.getElementById('ajouter').addEventListener('click', function() {
    const ID = parseInt(document.getElementById('ID').value);
    const nom = document.getElementById('nom').value;
    const categorie = document.getElementById('categorie').value;
    const quantite = parseInt(document.getElementById('quantite').value);
    const prix = parseInt(document.getElementById('prix').value);

    
    // Validation de base
    if (!ID || !nom || !prix ) {
        alert('Veuillez remplir tous les champs requis.');
        return;
    }
    
    // Créer un nouvel article
    const nouvelArticle = {
        ID: ID,
        nom: nom,
        categorie: categorie,
        quantite: quantite,
        prix: prix,
    };
    
    // Ajouter au tableau
    ajouterArticle(nouvelArticle);
    
    // Réinitialiser le formulaire
    document.getElementById('ID').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('quantite').value = '1';
    document.getElementById('prix').value = '';
});