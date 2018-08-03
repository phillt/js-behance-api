import React from "react";
import Searcher from "../../components/searcher/Searcher";

const Home = ({}) => {
    return (
        <div>
            <header>
                Searching for something?
                <Searcher initialValue={"hello"} onEnter={(stateValues)=>alert(`Hello ${stateValues.searchQuery}!`)}/>
            </header>

        </div>
    )
};

export default Home;