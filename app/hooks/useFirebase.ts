"use client";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { useCallback } from "react";
// import { auth, storage } from "./../config/firebase";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import db from "./../utils/firestore";

export const useFirebase = () => {
  const exportHospitals = useCallback(async () => {
    // Implement export functionality
    const hospitalsRef = collection(db, "hospitals");
    const hospitalsSnapshot = await getDocs(hospitalsRef);
    const hospitalsData = hospitalsSnapshot.docs.map((doc: any) => doc.data());
    if (hospitalsData) {
      const csvData = Papa.unparse(hospitalsData, {
        header: true,
        delimiter: ",",
      });
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "list_of_hospitals.csv");
    }
  }, []);

  // share hospitals functionality
  const shareHospitals = useCallback(async () => {
    const hospitalsRef = collection(db, "hospitals");
    const hospitalsSnapshot = await getDocs(hospitalsRef);
    const hospitalsData = hospitalsSnapshot.docs.map((doc: any) => doc.data());

    const csvData = Papa.unparse(hospitalsData, {
      header: true,
      delimiter: ",",
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "list of hospitals.csv")
    const shareLink = document.body.appendChild(link);
    if (navigator.canShare()) {
      console.log("can share");
      try {
        await navigator.share({
          title: "List of hospitals",
          url: `${shareLink}`,
        });
      } catch (error) {
        console.log(error);
      }
    }
    
  }, []);

  

  return {
    exportHospitals,
    shareHospitals,
  };
};
