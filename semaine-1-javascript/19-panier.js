export class ShoppingCart {
  #items = [];

  // Ajouter un produit au panier
  add(product, qty) {
    const existingProduct = this.#items.find(
      (item) => item.name === product.name,
    );

    if (existingProduct) {
      existingProduct.qty += qty;
    } else {
      this.#items.push({
        ...product,
        qty,
      });
    }
  }

  // Supprimer un produit par son nom
  remove(name) {
    this.#items = this.#items.filter((item) => item.name !== name);
  }
  
  displayItems() {
    return this.#items.map((item) => ({ ...item }));
  }

  // Calculer le prix total du panier
  get total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getTotal() {
    return this.total;
  }
}
