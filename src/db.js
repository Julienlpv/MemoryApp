import { openDB } from 'idb';

async function initDB() {
  const db = await openDB('MemoryDB', 1, {
    upgrade(db) {
      // Créez vos objets stock (tables) ici
      const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
          userStore.createIndex('name', 'name');
          // Création de l'objet stock 'cards'
      const cardStore = db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
      cardStore.createIndex('title', 'title');
      cardStore.createIndex('categoryId', 'categoryId');

      // Création de l'objet stock 'categories'
      const categoryStore = db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
      categoryStore.createIndex('name', 'name');
    },
  });
  return db;
}

const dbPromise = initDB();

async function getUsers() {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  return store.getAll();
}

async function createUser(user) {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  await store.add(user);
  await tx.done;
}

// Fonctions pour les catégories
async function getCategories() {
  const db = await dbPromise;
  const tx = db.transaction('categories', 'readonly');
  const store = tx.objectStore('categories');
  return store.getAll();
}

async function createCategory(category) {
  const db = await dbPromise;
  const tx = db.transaction('categories', 'readwrite');
  const store = tx.objectStore('categories');
  await store.add(category);
  await tx.done;
}

// Fonctions pour les cartes
async function getCards() {
  const db = await dbPromise;
  const tx = db.transaction('cards', 'readonly');
  const store = tx.objectStore('cards');
  return store.getAll();
}

async function createCard(card) {
  const db = await dbPromise;
  const tx = db.transaction('cards', 'readwrite');
  const store = tx.objectStore('cards');
  await store.add(card);
  await tx.done;
}

// ... Ajoutez d'autres fonctions pour les autres opérations CRUD et objets stock

export { getUsers, createUser, getCategories, createCategory, getCards, createCard };

