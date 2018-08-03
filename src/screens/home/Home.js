import React from "react";
import SearchContainer from "../../components/searchContainer/SearchContainer";
import {ResultsGridWithGetUsers} from "../../components/resultsGrid/ResultsGrid";

const Home = ({location}) => {
    return (
        <div>
            <header>
                <SearchContainer />
            </header>
            {location.search && <ResultsGridWithGetUsers searchQuery={location.search} key={location.search} />}
        </div>
    )
};

export default Home;