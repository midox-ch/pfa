document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const adresseEmail = document.getElementById('email').value;
    const motDePasse = document.getElementById('motDePasse').value;

    fetch('http://localhost:8083/utilisateurs/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adresseEmail, motDePasse })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect");
        }
        return response.json();
    })
    .then(data => {
        console.log('Connexion réussie:', data);
        window.location.href = 'home.html'; // Redirige vers ton tableau de bord
    })
    .catch(error => {
        document.getElementById('error-message').textContent = error.message;
    });
});
