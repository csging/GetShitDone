import React,  {Component} from 'react';
import { Route } from 'react-router-dom';
import Header from './Header'
import {BrowserRouter} from "react-router-dom";
import Home from './Homepage';
import Landing from './Landing';
import Dashboard from './Dashboard'
import MyCalendar from './NewPage';
import Navbar from './Navbar';
import About from './About';
import Chart from './Chart';
import Fab from './Fab';
import 'typeface-roboto';



class App extends Component {

  render() {
    return (
      <div>
        <div>
          <Navbar />
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Home} /> 
              <Route exact path="/landing" component={Landing}/> 
              <Route exact path="/dashboard" component={Dashboard} /> 
              <Route exact path="/calendar" component={MyCalendar} /> 
              <Route exact path="/chart" component={Chart} /> 
              <Route exact path="/about" component={About} /> 

            </div>
          </BrowserRouter>
        </div>
        <Fab align="right"/>
      </div>
    )
  }
}

export default App;
