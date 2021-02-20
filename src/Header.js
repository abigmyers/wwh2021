import React from "react";
import { AppBar, Button, Toolbar, Typography, Menu, MenuItem, IconButton } from "@material-ui/core";

function Header(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event?.currentTarget);
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    props.spotifyApi.setAccessToken(null);
    window.location = "";
    handleClose();
    props.setLoggedIn(false);
  }

  return (
    <div className="Header">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={props.classes.title}>
            App Name TBD
            </Typography>
          {!props.loggedIn &&
            <Button variant="outlined" color="secondary" aria-label="login" href="http://localhost:8888" >
              Login to Spotify
              </Button>
          }
          {props.loggedIn &&
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img id="Avatar" alt="Avatar" src={props.user?.images[0].url} style={{ height: "50px", width: "50px", borderRadius: "50%" }}></img>
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logOut}>Log Out</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
