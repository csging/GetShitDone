import React,  {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    pos: {
    marginBottom: 1,
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {tasksD: null};
        this.state = {complete: ''};
        this.state = {percentage: ''};
        this.state = {checked2: []};
    

        this.handleTask = this.handleTask.bind(this);
        this.handleToggle2 = this.handleToggle2.bind(this);
      }


      handleToggle2 = value => () => {
        const {checked2} = this.state
        const newChecked = [...checked2]
        if (newChecked.includes(value)) {
            this.setState({checked2: newChecked.filter((element) => {return element !== value})}, () => {console.log(this.state.checked2)})
            axios.put('/api/list/restore',{
              taskId: value,
              }).then((result) => {console.log(result)})
        }
        else {
          newChecked.push(value)
          this.setState({checked2: newChecked}, () => {
              axios.put('/api/list/complete', {
                taskId: value
              }).then((result) => {console.log(this.state.checked2)})
            })
          }
      }

    getNumbers() {
        axios.get('/api/list').then(
            (result) => {
                var list = result.data.reduce((prev,element)=> {
                    prev.push(element.task_group)
                    return prev;
                },[])
                var stateList = list.reduce((prev,task) => {
                    if (prev.find((element) => {return element === task})) {
                        return prev 
                    } else {
                        prev.push(task)
                        return prev
                    }
                },[])
                var sum = stateList.map((elementS)=> {
                    var total = list.filter((element) => {
                        return element === elementS
                    })
                    return total
                })
                var comp = stateList.map((elementS)=> {
                    var compl = result.data.filter((element) => {
                        return element.complete === 1 && element.task_group === elementS
                    })
                    return compl
                })
                var sum1 = sum.map((element)=> {return element.length})
                var comp1 = comp.map((element)=> {return element.length})
                var percent = comp1.map((element, i) => {return  element + '/' + sum1[i]})
                
                this.setState({percentage: percent}, () => {
                    console.log(this.state)
                })
            }
        )
    }  



    componentDidMount() {
        axios.get('/api/list').then(
            (result) => {
                var list = result.data.reduce((prev,element)=> {
                    prev.push(element.task_group)
                    return prev;
                },[])
                var stateList = list.reduce((prev,task) => {
                    if (prev.find((element) => {return element === task})) {
                        return prev 
                    } else {
                        prev.push(task)
                        return prev
                    }
                },[])
                this.setState({tasksD: [...stateList]}, () => {console.log(this.state.tasksD)})
                this.getNumbers();
            }
        )
    }  

    handleTask = value => () => {
        let task = value
        this.setState({list: value})
        axios.get('/api/list').then ((result) => {
            var target = result.data.filter((element) => { 
            return element.task_group === task
        })
        this.setState({complete: target})
        }
        )
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="headline" align="center" color="inherit">
                    Dashboard
                </Typography>
                <Typography variant="subheading" align="center" color="inherit">
                    Current List's
                </Typography>
                { this.state.tasksD &&
                this.state.tasksD.map((task,i) => { 
                  return <Card className={classes.card}>
                     <CardContent>
                        <Typography variant="subheading" component="h2">
                            {task}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Click below to view the list.
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small" onClick={this.handleTask(task)}>View {task}</Button>
                        </CardActions>
                   </Card>
                })
                }
            <Typography variant="subheading" align="center" color="inherit">
                    Chosen List
            </Typography>
            <Grid item xs={12}>
            <List>
            { this.state.complete &&
                this.state.complete.map(task => { 
                    return <ListItem key={task.id} dense button className={classes.listItem}>
                        <Avatar className={classes.greenAvatar}>
                          <AssignmentIcon />
                        </Avatar>
                        <ListItemText primary={task.task}/>
                        <ListItemSecondaryAction>

                        <Checkbox
                            onChange={this.handleToggle2(task.id)}
                            defaultChecked={!!task.complete}
                        />
                      </ListItemSecondaryAction>
                      </ListItem>  
                })
                }  
            </List>
            </Grid> 
            </div>
        )
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Dashboard)