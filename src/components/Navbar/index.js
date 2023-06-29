import * as React from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import RoofingIcon from "@mui/icons-material/Roofing";
import "./Navbar.styles.scss";
import PropertyHeader from "../PropertyHeader";

const pages = ["Buy", "Rent", "Sell", "Services", "Help"];

const pagesLink = [
  {
    id: 1,
    pageTitle: "Buy",
    pageRoute: "buy",
  },
  {
    id: 2,
    pageTitle: "Rent",
    pageRoute: "rent",
  },
  {
    id: 3,
    pageTitle: "Sell",
    pageRoute: "sell",
  },
  {
    id: 4,
    pageTitle: "Services",
    pageRoute: "services",
  },
  {
    id: 5,
    pageTitle: "Help",
    pageRoute: "help",
  },
];

const profileSettings = [
  {
    id: 11,
    settingsName: "Profile",
    settingsRoute: "profile",
  },
  {
    id: 12,
    settingsName: "SignIn / SignUp",
    settingsRoute: "signup",
  },
  {
    id: 13,
    settingsName: "Account",
    settingsRoute: "account",
  },
  {
    id: 14,
    settingsName: "Dashboard",
    settingsRoute: "dashboard",
  },
  {
    id: 15,
    settingsName: "Logout",
    settingsRoute: "logout",
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#d8232a",
    },
    //   secondary: pink,
  },
});

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className="navbar-container">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <RoofingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Magic Bricks
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pagesLink.map((page) => (
                  <MenuItem
                    key={page.id}
                    component={Link}
                    to={page.pageRoute}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.pageTitle}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Magic Bricks
            </Typography>
            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pagesLink.map((page) => (
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.pageRoute}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.pageTitle}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {profileSettings.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    component={Link}
                    to={setting.settingsRoute}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">
                      {setting.settingsName}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <PropertyHeader />
    </ThemeProvider>
  );
}
export default Navbar;
