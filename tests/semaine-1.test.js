// Tests automatiques – Semaine 1 (JavaScript moderne)
// Lancement depuis la racine du dépôt :  npm test
//
// Un exercice dont le fichier n'existe pas encore est marqué « skipped » (ignoré) :
// c'est normal, il passera au vert quand vous l'aurez fait.
// Les exercices 08 et 20 ne sont pas testés automatiquement : Claude les relit.

import { test } from "node:test";
import assert from "node:assert/strict";

const DOSSIER = "../semaine-1-javascript/";

async function charger(fichier) {
  try {
    return await import(new URL(DOSSIER + fichier, import.meta.url));
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND" && e.message.includes(fichier))
      return null;
    throw e; // une vraie erreur dans votre fichier : on l'affiche
  }
}

async function exercice(t, fichier, ...noms) {
  const m = await charger(fichier);
  if (!m) {
    t.skip(`${fichier} pas encore créé`);
    return null;
  }
  for (const nom of noms) {
    assert.ok(
      nom in m,
      `${fichier} doit exporter « ${nom} » (export function ${nom} ...)`,
    );
  }
  return m;
}

const produits = () => [
  { name: "Café", category: "Boissons", price: 2.5 },
  { name: "Croissant", category: "Viennoiseries", price: 1.2 },
  { name: "Jus d'orange", category: "Boissons", price: 3.0 },
  { name: "Pain au chocolat", category: "Viennoiseries", price: 1.4 },
  { name: "Sandwich", category: "Salé", price: 5.5 },
];

// ---------- A. Méthodes de tableaux ----------

test("01 – sumEven", async (t) => {
  const m = await exercice(t, "01-somme-pairs.js", "sumEven");
  if (!m) return;
  assert.equal(m.sumEven([1, 2, 3, 4, 6]), 12);
  assert.equal(m.sumEven([]), 0, "un tableau vide doit donner 0");
  assert.equal(m.sumEven([1, 3, 5]), 0);
  assert.equal(
    m.sumEven([-2, -4, 1]),
    -6,
    "les nombres négatifs pairs comptent aussi",
  );
});

test("02 – groupBy", async (t) => {
  const m = await exercice(t, "02-group-by.js", "groupBy");
  if (!m) return;
  const g = m.groupBy(produits(), "category");
  assert.deepEqual(Object.keys(g).sort(), [
    "Boissons",
    "Salé",
    "Viennoiseries",
  ]);
  assert.equal(g.Boissons.length, 2);
  assert.equal(g["Salé"][0].name, "Sandwich");
  assert.deepEqual(m.groupBy([], "category"), {});
});

test("03 – topProducts", async (t) => {
  const m = await exercice(t, "03-top-produits.js", "topProducts");
  if (!m) return;
  const p = produits();
  const copie = JSON.stringify(p);
  assert.deepEqual(m.topProducts(p, 2), ["Sandwich", "Jus d'orange"]);
  assert.equal(
    JSON.stringify(p),
    copie,
    "le tableau d'origine ne doit pas être modifié",
  );
  assert.equal(m.topProducts(p, 10).length, 5);
});

test("04 – wordFrequency", async (t) => {
  const m = await exercice(t, "04-frequence-mots.js", "wordFrequency");
  if (!m) return;
  assert.deepEqual(m.wordFrequency("Le chat et le chien"), {
    le: 2,
    chat: 1,
    et: 1,
    chien: 1,
  });
  assert.deepEqual(
    m.wordFrequency("A a A"),
    { a: 3 },
    "la casse doit être ignorée",
  );
});

// ---------- B. Portée et closures ----------

