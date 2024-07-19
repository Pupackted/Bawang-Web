import firebase_app from "./config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getDocument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      result = snapshot.data();
      console.log(result);
    } else {
      throw "No Data";
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
