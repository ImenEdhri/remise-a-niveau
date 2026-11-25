// Tests automatiques – Semaine 1, partie TypeScript
// Lancement depuis la racine du dépôt :  npm run test:ts
//
// Les tests lisent le JavaScript compilé par TypeScript dans dist/.
// Un exercice pas encore créé (ou pas encore compilé) est marqué « skipped ».
// L'exercice 15 n'est pas testé automatiquement : Claude le relit.
// Les erreurs TypeScript s'affichent AVANT les tests : elles comptent aussi !

import { test } from 'node:test';
import assert from 'node:assert/strict';

const DOSSIER = '../../dist/';

async function charger(fichier) {
  try {
    return await import(new URL(DOSSIER + fichier, import.meta.url));
  } catch (e) {
    if (e.code === 'ERR_MODULE_NOT_FOUND' && e.message.includes(fichier)) return null;
    throw e;
  }
}

async function exercice(t, fichier, ...noms) {
  const m = await charger(fichier);
  if (!m) { t.skip(`${fichier} pas encore créé ou pas compilé`); return null; }
  for (const nom of noms) {
    assert.ok(nom in m, `${fichier} doit exporter « ${nom} »`);
  }
  return m;
}

const proche = (reel, attendu, message) =>
  assert.ok(Math.abs(reel - attendu) < 1e-9, `${message ?? ''} attendu ${attendu}, obtenu ${reel}`);

const cafe = () => ({ id: 1, name: 'Café', category: 'Boissons', price: 2.5 });
const croissant = () => ({ id: 2, name: 'Croissant', category: 'Viennoiseries', price: 1.2 });
const pain = () => ({ id: 3, name: 'Pain au chocolat', category: 'Viennoiseries', price: 1.4, stock: 4 });

// ---------- Jour 1 ----------

test('TS 01 – formatPrice', async (t) => {
  const m = await exercice(t, '01-prix.js', 'formatPrice'); if (!m) return;
  assert.equal(m.formatPrice(2.5), '2.50 DT');
  assert.equal(m.formatPrice(3, '€'), '3.00 €');
  assert.equal(m.formatPrice(0), '0.00 DT');
});

test('TS 02 – isAvailable', async (t) => {
  const m = await exercice(t, '02-produit.js', 'isAvailable'); if (!m) return;
  assert.equal(m.isAvailable(cafe()), true, 'sans stock = disponible');
  assert.equal(m.isAvailable({ ...cafe(), stock: 3 }), true);
  assert.equal(m.isAvailable({ ...cafe(), stock: 0 }), false, 'stock à 0 = indisponible');
});

test('TS 03 – formatId', async (t) => {
  const m = await exercice(t, '03-identifiant.js', 'formatId'); if (!m) return;
  assert.equal(m.formatId(42), '#0042');
  assert.equal(m.formatId(12345), '#12345', 'un nombre de plus de 4 chiffres reste entier');
  assert.equal(m.formatId('ab7'), '#AB7');
});

test('TS 04 – remises', async (t) => {
  const m = await exercice(t, '04-remises.js', 'percentOff', 'fixedOff', 'combine'); if (!m) return;
  proche(m.percentOff(20)(10), 8, 'percentOff(20)(10) :');
  assert.equal(m.fixedOff(1)(10), 9);
  assert.equal(m.fixedOff(15)(10), 0, 'une remise fixe ne descend jamais sous 0');
  proche(m.combine(m.percentOff(10), m.fixedOff(1))(20), 17, 'combine applique dans l\'ordre :');
  assert.equal(m.combine()(5), 5, 'sans remise, le prix ne change pas');
});

test('TS 05 – génériques', async (t) => {
  const m = await exercice(t, '05-generiques.js', 'first', 'last', 'groupBy'); if (!m) return;
  assert.equal(m.first([1, 2, 3]), 1);
  assert.equal(m.last([1, 2, 3]), 3);
  assert.equal(m.first([]), undefined);
  assert.equal(m.last([]), undefined);
  const g = m.groupBy([cafe(), croissant(), pain()], 'category');
  assert.deepEqual(Object.keys(g).sort(), ['Boissons', 'Viennoiseries']);
  assert.equal(g.Viennoiseries.length, 2);
});

