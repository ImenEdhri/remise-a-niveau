function bugVar() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
}

//var possède une portée de fonction (function scope), pas de bloc (block scope)
function bugVar() {
  for (var i = 0; i < 3; i++) {
    ((j) => {
      setTimeout(() => console.log(j), 100);
    })(i);
  }
}
bugVar();
