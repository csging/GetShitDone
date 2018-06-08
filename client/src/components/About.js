import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: 'secondary'
    },
})

class About extends Component {
    render() {
        const { classes } = this.props;

    return (
        <div className={classes.container}>
            <div>
                <div >
                    <h3>The BLACKlist ToDo List</h3>
                    <p>
                    <a href="https://github.com/AnthonyWilson1/BlackList/" >Source Github</a>
                    </p>
                    <p>Created by Brice, Larry, Anthony, Christian, and Kimberly</p>
                </div>
            </div>
        </div>
    );
}
}
About.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);