// ---------- Jour 2 ----------

test('TS 06 – Stack', async (t) => {
  const m = await exercice(t, '06-pile.js', 'Stack'); if (!m) return;
  const s = new m.Stack();
  assert.equal(s.isEmpty(), true);
  s.push('a'); s.push('b');
  assert.equal(s.size, 2);
  assert.equal(s.peek(), 'b', 'peek regarde sans retirer');
  assert.equal(s.size, 2);
  assert.equal(s.pop(), 'b');
  assert.equal(s.pop(), 'a');
  assert.equal(s.pop(), undefined, 'pop sur une pile vide renvoie undefined');
  assert.equal(s.isEmpty(), true);
  assert.equal(Object.keys(s).length, 0, 'les éléments doivent être dans un champ privé');
});

test('TS 07 – toPreview et updateProduct', async (t) => {
  const m = await exercice(t, '07-utilitaires.js', 'toPreview', 'updateProduct'); if (!m) return;
  assert.deepEqual(m.toPreview(pain()), { name: 'Pain au chocolat', price: 1.4 }, 'uniquement name et price');
  const p = cafe();
  const u = m.updateProduct(p, { price: 2.8 });
  assert.equal(u.price, 2.8);
  assert.equal(u.id, 1);
  assert.equal(p.price, 2.5, 'le produit d\'origine ne doit pas changer');
  assert.notEqual(u, p, 'il faut un nouvel objet');
});

test('TS 08 – countByCategory et getProperty', async (t) => {
  const m = await exercice(t, '08-record-keyof.js', 'countByCategory', 'getProperty'); if (!m) return;
  assert.deepEqual(m.countByCategory([]), { Boissons: 0, Viennoiseries: 0, 'Salé': 0 }, 'toujours les 3 catégories');
  assert.deepEqual(m.countByCategory([cafe(), croissant(), pain()]), { Boissons: 1, Viennoiseries: 2, 'Salé': 0 });
  assert.equal(m.getProperty(cafe(), 'price'), 2.5);
});

test('TS 09 – describePayment', async (t) => {
  const m = await exercice(t, '09-paiement.js', 'describePayment'); if (!m) return;
  assert.equal(m.describePayment({ kind: 'card', last4: '1234' }), 'Carte **** 1234');
  assert.equal(m.describePayment({ kind: 'cash', amountGiven: 10 }), 'Espèces : 10.00 DT');
  assert.equal(m.describePayment({ kind: 'loyalty', points: 120 }), 'Fidélité : 120 points');
});

test('TS 10 – isProduct et parseProducts', async (t) => {
  const m = await exercice(t, '10-validation.js', 'isProduct', 'parseProducts'); if (!m) return;
  assert.equal(m.isProduct(cafe()), true);
  assert.equal(m.isProduct(pain()), true, 'un stock numérique est accepté');
  assert.equal(m.isProduct(null), false, 'null');
  assert.equal(m.isProduct('Café'), false, 'une chaîne');
  assert.equal(m.isProduct({ id: 1, name: 'Café', category: 'Boissons' }), false, 'prix manquant');
  assert.equal(m.isProduct({ ...cafe(), category: 'Pizza' }), false, 'catégorie inconnue');
  assert.equal(m.isProduct({ ...cafe(), price: -1 }), false, 'prix négatif');
  assert.equal(m.isProduct({ ...cafe(), id: '1' }), false, 'id en chaîne');
  assert.equal(m.isProduct({ ...cafe(), stock: '3' }), false, 'stock en chaîne');
  const json = JSON.stringify([cafe(), { name: 'Invalide' }, croissant()]);
  assert.equal(m.parseProducts(json).length, 2, 'seuls les produits valides sont gardés');
  assert.deepEqual(m.parseProducts('ceci n\'est pas du JSON'), [], 'JSON invalide → []');
  assert.deepEqual(m.parseProducts('{"id": 1}'), [], 'pas un tableau → []');
});

// ---------- Jour 3 ----------

