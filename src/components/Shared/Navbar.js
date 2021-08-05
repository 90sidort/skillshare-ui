import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu as MenuIcon,
} from "@material-ui/core";
import { VpnKey as VpnKeyIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

import useStylesNavbar from "../../styles/navbar.style";

const Navbar = () => {
  const classes = useStylesNavbar();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          aria-label="Menu"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Skillshare
        </Typography>

        <section className={classes.rightToolbar}>
          <Link to="/signin">
            <IconButton color="inherit" aria-label="Sing">
              <VpnKeyIcon />
            </IconButton>
          </Link>
        </section>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
