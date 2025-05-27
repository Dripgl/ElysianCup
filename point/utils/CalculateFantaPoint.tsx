import { getFirestore, doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { app } from '../../app/lib/firebase';


const db = getFirestore(app);

const eventPoints = {
  goal: 3,
  assist: 1,
  autogoal: -2,
  yellow_card: -0.5,
  red_card: -1,
  penalty_saved: 3,
  penalty_missed: -3,
  goal_conceded: -1,
  clean_sheet: 1
};

export const calculateFantasyPoints = async (matchId: string) => {
  try {
    const matchRef = doc(db, 'matchCalendar', matchId);
    const matchSnap = await getDoc(matchRef);
    if (!matchSnap.exists()) {
      console.error('Partita non trovata');
      return;
    }

    const matchData = matchSnap.data();
    const events = matchData?.events || [];

    const teamsSnap = await getDocs(collection(db, 'fantateams'));
    const teams = teamsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const team of teams) {
      let totalPoints = 0;
      for (const event of events) {
        if (team.players?.includes(event.player)) {
          totalPoints += eventPoints[event.type] || 0;
        }
      }
      const teamRef = doc(db, 'fantateams', team.id);
      await updateDoc(teamRef, { points: totalPoints });
    }

    console.log(`Calcolo punti completato per la partita ${matchId}`);
  } catch (error) {
    console.error('Errore durante il calcolo dei punti:', error);
  }
};
