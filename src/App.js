import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import { Button, useMediaQuery } from "@mui/material";
import SearchBox from "./components/SearchBox";
import SearchMoviesScreen from "./screens/SearchMoviesScreen";
import { useContext } from "react";
import { Store } from "./components/Store";
import UserMenu from "./components/UserMenu";
import FavMoviesScreen from "./screens/FavMoviesScreen";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { state } = useContext(Store);

  const signInButton = (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => navigate("/")}
      sx={{ ml: 2 }}
    >
      Sign In
    </Button>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {state.userInfo && !open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link
            to={"/movies"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography variant="h6" noWrap component="div">
              THEATER
            </Typography>
          </Link>
          {!isMobile && (
            <>
              {state.userInfo && (
                <Box sx={{ width: 300, ml: 2 }}>
                  <SearchBox />
                </Box>
              )}
              {state.userInfo ? (
                <>
                  <Box sx={{ ml: 2 }}>
                    <UserMenu username={state.userInfo.username} />
                  </Box>
                </>
              ) : (
                signInButton
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {isMobile && (
          <>
            <Box sx={{ px: 2, pb: 1, ml: 2 }}>
              <SearchBox />
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              {state.userInfo ? (
                <>
                  <Box sx={{ ml: 2 }}>
                    <UserMenu username={state.userInfo.username} />
                  </Box>
                </>
              ) : (
                signInButton
              )}
            </Box>
            <Divider />
          </>
        )}
        <List>
          {["movies", "favorites"].map((text, index) => (
            <Link
              to={`/${text}`}
              style={{ textDecoration: "none", color: "grey" }}
              key={text}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<SignInScreen />}></Route>
          <Route path="/movies" element={<HomeScreen />}></Route>
          <Route path="/movies/:id" element={<MovieScreen />}></Route>
          <Route path="/search" element={<SearchMoviesScreen />} />
          <Route path="/favorites" element={<FavMoviesScreen />} />
        </Routes>
      </Main>
    </Box>
  );
}
