function bugVar() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
}
// var possède une portée de fonction (function scope), pas de bloc (block scope).
// Les trois callbacks setTimeout partagent donc la même variable i.
// La boucle s'exécute entièrement avant que les callbacks soient exécutés.
// À ce moment-là, i vaut déjà 3.
// Les trois callbacks affichent donc 3, 3, 3.

function bugVarCorrectionWithLet() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
}
//let possède une portée de bloc (block scope).

function bugVarWithImmediatelyInvokedFunction () {
  for (var i = 0; i < 3; i++) {
    ((j) => {
      setTimeout(() => console.log(j), 100);
    })(i);
  }
}
// À chaque itération, on appelle immédiatement la fonction.
// On transmet la valeur actuelle de i comme argument j.
// Chaque appel crée son propre contexte d'exécution.
// Chaque callback conserve sa propre variable j grâce à la closure.
