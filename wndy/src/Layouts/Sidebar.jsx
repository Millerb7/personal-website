import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import useResponsive from "../hooks/useResponsive";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const pages = [
    { title: "Home", path: "/" },
    { title: "Blog", path: "/blog" },
    { title: "Profile", path: "/profile" },
    { title: "Resume", path: "/resume" },
    { title: "Work", path: "/work" },
  ];

  const renderContent = (
    <Box
      sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List disablePadding sx={{ paddingTop: 2 }}>
        {pages.map((page) => (
          <ListItemButton
            key={page.title}
            component={RouterLink}
            to={page.path}
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "fontWeightMedium",
              "&:before": { display: "block" },
              "&:hover": {
                bgcolor: "background.default",
              },
              py: 2,
            }}
          >
            <ListItemText
              disableTypography
              primary={page.title}
              sx={{ ml: 2 }}
            />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
