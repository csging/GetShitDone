import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Fab(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" color="primary" aria-label="add" className={classes.button} a href="/landing" align="right">
        <AddIcon />
      </Button>
      </div>
  );
}

Fab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Fab);