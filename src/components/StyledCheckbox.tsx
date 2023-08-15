import React from "react";
import { styled } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";

interface StyledCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const StyledComponent = styled(Checkbox)(({ theme }) => ({
    "&.MuiCheckbox-root": {},
    "& .MuiSvgIcon-root": {},
    "&.Mui-checked .MuiSvgIcon-root": {
      visibility: "visible",
    },
  }));

  return (
    <label
      style={{
        fontFamily: "Open Sans",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 400,
        color: "#190755",
        border: "1px solid #190755",
        borderRadius: "3.125rem",
        height: "2.625rem",
        gap: "1.25rem",
        margin: "3px 5px",
        cursor: "pointer",
      }}
    >
      <span style={{ marginLeft: "10px" }}>{label}</span>
      <StyledComponent
        checked={checked}
        onChange={onChange}
        icon={<AddIcon />}
        checkedIcon={<CheckIcon />}
      />
    </label>
  );
};

export default StyledCheckbox;
