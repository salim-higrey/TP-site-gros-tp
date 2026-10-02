const express = require("express");
const app = express();
app.use(express.json());

let produits = [
  { id: 1, nom: "Clavier", prix: 25 },
  { id: 2, nom: "Souris", prix: 15 },
  { id: 3, nom: "Ecran", prix: 120 }
];

app.get("/produits", (req, res) => {
  res.json(produits);
});
// Route de test : GET /
app.get("/", (req, res) => {
  res.json({ message: "Mon API fonctionne" });
});

// On demarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});
// GET /produits/2 -> renvoie le produit dont l id vaut 2
app.get("/produits/:id", (req, res) => {
  const id = Number(req.params.id);            // ":id" arrive en texte -> on convertit
  const produit = produits.find((p) => p.id === id);
  if (!produit) {                              // rien trouve
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  res.json(produit);
});
// POST /produits -> ajoute un produit envoye dans le corps de la requete
app.post("/produits", (req, res) => {
  if (!req.body.nom) {                          // donnee obligatoire manquante
    return res.status(400).json({ erreur: "Le nom est obligatoire" });
  }
  const nouveau = {
    id: produits.length + 1,
    nom: req.body.nom,
    prix: req.body.prix
  };
  produits.push(nouveau);                       // on ajoute au tableau
  res.status(201).json(nouveau);                // 201 = cree
});

// DELETE /produits/2 -> supprime le produit n 2
app.delete("/produits/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = produits.findIndex((p) => p.id === id);
  if (index === -1) {                           // -1 = pas trouve
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  produits.splice(index, 1);                    // retire 1 element a cette position
  res.status(200).json({ message: "Produit supprime" });
});