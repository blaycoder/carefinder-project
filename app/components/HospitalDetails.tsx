"use client";
import React, { useState, useEffect } from "react";
import { Hospital } from "../types";
import db from "../utils/firestore";
import { doc, getDoc, } from "firebase/firestore";
import { useParams } from "next/navigation";

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);

  const fetchHospitalDetails = async () => {
    try {
      const hospitalRef = doc(db, "hospitals", id);
      console.log(hospitalRef)
      const hospitalSnapshot = await getDoc(hospitalRef);
      if (hospitalSnapshot.exists()){
         const hospitalData = hospitalSnapshot.data() as Hospital;
         console.log(hospitalData);
         setHospital(hospitalData);
      }else{
         console.log("No such document!");
      }
       
    } catch (error) {
      console.log("Error fetching hospital details:", error);
    }
  };

  useEffect(() => {
   if (id) fetchHospitalDetails();
  }, [id]);

    if (!hospital) {
      return <div>Loading...</div>;
    }

  return (
    <div>
        This is my page
      <h1>{hospital.name}</h1>
      <p>Address: {hospital.address}</p>
      <p>Phone: {hospital.phone_number}</p>
      <p>Email: {hospital.email}</p>
    </div>
  );
};

export default HospitalDetails;