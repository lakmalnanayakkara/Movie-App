import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <form onSubmit={submitHandler} style={{ display: "flex", flexGrow: 1 }}>
      <TextField
        variant="outlined"
        sx={{ border: "1px solid", color: "white" }}
        placeholder="Search Movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="search"
                sx={{ color: "white" }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
