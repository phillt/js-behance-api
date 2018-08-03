import React from "react";
import PropTypes from "prop-types";

const Error = ({error})=>{
    return (
        <div>
            <h2>{ error.message }</h2>
            <code>
                {error.stack}
            </code>
        </div>
    );
};

Error.propTypes = {
    error: PropTypes.object
};

export default (Error);