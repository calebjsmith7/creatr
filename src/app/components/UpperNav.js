"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { useAuth } from "@/context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

export default function UpperNav({ children }) {
  const [open, setOpen] = useState(false);
  const { userData, signOut } = useAuth();
  const toggleDrawer = (val) => () => setOpen(val);
  const profilePhoto = userData?.profilePhoto;

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{
          boxShadow: "none",
          borderBottom: "none",
          background: "#1d1d1e",
          width: "100vw",
          left: 0,
          top: 0,
          mb: 2,
          color: "white",
        }}
      >
        <Toolbar>
          {/* Logo on the left */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
            <img
              src="/creatr-logo-wht.png"
              alt="Logo"
              style={{ maxWidth: "930px", height: 40 }}
            />
          </Box>

          {/* Navigation options */}
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Typography
              key={"Library"}
              variant="button"
              sx={{ cursor: "pointer", ml: 3 }}
            >
              Library
            </Typography>
            <Typography
              key={"Resources"}
              variant="button"
              sx={{ cursor: "pointer", ml: 3 }}
            >
              Resources
            </Typography>
            <Typography
              key={"Categories"}
              variant="button"
              sx={{ cursor: "pointer", ml: 3 }}
            >
              Categories
            </Typography>
          </Box>

          {/* Profile avatar on right */}
          <IconButton onClick={toggleDrawer(true)} edge="end" sx={{ mr: 2 }}>
            {profilePhoto ? (
              <Avatar src={profilePhoto} alt="Profile" />
            ) : (
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
      {/* Right Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250,
            background: "#2c2c2e",
            backdropFilter: "blur(10px)",
            color: "white",
            borderLeft: "2px solid #e33962",
          },
        }}
      >
        <Box sx={{ p: 2 }} role="presentation">
          <List>
            <ListItem component={Link} href="#" sx={{ color: "white" }}>
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{ fontWeight: 500, color: "white" }}
              />
            </ListItem>
            <ListItem component={Link} href="#" sx={{ color: "white" }}>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontWeight: 500, color: "white" }}
              />
            </ListItem>
            <ListItem
              onClick={signOut}
              sx={{ color: "white", cursor: "pointer" }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontWeight: 500, color: "white" }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
