import React, {Component} from "react";
import Searcher from "../searcher/Searcher";
import {withRouter} from "react-router-dom";
import env from "../../env.js";


class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.handleOnEnter = this.handleOnEnter.bind(this);
    }

    handleOnEnter(searcherState) {
        // convert to search query
        // push to new link
        if (!searcherState) return;
        const historyObject = {
            pathname: '/',
            search: `?q=${encodeURI(searcherState.searchQuery)}&client_id=${env.apiKey}`
        };

        this.props.history.push(historyObject);
    }

    render() {
        return (
            <div>
                Searching for something?
                <Searcher initialValue={"hello"} onEnter={this.handleOnEnter}/>
            </div>
        )
    }
}

export default (withRouter(SearchContainer));