import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Route} from "react-router-dom";
import Home from "./screens/home/Home.js";
import Profile from "./screens/profile/Profile.js";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path={"/profile"} component={Profile}/>
                </div>
            </Router>
        );
    }
}

export default App;
