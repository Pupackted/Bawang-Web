import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "./config";

const db = getFirestore(firebase_app);

export default async function getCollection(collectionName) {
  const collectionRef = collection(db, collectionName);

  let result = null;
  let error = null;

  try {
    const snapshot = await getDocs(collectionRef); // Await the getDocs promise
    result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}

