import { Button } from "@mui/material";
import { useFirebase } from "../hooks/useFirebase";

const ExportHospitals = () => {
  const { exportHospitals } = useFirebase();

  const handleExport = () => {
    exportHospitals();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Export Hospitals
    </Button>
  );
};

export default ExportHospitals;
