import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface StyledButtonProps extends ButtonProps {
  text: string;
}
export const divStyle = {
  borderRadius: "3.125rem",
  border: "1px solid var(--kaplan-deep-purle, #190755)",
  background: "var(--kaplan-deep-purle, #190755)",
  color: "#FFF",
  padding: "5px 10px",
  margin: "5px",
  display: "inline-block",
};
export const boxStyle = {
  borderRadius: "3.125rem",
  border: "1px solid var(--kaplan-deep-purle, #190755)",
  background: "var(--kaplan-deep-purle, #190755)",
  color: "#FFF",
  padding: "0px 10px",
  margin: "5px",
  display: "inline-block",
};
export const typographyStyle = {
  color: "#211069",
  fontFamily: "Open Sans",
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "160%", // 1.4rem
};
export const titleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "rgb(25, 7, 85)",
};

export const headerStyle = {
  color: "rgb(25, 7, 85)",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.8rem", // 0.825rem
  fontFamily: "Open Sans",
};

const StyledButton: React.FC<StyledButtonProps> = ({ text, ...props }) => {
  return (
    <Button
      {...props}
      style={{
        margin: "0.3rem",
        borderRadius: "3.125rem",
        border: "1px solid #190755",
        color: "#190755",
        fontFamily: "Open Sans",
        fontSize: "1.1rem",
        fontWeight: 400,
        padding: "0 10px",
        textTransform: "initial",
      }}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
