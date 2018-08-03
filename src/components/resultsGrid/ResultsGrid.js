import React, {Component} from "react";
import {withApi} from "../withApi/WithApi";
import {behanceGetUsers} from "../../services/api";
import Error from "../error/Error";

class ResultsGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading){
            return (<div>Loading...</div>)
        }
        return (
            <div>
                {this.props.error && <Error error={this.props.error} />}
                { this.props.children }
            </div>
        )
    }
}

export default (ResultsGrid);

export const ResultsGridWithGetUsers = withApi({getter: behanceGetUsers})(ResultsGrid);
