import { collection, getDocs } from "firebase/firestore";
import db from "../utils/firestore";
import { Hospital } from "../types";

let hospitalsCollection: Hospital[] = [];
async function fetchCollection() {
  const dbInstance = collection(db, "hospitals");
  const hospitalsSnapshot = await getDocs(dbInstance);
  hospitalsSnapshot.forEach((doc) => {
    hospitalsCollection.push({
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      phone_number: doc.data().phone_number,
      email: doc.data().email,
    });
  });
  return hospitalsCollection;
}
fetchCollection();
const filteredHospitals = (hospitalsCollection ?? ([] as Hospital[])).filter(
  (hospital: Hospital) =>
    hospital.name.toLowerCase().includes(hospital.name.toLowerCase())
);

export { filteredHospitals };
