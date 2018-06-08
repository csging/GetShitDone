import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const tutorialSteps = [
  {
    label: 'Going on the moon',
    imgPath: 'https://images.unsplash.com/photo-1517866184231-7ef94c2ea930?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60a71514d9a29f6c5d06b38adef942ad&auto=format&fit=crop&w=500&q=60',
    
  },
  {
    label: 'Learning how to surf',
    imgPath: 'https://images.unsplash.com/photo-1524760324845-fdfbc60c7667?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b435e19ab14d3a272a535125ec217a78&auto=format&fit=crop&w=1500&q=80',
   
  },
  {
    label: 'Go to the olympic games',
    imgPath: 'https://images.unsplash.com/photo-1468645547353-56d325bb57ff?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6cf9e291a74d7b02c52fca85cd31becf&auto=format&fit=crop&w=1050&q=80',
  },
  {
    label: 'Becoming a full stack programmer',
    imgPath: 'https://images.unsplash.com/photo-1521312706689-fbd93fd5af46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3240eff4dc36cc4647d84cda9f1ee04e&auto=format&fit=crop&w=500&q=60',
  },
  {
    label: 'Live from your own passion',
    imgPath: 'https://images.unsplash.com/photo-1513189737554-b1bbd839b9a3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0d095f47eceee279bec773f9493f5ff4&auto=format&fit=crop&w=500&q=60',
  },
];

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map(step => (
            <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);