test('TS 11 – statuts de commande', async (t) => {
  const m = await exercice(t, '11-statuts.js', 'ORDER_STATUSES', 'canTransition'); if (!m) return;
  assert.deepEqual([...m.ORDER_STATUSES], ['pending', 'paid', 'preparing', 'ready', 'cancelled']);
  assert.equal(m.canTransition('pending', 'paid'), true);
  assert.equal(m.canTransition('pending', 'cancelled'), true);
  assert.equal(m.canTransition('pending', 'ready'), false, 'on ne saute pas d\'étape');
  assert.equal(m.canTransition('paid', 'preparing'), true);
  assert.equal(m.canTransition('preparing', 'ready'), true);
  assert.equal(m.canTransition('preparing', 'cancelled'), false);
  assert.equal(m.canTransition('ready', 'pending'), false, 'ready est un état final');
  assert.equal(m.canTransition('cancelled', 'paid'), false, 'cancelled est un état final');
});

test('TS 12 – fetchJson et safeFetchJson', async (t) => {
  const m = await exercice(t, '12-fetch-type.js', 'fetchJson', 'safeFetchJson'); if (!m) return;
  const vraiFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes('/ok')) return { ok: true, status: 200, json: async () => ({ a: 1 }) };
    if (String(url).includes('/404')) return { ok: false, status: 404, json: async () => ({}) };
    throw new Error('Réseau indisponible');
  };
  try {
    assert.deepEqual(await m.fetchJson('https://api.test/ok'), { a: 1 });
    await assert.rejects(m.fetchJson('https://api.test/404'), /HTTP 404/, 'fetchJson doit rejeter avec « HTTP 404 »');
    assert.deepEqual(await m.safeFetchJson('https://api.test/ok'), { ok: true, data: { a: 1 } });
    assert.deepEqual(await m.safeFetchJson('https://api.test/404'), { ok: false, error: 'HTTP 404' });
    assert.deepEqual(await m.safeFetchJson('https://api.test/panne'), { ok: false, error: 'Réseau indisponible' },
      'safeFetchJson ne doit jamais rejeter');
  } finally {
    globalThis.fetch = vraiFetch;
  }
});

test('TS 13 – ShoppingCart', async (t) => {
  const m = await exercice(t, '13-panier.js', 'ShoppingCart'); if (!m) return;
  const cart = new m.ShoppingCart();
  cart.add(cafe(), 2);
  cart.add(croissant());
  cart.add(pain(), 1);
  assert.equal(cart.total, 7.6, 'le total doit être arrondi à 2 décimales');
  assert.equal(cart.itemCount, 4);
  cart.add(cafe(), 1);
  assert.equal(cart.lines.length, 3, 'un même produit ne crée pas de nouvelle ligne');
  assert.equal(cart.itemCount, 5);
  const copie = cart.lines;
  copie.length = 0;
  assert.equal(cart.lines.length, 3, 'lines doit renvoyer une copie');
  cart.remove(1);
  assert.equal(cart.total, 2.6);
  assert.throws(() => cart.add(cafe(), 0), RangeError, 'quantité 0 → RangeError');
  assert.throws(() => cart.add(cafe(), 1.5), RangeError, 'quantité non entière → RangeError');
  assert.equal(Object.keys(cart).length, 0, 'les lignes doivent être dans un champ privé');
});

test('TS 14 – retry', async (t) => {
  const m = await exercice(t, '14-retry.js', 'retry'); if (!m) return;
  let appels = 0;
  const instable = async () => { appels++; if (appels < 3) throw new Error('échec'); return 'réussi'; };
  assert.equal(await m.retry(instable, 3), 'réussi');
  assert.equal(appels, 3);
  appels = 0;
  await assert.rejects(m.retry(instable, 2), /échec/, 'avec 2 tentatives, l\'erreur doit remonter');
  assert.equal(appels, 2);
  appels = 0;
  const debut = Date.now();
  await m.retry(instable, 3, 50);
  assert.ok(Date.now() - debut >= 90, 'deux attentes de 50 ms entre les 3 tentatives');
  await assert.rejects(m.retry(instable, 0), RangeError, 'attempts < 1 → RangeError');
});