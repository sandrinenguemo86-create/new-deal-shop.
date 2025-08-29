// Le panier d'achat
let panier = [];

// Sélection des éléments HTML pour le panier
const mainSection = document.querySelector('main');
const listePanier = document.getElementById('liste-panier');
const totalPanierElement = document.getElementById('total-panier');
const boutonAfficherPanier = document.getElementById('afficher-panier');
const panierFlottant = document.querySelector('.panier-flottant');

// La liste de tes produits
const produits = [
    {
        id: 1,
        nom: "Sac à dos Urbain",
        image: "https://via.placeholder.com/400?text=Sac+a+dos",
        description: "Un sac à dos élégant et pratique pour la vie de tous les jours. Parfait pour le travail ou les études.",
        prix: 49.99
    },
    {
        id: 2,
        nom: "Bouteille Isotherme",
        image: "https://via.placeholder.com/400?text=Bouteille+isotherme",
        description: "Garde tes boissons chaudes pendant 12 heures et froides pendant 24 heures. Un indispensable pour toutes tes aventures.",
        prix: 19.99
    },
    {
        id: 3,
        nom: "Écouteurs sans fil",
        image: "https://via.placeholder.com/400?text=Ecouteurs",
        description: "Profite d'un son de haute qualité sans aucun câble. Confortables et avec une grande autonomie.",
        prix: 79.99
    }
];

// Fonction pour afficher les produits
function afficherProduits() {
    mainSection.innerHTML = '';
    produits.forEach(produit => {
        const sectionProduit = document.createElement('section');
        sectionProduit.classList.add('produit');
        
        sectionProduit.innerHTML = `
            <h2>${produit.nom}</h2>
            <img src="${produit.image}" alt="Image du produit">
            <p class="description">${produit.description}</p>
            <p class="prix">${produit.prix.toFixed(2)} €</p>
            <button class="ajouter-panier" data-id="${produit.id}">Ajouter au panier</button>
        `;

        mainSection.appendChild(sectionProduit);
    });

    document.querySelectorAll('.ajouter-panier').forEach(button => {
        button.addEventListener('click', ajouterAuPanier);
    });
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(event) {
    const produitId = parseInt(event.target.dataset.id);
    const produit = produits.find(p => p.id === produitId);

    if (produit) {
        panier.push(produit);
        mettreAJourPanier();
    }
}

// Fonction pour mettre à jour l'affichage du panier
function mettreAJourPanier() {
    listePanier.innerHTML = '';
    let total = 0;
    
    panier.forEach((produit, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${produit.nom} - ${produit.prix.toFixed(2)} €</span>
            <button class="retirer-panier" data-index="${index}">Supprimer</button>
        `;
        listePanier.appendChild(li);
        total += produit.prix;
    });

    totalPanierElement.textContent = `${total.toFixed(2)} €`;

    // Ajoute les écouteurs d'événements pour les boutons de suppression
    document.querySelectorAll('.retirer-panier').forEach(button => {
        button.addEventListener('click', retirerDuPanier);
    });
}

// Nouvelle fonction pour retirer un produit du panier
function retirerDuPanier(event) {
    const indexProduit = parseInt(event.target.dataset.index);
    panier.splice(indexProduit, 1); // La méthode `splice` supprime un élément d'un tableau
    mettreAJourPanier(); // On met à jour le panier après la suppression
}

// Fonction pour basculer la visibilité du panier
function basculerPanier() {
    panierFlottant.classList.toggle('visible');
}

// Écouteur d'événement pour le bouton "Afficher le Panier"
boutonAfficherPanier.addEventListener('click', basculerPanier);

// Appelle la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', afficherProduits);
