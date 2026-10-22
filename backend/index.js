import express from "express";
import Stripe from "stripe";

// Petit serveur Node : la clé secrète Stripe ne doit JAMAIS être dans le code React
const PORT = process.env.PORT ?? 4242;
const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY manquante dans le fichier .env");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());

// récup un produit sur l'API : le prix vient d'ici, pas du navigateur (sinon on pourrait le modifier)
async function getProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error(`Produit ${id} introuvable`);
  // fakestoreapi renvoie une réponse vide pour un id inconnu
  const text = await response.text();
  if (!text) throw new Error(`Produit ${id} introuvable`);
  return JSON.parse(text);
}

// Crée une session de paiement Stripe Checkout et renvoie son URL
app.post("/api/checkout", async (req, res) => {
  const items = req.body?.items;

  // le panier reçu : [{ id, quantity }]
  const isValid =
    Array.isArray(items) &&
    items.length > 0 &&
    items.every(
      (item) =>
        Number.isInteger(item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        item.quantity <= 99
    );
  if (!isValid) {
    return res.status(400).json({ error: "Panier invalide" });
  }

  try {
    const products = await Promise.all(items.map((item) => getProduct(item.id)));

    // total du panier en centimes (Stripe compte en centimes)
    const totalCents = items.reduce(
      (sum, item, index) => sum + Math.round(products[index].price * 100) * item.quantity,
      0
    );

    // une seule ligne avec le total : pas de détail des produits sur la page Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: totalCents,
            product_data: { name: "Lâches les sous !" },
          },
        },
      ],
      success_url: `${CLIENT_URL}/commande/succes`,
      cancel_url: `${CLIENT_URL}/panier`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de créer le paiement" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur Stripe sur http://localhost:${PORT}`);
});
