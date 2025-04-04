function ajouterArticle(article) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${article.id}</td>
        <td>${article.entrepot.id}</td>  <!-- Correction ici -->
        <td>${article.nom}</td>
        <td>${article.quantite}</td>
    `;

    tableBody.appendChild(row);
}

// Écouteur pour l'ajout d'un produit
document.getElementById('ajouter').addEventListener('click', function () {
    const id = document.getElementById('ID').value;
    const entrepotId = document.getElementById('ID-entrepot').value;
    const produitId = document.getElementById('produit_id').value; // Récupère l'ID du produit
    const nom = document.getElementById('nom').value;
    const quantite = parseInt(document.getElementById('quantite').value);

    if (!entrepotId || !produitId || !nom || isNaN(quantite)) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
    }

    const nouvelArticle = {
        produit: { id: parseInt(produitId) },   // Objet produit avec son ID
        entrepot: { id: parseInt(entrepotId) }, // Objet entrepôt avec son ID
        nom: nom,
        quantite: quantite
    };

    fetch("http://localhost:8083/api/stocks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nouvelArticle)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        console.log("Produit ajouté avec succès:", data);
        ajouterArticle(data);
    })
    .catch(error => {
        console.error("Erreur:", error);
    });

    // Réinitialisation des champs
    document.getElementById('ID').value = '';
    document.getElementById('ID-entrepot').value = '';
    document.getElementById('produit_id').value = ''; 
    document.getElementById('nom').value = '';
    document.getElementById('quantite').value = '1';
});
