import { app } from "../config/firebase";
import "firebase/dynamic-links";
import { getAuth } from "firebase/auth";

import { Button } from "@mui/material";
import React from "react";
import { Hospital } from "../types";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

interface ShareButtonProps {
  hospital: Hospital;
}

const ShareButton: React.FC<ShareButtonProps> = ({ hospital }) => {
  const handleShare = async (hospital: Hospital) => {
    // Implemented the share functionality here
    const dynamicLink = await app.dynamicLinks().createDynamicLink({
      link: `https://carefinder-11ab8.web.app/hospitals/${hospital.id}`,
      domain: "example.page.link",
      androidInfo: {
        packageName: "com.example.android",
      },
      iosInfo: {
        bundleId: "com.example.ios",
      },
    });

    const shareLink = dynamicLink.shortLink;

    // Sharing of link using Firebase's built-in email and link-sharing functionalities
    const actionCodeSettings = {
      url: shareLink,
      iOS: {
        bundles: ["com.example.ios"],
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
      },
      dynamicLinkDomain: "example.page.link",
    };

    try {
      await getAuth(app).sendSignInLinkToEmail(
        hospital.email,
        actionCodeSettings
      );
      console.log("Share link sent to email");
    } catch (error) {
      console.error("Error sending share link to email:", error);
    }
  };

  return (
    <p className="py-6">
      <Button variant="outlined" startIcon={<ShareOutlinedIcon />}>
        Share
      </Button>
    </p>
  );
};

export default ShareButton;