test("05 – createCounter", async (t) => {
  const m = await exercice(t, "05-compteur.js", "createCounter");
  if (!m) return;
  const c = m.createCounter();
  c.increment();
  c.increment();
  c.decrement();
  assert.equal(c.value(), 1);
  assert.equal(
    m.createCounter(10).value(),
    10,
    "la valeur de départ doit être prise en compte",
  );
  const c2 = m.createCounter();
  c2.increment();
  assert.equal(c.value(), 1, "deux compteurs doivent être indépendants");
  assert.equal(
    Object.keys(c).sort().join(","),
    "decrement,increment,value",
    "la valeur ne doit pas être accessible directement",
  );
});

test("06 – once", async (t) => {
  const m = await exercice(t, "06-once.js", "once");
  if (!m) return;
  let appels = 0;
  const f = m.once((a, b) => {
    appels++;
    return a + b;
  });
  assert.equal(f(1, 2), 3);
  assert.equal(
    f(10, 20),
    3,
    "les appels suivants renvoient le premier résultat",
  );
  assert.equal(appels, 1, "la fonction ne doit s'exécuter qu'une fois");
});

test("07 – memoize", async (t) => {
  const m = await exercice(t, "07-memoize.js", "memoize");
  if (!m) return;
  let appels = 0;
  const carre = m.memoize((x) => {
    appels++;
    return x * x;
  });
  assert.equal(carre(4), 16);
  assert.equal(carre(4), 16);
  assert.equal(carre(5), 25);
  assert.equal(
    appels,
    2,
    "le résultat de carre(4) doit venir du cache la 2e fois",
  );
});

// ---------- C. Objets et immutabilité ----------

test("09 – mergeConfig", async (t) => {
  const m = await exercice(t, "09-merge-config.js", "mergeConfig");
  if (!m) return;
  const defaults = { lang: "fr", debug: false };
  assert.deepEqual(m.mergeConfig(defaults, { debug: true }), {
    lang: "fr",
    debug: true,
  });
  assert.deepEqual(
    defaults,
    { lang: "fr", debug: false },
    "les valeurs par défaut ne doivent pas être modifiées",
  );
});

test(
  "09 – mergeConfig (bonus : objet imbriqué)",
  { todo: "bonus facultatif" },
  async (t) => {
    const m = await charger("09-merge-config.js");
    if (!m) return;
    const r = m.mergeConfig(
      { theme: { color: "bleu", size: 12 } },
      { theme: { size: 14 } },
    );
    assert.deepEqual(r, { theme: { color: "bleu", size: 14 } });
  },
);

test("10 – updateCity", async (t) => {
  const m = await exercice(t, "10-update-city.js", "updateCity");
  if (!m) return;
  const user = { name: "Imen", address: { city: "Sfax", zip: "3000" } };
  const u = m.updateCity(user, "Tunis");
  assert.equal(u.address.city, "Tunis");
  assert.equal(
    u.address.zip,
    "3000",
    "les autres champs de l'adresse doivent être conservés",
  );
  assert.equal(
    user.address.city,
    "Sfax",
    "l'utilisateur d'origine ne doit pas changer",
  );
  assert.notEqual(u, user, "il faut un nouvel objet");
  assert.notEqual(
    u.address,
    user.address,
    "il faut aussi une nouvelle adresse",
  );
});

test("11 – formatOrder", async (t) => {
  const m = await exercice(t, "11-format-order.js", "formatOrder");
  if (!m) return;
  assert.equal(
    m.formatOrder({ id: 12, client: { name: "Imen" }, items: ["a", "b", "c"] }),
    "Commande #12 – Imen – 3 article(s)",
  );
  assert.equal(
    m.formatOrder({ id: 1, client: { name: "Sami" } }),
    "Commande #1 – Sami – 0 article(s)",
    "items absent = tableau vide par défaut",
  );
});

test("12 – getStock", async (t) => {
  const m = await exercice(t, "12-get-stock.js", "getStock");
  if (!m) return;
  assert.equal(m.getStock({ stock: 5 }), 5);
  assert.equal(
    m.getStock({ stock: 0 }),
    0,
    "un stock de 0 est une vraie valeur : utilisez ?? et non ||",
  );
  assert.equal(m.getStock({}), "inconnu");
  assert.equal(
    m.getStock(undefined),
    "inconnu",
    "un produit undefined ne doit pas planter (pensez à ?.)",
  );
});

