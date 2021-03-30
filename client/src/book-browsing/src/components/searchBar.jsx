import React, { Component } from 'react'


//anytime someone types something in the searchField, on change will fire handleSearch
const SearchBar = (props) => {
    return (
        <div className = "search-bar">
            {/* // the below will need to be changed to for each button, with the method (searchBook)} */}
            <form onSubmit = {props.searchBook} action =""> 
                {/* <input onChange={props.handleSearch}type="text"/> */}
                <select defaultValue = "Sort" onChange = {props.handleSort}>
                    <option disabled value = "Sort">Sort</option>
                    <option value = "Newest">Date: Newest</option>
                    <option value = "Oldest">Date: Oldest</option>
                    <option value = "Rating Top">Rating: Highest</option>
                    <option value = "Rating Bottom">Rating: Lowest</option>
                    <option value = "Price High">Price: Highest</option>
                    <option value = "Price Low">Price: Lowest</option>
                    <option value = "Author A">Author: A-Z </option>
                    <option value = "Author Z">Author: Z-A </option>
                    
                </select>
            </form>

            
        </div>
        
    
    )
}

export default SearchBar;

