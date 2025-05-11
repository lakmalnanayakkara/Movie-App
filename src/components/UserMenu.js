import { useState, useContext } from "react";
import { IconButton, Menu, MenuItem, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Store } from "./Store";

export default function UserMenu({ username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    handleClose();
    navigate("/");
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleMenu} sx={{ p: 0 }}>
          <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>{username}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
