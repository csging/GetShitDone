import React,  {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { checkServerIdentity } from 'tls';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text,
  },
  root: {
    flexGrow: 1,
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {tasks: null};
    this.state = {value: ''};
    this.state = {name: ''};
    this.state = {edit: ''};
    this.state = {checked: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

    handleToggle = value => () => {
      const {checked} = this.state
      const newChecked = [...checked]
      if (newChecked.includes(value)) {
        this.setState({checked: newChecked.filter((element) => {return element !== value})}, () => {console.log(this.state.checked)})
          axios.put('/api/list/restore',{
            taskId: value,
            }).then((result) => {console.log(result)})
      }
      else {
        newChecked.push(value)
          this.setState({checked: newChecked}, () => {
            axios.put('/api/list/complete', {
              taskId: value
            }).then((result) => {console.log(result)})
          })
        }
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleChange2(event) {
      this.setState({name: event.target.value});
    }

    handleChange3(event) {
      this.setState({edit: event.target.value});
    }

    handleSubmit(event) {
      axios.post('/api/list/item', {
        item: this.state.value,
        name: this.state.name
      }).then(() => {
        axios.get('api/list').then(
          result => {
            this.setState({tasks: [...result.data].filter((element) => {return element.task_group === this.state.name})})
          }
        )
      })
      event.target.value = ''
      event.preventDefault()
      this.setState({value: event.target.value});
    }


    edit = value => () => {
      var id = value
      var task = this.state.edit
      axios.put('/api/list/edit',{
        taskId: id,
        updatedTask: task
      }).then((result) => {
        axios.get('api/list').then(
          (result) => {
            this.setState({tasks: [...result.data].filter((element) => {return element.task_group === this.state.name})})
          }
        )
      })
      this.setState({edit: ''})
    }

    remove = value => () => {
      var id = value
      axios.delete('/api/list/delete',{
        data: {taskID: id}
      }).then((result) => {
        axios.get('api/list').then(
          (result) => {
            this.setState({tasks: [...result.data].filter((element) => {return element.task_group === this.state.name})})
          }
        )
      })
    }

     render() {
      const { classes } = this.props;
       return (
         <div className={classes.root}>
           <Typography variant="headline" align="center" color="inherit">
             Below you can create your task...
           </Typography>
             <Grid container spacing={24}>
             <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <form onSubmit={this.handleSubmit}>
                  <TextField className={classes.textField} label="Task"  id="Task" margin="normal" align="center" value={this.state.value} onChange={this.handleChange} />
                  <TextField className={classes.textField} label="Name"  id="Name" margin="normal" align="center" value={this.state.name} onChange={this.handleChange2} />
                  <TextField className={classes.textField} label="Edit"  id="Edit" margin="normal" align="center" value={this.state.edit} onChange={this.handleChange3} />
                  <Button variant="raised" color="inherit" right="20" left="auto" type="submit" value="Submit" className={classes.button}>Submit</Button>
                  </form>
                </Paper>
            </Grid>
            <Grid item xs={12}>
            <List>
                { this.state.tasks &&
                    this.state.tasks.map(task => { 
                      return <ListItem key={task.id} dense button className={classes.listItem}>
                        <Avatar className={classes.greenAvatar}>
                          <AssignmentIcon />
                        </Avatar>
                        <ListItemText primary={task.task}/>
                        <ListItemSecondaryAction>
                        <Button color="inherit" onClick={this.edit(task.id)}>Edit</Button>
                        <IconButton className={classes.button} aria-label="Delete" onClick={this.remove(task.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <Checkbox
                            onChange={this.handleToggle(task.id)}
                            defaultChecked={!!task.complete}
                        />
                      </ListItemSecondaryAction>
                      </ListItem>  
                    })
                }
              </List>    
            </Grid>
         </Grid>
         </div>  
       )
     }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Landing)