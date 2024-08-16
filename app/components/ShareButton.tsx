'use client'
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Hospital } from "../types";


const ShareButton: FC<{ hospital: Hospital }> = ({ hospital }) => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      startIcon={<ShareOutlinedIcon />}
      onClick={() => router.push(`/hospitals/${hospital.id}`)}
    >
      Share
    </Button>
  );
};

export default ShareButton;
