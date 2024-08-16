import { Button } from "@mui/material";
import { useFirebase } from "../hooks/useFirebase";

const ShareHospitals = () => {
  const { shareHospitals } = useFirebase();

  const handleShare = () => {
    shareHospitals();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleShare}>
      Share Hospitals
    </Button>
  );
};

export default ShareHospitals;
