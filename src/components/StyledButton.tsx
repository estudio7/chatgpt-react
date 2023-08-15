import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Padding } from "@mui/icons-material";

interface StyledButtonProps extends ButtonProps {
  text: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, ...props }) => {
  return (
    <Button
      {...props}
      style={{
        borderRadius: "3.125rem",
        border: "1px solid #190755",
        color: "#190755",
        fontFamily: "Open Sans",
        fontSize: "1rem",
        fontWeight: 400,
        textTransform: "initial",
        lineHeight: "1rem",
        padding: "0px 20px",
        margin: "0.2rem",
      }}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
