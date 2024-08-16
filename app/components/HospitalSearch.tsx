'use client'
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { List, ListItem, ListItemText, TextField, Button } from "@shadcn/ui";
import { Search } from "@material-ui/icons";

const HospitalSearch = () => {
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const searchHospitals = async () => {
    try {
      const response = await axios.get(
        "https://api.reliancehmo.com/v3/providers",
        {
          params: { location },
        }
      );
      setHospitals(response.data.providers);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button
        onClick={searchHospitals}
        variant="outline"
        color="primary"
        // startIcon={<Search />}
      >
        <Search/> Search
      </Button>
      {hospitals.length === 0 ? (
        <span>No hospitals found</span>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {hospitals.map((hospital, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <div>
                <strong>{hospital.name}</strong>
              </div>
              <div>Address: {hospital.address}</div>
              <div>Phone: {hospital.phone}</div>
              <div>Email: {hospital.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalSearch;
