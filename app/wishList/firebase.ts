import { initializeApp } from "firebase/app";
import "firebase/functions";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import { Wish, WishModel, fromJson } from "../models/models";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
console.log(app.name);
const database = getDatabase();

export async function getAllItems() {
  // TODO: get userId
  let userId = "0";

  if (userId === null) {
    // TODO: get userId
    userId = "0";
  }
  let wishes: WishModel[] = [];
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          wishes.push(new WishModel(child.val().name, child.val().id));
        });
        return wishes;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
  return wishes;
}

export function deleteItem(wishId: string) {
  // TODO: get userId
  let userId = "0";

  if (userId === null) {
    // TODO: get userId
    userId = "0";
  }
  remove(ref(database, userId + "/" + wishId));
}

export function addItem(wish: Wish) {
  // TODO: get userId
  let userId = "0";

  if (userId === null) {
    // TODO: get userId
    userId = "0";
  }

  console.log(wish);
  update(ref(database, userId + "/" + wish.id), {
    id: wish.id,
    name: wish.name,
    description: wish.description,
    price: wish.price ?? 0,
    shopUrl: wish.shopUrl,
    important: wish.important,
  });
}
