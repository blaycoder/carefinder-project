import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_FIREBASE_API_URL || "https://api.reliancehmo.com/v3/providers";

//Fetches data from the API based on the provided location.
export const fetchHospitals = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        location,
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
   
  }
};
