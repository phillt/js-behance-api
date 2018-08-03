import React from "react";
import {ifFunc} from "project-helpers";

export const withApi = (
    {
        // What api/s to use
        getter,
        // map their values into props of child component
        mapResponse = (response)=>{
            return response.data;
        },
        // Set to false if you don't want to use this
        // Forms usually don't use this as the default values tend to be set in the state.
        mapResponseToProps = true,
        // Set post api
        setter,
        // Map set data
        mapSetData,
        // Prevent child component from rendering until getter succeeds
        renderOnGetterSucceed = false,
    }
) => (Component) => {
    class WithAuth extends React.Component {
        constructor (props) {

            super(props);

            this.state = {
                error: null,
                loaded: false,
                loading: false,
                response: null
            };

            // Setter/getter promises
            this.getting;
            this.setting;

            // Child reference
            this.child

            // Bind methods to this
            this.handleSubmit = this.handleSubmit.bind(this);
            this.startGetter = this.startGetter.bind(this);
            this.cancelGet = this.cancelGet.bind(this);
            this.cancelSet = this.cancelSet.bind(this);
        }

        /**
         * Call methods that should be called before this component dismounts.
         */
        componentWillUnmount () {
            // Lets cancel any promises that may be in progress
            this.cancelGet();
            this.cancelSet();
        }

        /**
         * Call methods that should be called whenever this component mounts.
         */
        componentDidMount () {
            // Handle methods on component
            this.startGetter();
        }

        /**
         * Cancels getter promise
         */
        cancelGet () {
            this.getting && ifFunc(this.getting.cancel);
        }

        /**
         * Cancels setter promise
         */
        cancelSet () {
            this.setting && ifFunc(this.setting.cancel);
        }

        /**
         * Start getter operation if getter function is set.
         */
        startGetter () {


            // Are we getting anything?
            if (typeof getter !== "function") return;

            this.setState({loading: true});


            this.getting = getter(this.props);


            // Handle any errors that result from this.
            this.getting.catch(error => {

                this.setState({
                    loading: false,
                    loaded: true,
                    error: error
                });
            });

            this.getting.then(response => {
                this.setState({
                    loading: false,
                    loaded: true,
                    error: null,
                    response: response
                });
                // Look for a handleIncomingDefaults method in the child and pass it the response.
                // This is good for forms to easily set default values.
                ifFunc(this.child.handleIncomingDefaults, mapResponse(response));
            });
        }

        /**
         * Handles submit
         *
         * @param {object} data - the data object representation of what the setter api requires.
         */
        handleSubmit (data) {

            this.setting = setter(data);
            this.setState({loading: true});

            this.setting.catch(err => {
                this.setState({loading: false, error: err});
            });

            this.setting.then(() => {
                this.setState({loading: false, error: null, success: true});
            });
        }

        render () {
            // Don't show the component if settings for this is se to true.
            if (renderOnGetterSucceed && !this.state.loaded) return null;

            return (
                <Component
                    ref={(ref)=>this.child = ref}
                    // Give component our state
                    {...this.state}
                    // Pass down any props
                    {...this.props}
                    // Pass down the response in props
                    {...(this.state.response && mapResponseToProps ? mapResponse(this.state.response) : {})}
                    // Enhance with any methods
                    handleSubmit = {this.handleSubmit}
                    cancelGet = {this.cancelGet}
                    cancelSet = {this.cancelSet}
                />
            )

        }
    }


    return WithAuth;
};
