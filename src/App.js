import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Route} from "react-router-dom";
import Home from "./screens/home/Home.js";
import Profile from "./screens/profile/Profile.js";

class App extends Component {
    render() {
        return (
            <Router>
                <dizv className="App">
                    Router.
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path={"/profile"} component={Profile}/>
                </dizv>
            </Router>
        );
    }
}

export default App;
