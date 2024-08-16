import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { remark } from "remark";
import html from "remark-html";
import {Hospital} from "../types/index"
import { v4 as uuidv4 } from 'uuid';
import { useHospitalsCollection } from "../utils/hospitalsCollection";



interface HospitalEntryModalProps {
  onClose: () => void;
}

const HospitalEntryModal = ({ onClose }: HospitalEntryModalProps) => {
  const { addHospital } = useHospitalsCollection();
  const [hospitalEntry, setHospitalEntry] = useState<Hospital>({
    id: uuidv4(),
    name: "",
    address: "",
    phone_number: "",
    email: "",
    description: "",
  });
  const [markdownText, setMarkdownText] = useState("");

  const handleSave = () => {
    setHospitalEntry({ ...hospitalEntry, description: markdownText });
    addHospital(hospitalEntry);
    onClose();
  };

  const handleMarkdownChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    setMarkdownText(text);
    const result = await remark().use(html).process(text);
    const htmlString = result.toString();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          //   width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
        className="rounded-lg"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Hospital Entry
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter hospital details below:
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="flex gap-4">
            <TextField
              label="Name"
              value={hospitalEntry.name}
              onChange={(event) =>
                setHospitalEntry({ ...hospitalEntry, name: event.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={hospitalEntry.address}
              onChange={(event) =>
                setHospitalEntry({
                  ...hospitalEntry,
                  address: event.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
          </div>
          <div className="flex gap-4">
            <TextField
              label="Phone Number"
              value={hospitalEntry.phone_number}
              onChange={(event) =>
                setHospitalEntry({
                  ...hospitalEntry,
                  phone_number: event.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={hospitalEntry.email}
              onChange={(event) =>
                setHospitalEntry({
                  ...hospitalEntry,
                  email: event.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
          </div>
          <textarea
            value={markdownText}
            onChange={handleMarkdownChange}
            placeholder=" Enter description in markdown format"
            rows={10}
            cols={48}
            className="border-solid border-2 border-current rounded-sm"
          />
          <p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="bg-emerald-500 drop-shadow hover:bg-emerald-600"
            >
              Save
            </Button>
          </p>
        </form>
      </Box>
    </Modal>
  );
};

export default HospitalEntryModal;