// ---------- D. Asynchrone ----------

test("13 – sleep", async (t) => {
  const m = await exercice(t, "13-sleep.js", "sleep");
  if (!m) return;
  const debut = Date.now();
  const p = m.sleep(100);
  assert.ok(p instanceof Promise, "sleep doit renvoyer une Promise");
  await p;
  assert.ok(
    Date.now() - debut >= 90,
    "sleep(100) doit attendre environ 100 ms",
  );
});

test("14 – getUserNames (réseau)", async (t) => {
  const m = await exercice(t, "14-api-users.js", "getUserNames");
  if (!m) return;
  const noms = await m.getUserNames();
  assert.equal(noms.length, 10);
  assert.deepEqual(
    noms,
    [...noms].sort((a, b) => a.localeCompare(b)),
    "les noms doivent être triés",
  );
  const vide = await m.getUserNames(
    "https://jsonplaceholder.typicode.com/introuvable-404",
  );
  assert.deepEqual(
    vide,
    [],
    "en cas d'erreur, la fonction renvoie [] au lieu de planter",
  );
});

test("15 – séquentiel et parallèle (réseau)", async (t) => {
  const m = await exercice(
    t,
    "15-parallele.js",
    "fetchPostsSequential",
    "fetchPostsParallel",
  );
  if (!m) return;
  const seq = await m.fetchPostsSequential([1, 2, 3]);
  const par = await m.fetchPostsParallel([1, 2, 3]);
  assert.equal(par.length, 3, "un tableau d'articles par utilisateur");
  assert.deepEqual(
    par,
    seq,
    "les deux versions doivent donner le même résultat, dans le même ordre",
  );
  assert.equal(par[1][0].userId, 2);
});

test("16 – withTimeout", async (t) => {
  const m = await exercice(t, "16-with-timeout.js", "withTimeout");
  if (!m) return;
  const lente = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
  assert.equal(await m.withTimeout(lente(20, "ok"), 200), "ok");
  await assert.rejects(
    m.withTimeout(lente(300, "trop tard"), 50),
    /Délai dépassé/,
  );
});

test("17 – retry", async (t) => {
  const m = await exercice(t, "17-retry.js", "retry");
  if (!m) return;
  let appels = 0;
  const instable = async () => {
    appels++;
    if (appels < 3) throw new Error("échec");
    return "réussi";
  };
  assert.equal(await m.retry(instable, 3), "réussi");
  assert.equal(appels, 3);
  appels = 0;
  await assert.rejects(
    m.retry(instable, 2),
    "avec 2 tentatives seulement, l'erreur doit remonter",
  );
  assert.equal(appels, 2);
});

// ---------- E. Modules et classes ----------

test("18 – utils.js (modules ES)", async (t) => {
  const m = await exercice(t, "utils.js", "sleep", "retry", "groupBy");
  if (!m) return;
  assert.equal(typeof m.sleep, "function");
  assert.deepEqual(Object.keys(m.groupBy([{ c: "x" }], "c")), ["x"]);
});

test("19 – ShoppingCart", async (t) => {
  const m = await exercice(t, "19-panier.js", "ShoppingCart");
  if (!m) return;
  const cart = new m.ShoppingCart();
  cart.add({ name: "Café", price: 2.5 }, 2);
  cart.add({ name: "Croissant", price: 1.2 }, 1);
  console.log({cart})
  assert.equal(cart.total, 6.2);
  cart.remove("Café");
  assert.equal(cart.total, 1.2);
  assert.equal(
    cart.items,
    undefined,
    "les articles doivent être dans un champ privé #items",
  );
  assert.equal(
    Object.keys(cart).length,
    0,
    "aucune propriété publique ne doit exposer les articles",
  );
});
