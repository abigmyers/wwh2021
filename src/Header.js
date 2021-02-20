import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

function Header(props) {
  return (
    <div className="Header">
      <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" className={props.classes.title}>
              App Name TBD
            </Typography>
            {!props.loggedIn &&
              <Button variant="outlined" color="inherit" aria-label="login" href="http://localhost:8888" >
                Login to Spotify
              </Button>
            }
            { props.loggedIn && <img alt="Avatar" src={props.user?.images[0].url} style={{height:"50px", width:"50px", borderRadius:"50%"}}></img>}
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default Header;
