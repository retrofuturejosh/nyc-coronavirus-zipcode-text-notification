import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(45deg, #000063 30%, #6746c3 90%)',
  },
  menuButton: {},
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  titleDiv: {
    alignSelf: 'flex-end',
  },
  title: {
    flexGrow: 1,
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'flex-end',
  },
  text: {
    textDecoration: 'none',
    color: 'white',
  },
}));

export default function ProminentAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.titleDiv}>
            <Typography className={classes.title} variant="h4">
              NYC Coronavirus Notification Service
            </Typography>
            {/* <Typography className={classes.title} variant="subtitle1">
            Daily Text Message with 7 Day Rolling Average Percent Positive Stats per zip code/borough
          </Typography> */}
          </div>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <a
                href="https://github.com/retrofuturejosh/nyc-coronavirus-zipcode-text-notification/tree/feature/frontend"
                className={classes.text}
              >
                Source code
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a
                href="https://opendata.cityofnewyork.us/"
                className={classes.text}
              >
                NYC Open Data
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="mailto:joshuadsohn@gmail.com" className={classes.text}>
                Contact
              </a>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
