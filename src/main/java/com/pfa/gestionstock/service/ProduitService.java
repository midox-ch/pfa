package com.pfa.gestionstock.service;

import com.pfa.gestionstock.entities.Entrepot;
import com.pfa.gestionstock.entities.Produit;
import com.pfa.gestionstock.entities.Stock;
import com.pfa.gestionstock.repository.EntrepotRepository;
import com.pfa.gestionstock.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private EntrepotRepository EntrepotRepository;

    // Créer un produit
    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    // Récupérer tous les produits
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    // Récupérer un produit par ID
    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    // Mettre à jour un produit
    public Produit updateProduit(Long id, Produit produit) {
        produit.setId(id); // Assurez-vous que l'ID est correct
        return produitRepository.save(produit);
    }

    // Supprimer un produit
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
    public Produit creerProduitEtStock(
            String nom, String categorie, double prix, 
            Long entrepotId, int quantité) { // Paramètre renommé

        // 1. Créer le produit
        Produit produit = new Produit();
        produit.setNom(nom);
        produit.setCategorie(categorie);
        produit.setPrix(prix);

        // 2. Trouver l'entrepôt
        Entrepot entrepot = EntrepotRepository.findById(entrepotId)
                .orElseThrow(() -> new RuntimeException("Entrepôt non trouvé"));

        // 3. Créer et lier le stock
        Stock stock = new Stock();
        stock.setProduit(produit);
        stock.setEntrepot(entrepot);
        stock.setQuantite(quantité); // Setter avec accent

        // 4. Sauvegarder (cascade)
        produit.setStock(stock);
        return produitRepository.save(produit);
    
            }





    /*  Récupérer des produits par catégorie
    public List<Produit> getProduitsByCategorie(String categorie) {
        return produitRepository.findByCategorie(categorie);
    }*/
}