import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-congfig";

export const userCollectionRef = collection(db, "CRUD");
class UserDataService {
  addUser = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };
  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "CRUD", id);
    return updateDoc(userDoc, updatedUser);
  };
  deleteUser = (id) => {
    const userDoc = doc(db, "CRUD", id);
    return deleteDoc(userDoc);
  };

  getUser = (id) => {
    const userDoc = doc(db, "CRUD", id);
    return getDoc(userDoc);
  };
}
export default new UserDataService();
