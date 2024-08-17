"use client";
import Image from "next/image";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, ButtonGroup } from "@mui/material";
import { Hospital } from "../types/index";
import { fetchHospitals } from "../utils/api";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Pagination, Modal, Typography, Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useHospitalsCollection } from "../utils/hospitalsCollection";
import "../globals.css";
import { useFirebase } from "../hooks/useFirebase";
import { auth } from "../config/firebase";
import Login from "../page";
import { User } from "firebase/auth";
import HospitalEntryModal from "../components/HospitalEntryModal";

export default function Home() {
  const { isLoading, data } = useQuery("location", fetchHospitals);
  // const { addHospitals } = useHospitalsCollection();
  const { exportHospitals, shareHospitals } = useFirebase();

  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(21);
  const [user, setUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEntryModal, setOpenEntryModal] = useState<Boolean>(false);

  const filteredHospitals = (data ?? ([] as Hospital[])).filter(
    (hospital: Hospital) =>
      hospital.name.toLowerCase().includes(location.toLowerCase())
  );

  // const handleAddHospitals = async () => {
  //   await addHospitals();
  // };

  const handleAddHospital = ()=>{
    setOpenEntryModal(true);
  }

  const handleExportHospitals = async () => {
    await exportHospitals();
  };

  const handleShare = async () =>{
    await shareHospitals()
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };



  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setOpenModal(true);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!user) {
    return <Login />;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = filteredHospitals.slice(startIndex, endIndex);

  return (
    <main className="w-9/12">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="rounded-lg"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Successful!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have successfully logged in.
          </Typography>
        </Box>
      </Modal>

      <section className="my-5">
        <div className="text-center">
          <h3>Welcome, {user.displayName}</h3>
          <h1 className="text-4xl py-2 font-bold text-sky-700">
            Find the right hospital for you
          </h1>
          <p className="text-base">
            Search for hospitals in your area, view their details, and share
            information with others.
          </p>
        </div>
      </section>
      <Grid container spacing={2}>
        <Grid item xs={12} className="my-3">
          <TextField
            label="Enter your location"
            value={location}
            onChange={handleLocationChange}
            // onClick={handleSearch}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup
            aria-label="button group"
            variant="outlined"
            className="btn-group"
          >
            <div className="my-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddHospital}
              >
                Add Hospital Entry
              </Button>
            </div>
            {openEntryModal && (
              <HospitalEntryModal onClose={() => setOpenEntryModal(false)} />
            )}
            {/* <div className="my-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddHospitals}
              >
                Save Data
              </Button>
            </div> */}
            <div className="my-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleExportHospitals}
              >
                Export Hospitals
              </Button>
            </div>
            <div className="my-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </ButtonGroup>
        </Grid>
        {isLoading ? (
          <Grid
            key={1}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="my-5"
          >
            <Grid item xs={2} sm={4} md={4}>
              <Stack spacing={1}>
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={60}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={30}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={30}
                  animation="wave"
                />
              </Stack>

              <Stack spacing={1}>
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={60}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={30}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={30}
                  animation="wave"
                />
              </Stack>
            </Grid>
          </Grid>
        ) : paginatedResults.length > 0 ? (
          <div className="hospital-data-container my-5 flex flex-column flex-wrap justify-between gap-2">
            {paginatedResults.map((hospital: Hospital) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                key={hospital.id}
                spacing={2}
                className="bg-blue-50 rounded p-5 w-9/12 flex-1 basis-1/4"
              >
                <h2 className="text-xl font-bold underline text-sky-600">
                  {hospital.name}
                </h2>
                <p className="py-2">
                  <HomeOutlinedIcon />
                  {hospital.address}
                </p>
                <p className="py-2">
                  <LocalPhoneOutlinedIcon />
                  {hospital.phone_number}
                </p>
                <p className="py-2">{hospital.email}</p>
                <p className="py-6">
                  <Button
                    variant="outlined"
                    startIcon={<ShareOutlinedIcon />}
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                </p>
              </Grid>
            ))}
          </div>
        ) : (
          <Grid item xs={12}>
            <p>Search result not found</p>
          </Grid>
        )}

        <div className="paginationContainer">
          <Grid item xs={12} className="my-5">
            <Pagination
              size="large"
              count={Math.ceil(filteredHospitals.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Grid>
        </div>
      </Grid>
    </main>
  );
}
