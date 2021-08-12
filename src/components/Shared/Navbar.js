import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu as MenuIcon,
} from "@material-ui/core";
import {
  VpnKey as VpnKeyIcon,
  ExitToApp as LogoutIcon,
  Category as CategoryIcon,
  LocalLibrary as SkillIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStylesNavbar from "../../styles/navbar.style";
import { logoutUserAction } from "../../actions/authentication";

const Navbar = (props) => {
  const { token } = props;
  const classes = useStylesNavbar();
  const dispatch = useDispatch();

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
          {!token && (
            <Link to="/signin">
              <IconButton color="inherit" aria-label="Singin">
                <VpnKeyIcon />
              </IconButton>
            </Link>
          )}
          {token && (
            <Link to="/skills" style={{ color: "white" }}>
              <IconButton color="inherit" aria-label="Skills">
                <SkillIcon />
              </IconButton>
            </Link>
          )}
          {token && (
            <Link to="/" style={{ color: "white" }}>
              <IconButton color="inherit" aria-label="Categories">
                <CategoryIcon />
              </IconButton>
            </Link>
          )}
          {token && (
            <IconButton
              color="inherit"
              aria-label="Singout"
              onClick={() => dispatch(logoutUserAction())}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </section>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
