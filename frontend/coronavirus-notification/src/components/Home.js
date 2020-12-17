import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Paper, Typography } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'row wrap',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  actions: {
    margin: '1em',
    minWidth: '13em',
  },
  paper: {
    width: '100%',
    margin: '3%',
    marginTop: '0',
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
  },
  info: {
    margin: '0.5em',
    marginBottom: '0.25em',
  },
  header: {
    margin: '1em',
    marginBottom: '0.25em',
    marginTop: '0.25em',
  },
  body: {
    margin: '1.75em',
    marginTop: '0',
    marginBottom: '1em',
  },
}));

export default function Home() {
  let history = useHistory();
  const classes = useStyles();
  const handleOpenSubscribe = () => {
    history.push('/subscribe');
  };
  const handleOpenUnsubscribe = () => {
    history.push('/unsubscribe');
  };

  return (
    <div className={classes.root}>
      <Fab
        onClick={handleOpenSubscribe}
        className={classes.actions}
        size="large"
        variant="extended"
      >
        <AddCircle fontSize="large" className={classes.extendedIcon} />
        Subscribe
      </Fab>
      <Fab
        onClick={handleOpenUnsubscribe}
        className={classes.actions}
        size="large"
        variant="extended"
      >
        <RemoveCircle fontSize="large" className={classes.extendedIcon} />
        Unsubscribe
      </Fab>
      <Paper className={classes.paper} elevation={3}>
        <Typography className={classes.info} variant="h4">
          Info
        </Typography>
        <Typography className={classes.header} variant="h5">
          What is it?
        </Typography>
        <Typography className={classes.body} variant="body1">
          Receive a daily update at 10AM EST regarding the 7-day rolling average
          percent positive COVID-19 cases for a given zip code and borough.
        </Typography>
        <Typography className={classes.header} variant="h5">
          Data Source
        </Typography>
        <Typography className={classes.body} variant="body1">
          Data comes from the{' '}
          <a href="https://opendata.cityofnewyork.us/">NYC Open Data</a>{' '}
          program.
        </Typography>
        <Typography className={classes.header} variant="h5">
          Privacy
        </Typography>
        <Typography className={classes.body} variant="body1">
          Phone numbers will not be used or sold for any other purpose. All
          records will be completely wiped when unsubscribing from the service.{' '}
          <a href="https://github.com/retrofuturejosh/nyc-coronavirus-zipcode-text-notification/tree/feature/frontend">
            Source code
          </a>{' '}
          is available on GitHub.
        </Typography>
        <Typography className={classes.header} variant="h5">
          Reach Out
        </Typography>
        <Typography className={classes.body} variant="body1">
          Feel free to <a href="mailto:joshuadsohn@gmail.com">reach out</a> with
          any comments, suggestions, or questions. This is a personal project,
          so I'll do my best to respond in a timely manner.
        </Typography>
      </Paper>
    </div>
  );
}
