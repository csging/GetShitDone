import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import SwipeableTextMobileStepper from './Swipeable'

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      align: 'center',
      // color: 'primary'
    //   marginTop: theme.spacing.unit * 3,
    }),

  });

  function Home (props) {
    const { classes } = props;
    return (
      <div>
      <Grid container spacing ={24} direction="row" justify="center" alignItems="center">
      <Grid item xs></Grid>
      <Grid item xs={10}>
        <Paper className={classes.root} elevation={4}>
          <Typography align="center" color="inherit" className={classes.typo1} variant="display2" component="h2">
            The BLACK list
          </Typography>
          <br />
          <Typography align="center" color="default" className={classes.typo2} variant="headline" component="p">
          Be more productive than ever before!
          </Typography>
        </Paper>
        </Grid>
        <Grid item xs></Grid>
        <SwipeableTextMobileStepper/>
        </Grid>
      </div>
    );
  }


  export default withStyles(styles)(Home);