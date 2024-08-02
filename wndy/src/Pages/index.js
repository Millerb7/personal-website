import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

export const UserContext = createContext(null);

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingBottom: theme.spacing(10),
  marginTop: theme.spacing(8), // Adjust margin to avoid overlap with AppBar
  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DashboardLayout() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Fetch user details or other initial data if needed
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppBar position="fixed">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/blog">Blog</Button>
          <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
          <Button color="inherit" component={RouterLink} to="/resume">Resume</Button>
          <Button color="inherit" component={RouterLink} to="/work">Work</Button>
        </Toolbar>
      </AppBar>
      <MainStyle>
        <Outlet context={{ user }} />
      </MainStyle>
    </UserContext.Provider>
  );
}
