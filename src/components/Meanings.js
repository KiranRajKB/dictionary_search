import React from "react";
import "./Meanings.css";

const Meanings = ({ meanings }) => {

    const arr = meanings.map(meaning => (
        <div className= "card" > {meaning} </div>
    ))
  return (
        <div className = "meanings" >
            <hr width = "50%" color = "black" />
            <h1><b> Meanings </b></h1>
            <hr width = "50%" color = "black" />
            {
                arr.length ? (
                    <div className= "cards" >
                        {arr}
                    </div>
                ) : <div className = "no-meaning-found" > No meaning found </div>
            }
            
        </div>
      
  )
};

export default Meanings;