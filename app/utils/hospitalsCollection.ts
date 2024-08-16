import { useState } from "react";
import { Hospital } from "../types";
import { fetchHospitals } from "../utils/api";
import { useQuery } from "react-query";
import db from "../utils/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const useHospitalsCollection = () => {
  // const [location, setLocation] = useState<string>(""); // Ensure location is a string

  const { isLoading, error, data } = useQuery<Hospital[]>(
    "location",
    fetchHospitals
  );

  const allHospitals = data ?? [];

  // const allHospitals = (data ?? []).filter((hospital: Hospital) =>
  //   hospital.name.toLowerCase().includes(location.toLowerCase())
  // );

  const dbInstance = collection(db, "hospitals");
  const addHospitals = async () => {
    const dbInstanceSnapshot = await getDocs(dbInstance);
    if (dbInstanceSnapshot.empty) {
      try {
        await Promise.all(
          allHospitals.map((hospital: Hospital) =>
            addDoc(dbInstance, {
              id: hospital.id.toString(),
              name: hospital.name,
              address: hospital.address,
              phone_number: hospital.phone_number,
            })
          )
        );
        console.log("Hospitals added successfully.");
      } catch (e) {
        console.error("Error adding hospitals: ", e);
      }
    }
  };

  const addHospital = async (hospitalEntry: Hospital) => {
    try {
      await addDoc(dbInstance, hospitalEntry);
    } catch (error) {
      console.error("Error adding the hospital: ", error);
    }
  };

  return {
    isLoading,
    error,
    addHospitals,
    addHospital,
    // setLocation, // Return setLocation to allow the caller to update the location
  };
};
