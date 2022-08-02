import React from "react";
import "./Suggestions.css";

const Suggestions = ({ suggestions, setSearchWord }) => {

    return (
        <div className = "suggestions" >
            <hr width = "50%" color = "black" />
            <div className = "title" > <h1><b> Suggestions </b></h1> </div>
            <hr width = "50%" color = "black" />
            <div className = "words" >
                {/* <button className="button"> {suggestions[0]} </button>
                <button className="button"> helllsuggeslllllllllooooooooooo</button>
                <button className="button"> {suggestions[1]} </button> */}
                { suggestions.map( suggestion => <button className = "button" onClick = { () => setSearchWord( suggestion ) }> { suggestion } </button> ) }
            </div>
        </div>
    )
};

export default Suggestions;