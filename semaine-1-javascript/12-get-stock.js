function getStock(product) {
    return product?.stock ?? "inconnu";
}
console.log(getStock({ name: "Café", stock: 0 })); // 10
// || retourme la valeur à droite si la valeur à gauche est falsy(fase, null, undefined, 0, NaN, "")
// ?? retourne la valeur à droite si la valeur à gauche est null ou undefined