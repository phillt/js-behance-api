import React, {Component} from "react";
import PropTypes from "prop-types";
import {ifFunc} from "project-helpers";

class Searcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery : props.initialValue
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnEnter = this.handleOnEnter.bind(this);
    }

    /**
     * Commits changes to the state from the value in the event.
     *
     * @param {object} event - Takes in the event object.
     */
    handleChange(event) {
        const {name, value} = event.target;

        this.setState({[name] : value});
    }

    /**
     * Will call the props function onEnter if the key pressed was the enter key.
     *
     * @param {object} event - The event object.
     */
    handleOnEnter(event) {
        if (event.keyCode === 13){
            // enter key was pressed
            ifFunc(this.props.onEnter, this.state);
        }
    }

    render() {
        return (
            <div>
                <label>
                    Search
                    <input
                        onKeyUp={this.handleOnEnter}
                        onChange={this.handleChange}
                        type={"text"}
                        name={"searchQuery"}
                        value={this.state.searchQuery}
                    />
                </label>
            </div>
        )
    }
}

Searcher.propTypes = {
    onEnter : PropTypes.func, // Handle when user hits enter
    initialValue: PropTypes.string // The initial value
};

export default (Searcher);