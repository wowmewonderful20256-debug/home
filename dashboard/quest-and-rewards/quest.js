// quests/quest.js
import { db } from "../firebaseConfig.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function updateQuestProgress(uid, questId, amount = 1) {
  try {
    const ref = doc(db, "user_quests", `${uid}_${questId}`);
    const snap = await getDoc(ref);

    // Jeśli użytkownik nie ma jeszcze wpisu, tworzymy go od zera
    if (!snap.exists()) {
      await setDoc(ref, {
        uid,
        questId,
        doneCount: amount,
        claimed: false
      });
      console.log(`Created new progress for "${questId}"`);
    } else {
      const data = snap.data();
      const newDone = (data.doneCount || 0) + amount;

      await updateDoc(ref, {
        doneCount: newDone
      });

      console.log(`Progress updated for "${questId}": ${newDone}`);
    }
  } catch (err) {
    console.error("updateQuestProgress error:", err);
  }
        }
