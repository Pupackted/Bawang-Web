import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "./config";

export async function uploadImage(path, data) {
  const storage = getStorage(firebase_app);
  const imageRef = ref(storage, path);
  const uploadImage = await uploadBytes(imageRef, data).then((res)=>getDownloadURL(res.ref));
  return uploadImage
}

// const imageUrl = await uploadImage(
//     `product_images/${data.name}/${image.name}`,
//     image
//   );