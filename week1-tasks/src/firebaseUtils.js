// firebaseUtils.js
import { auth } from "./Firebase";
import { db } from "./Firebase";
import { addDoc, collection, serverTimestamp , query , where , getDocs, orderBy , deleteDoc, FieldPath } from "firebase/firestore";

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
  } catch (err) {
    console.error(err);
  }
};

export  const deleteHistoryData = async (user , equation) =>{
  try {
    const historyRef = collection(db , "history");
    const q = query(historyRef , where("userId","==",user.uid) , where("equation","==",equation));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      const doc = querySnapshot.docs[0]; // only one as unique timestamp
      await deleteDoc(doc.ref);
    }
    console.log('History entry deleted successfully');
  } catch (err) {
    console.error(err);
  }
}


export const fetchHistoryData = async (user) => {
  if (!user) return [];

  try {
    const historyRef = collection(db , "history");
    const q = query(historyRef, where("userId", "==", user.uid) , orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      equation: doc.data().equation,
      timestamp: doc.data().timestamp.toDate().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      
    }));
  } catch (error) {
    console.error("Error fetching history data: ", error);
    return [];
  }
};


