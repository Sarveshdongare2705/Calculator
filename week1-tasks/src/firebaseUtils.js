// firebaseUtils.js

import { auth } from "./Firebase";
import { db } from "./Firebase"; 
import { addDoc, collection, serverTimestamp , query , where , getDocs, orderBy } from "firebase/firestore";

export const storeEquationHistory = async (equation, result) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "history"), {
        equation: `${equation} = ${result}`,
        timestamp: serverTimestamp(),
        userId: user.uid
      });
      console.log("Equation history added to Firestore!");
    } else {
      console.log("User not logged in. Equation history not stored.");
    }
  } catch (error) {
    console.error("Error adding equation history to Firestore: ", error);
  }
};


const fetchHistoryData = async (user) => {
  if (!user) return [];

  try {
    const historyQuery = query(collection(db, "history"), where("userId", "==", user.uid) , orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(historyQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      equation: doc.data().equation,
      timestamp: doc.data().timestamp.toDate().toLocaleString(),
    }));
  } catch (error) {
    console.error("Error fetching history data: ", error);
    return [];
  }
};

export default fetchHistoryData;

