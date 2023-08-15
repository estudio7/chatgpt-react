// src/components/Filters.tsx
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <Box my={2}>
      <TextField
        label="Filter"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
      />
    </Box>
  );
};

export default Filter;
