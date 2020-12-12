import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";

const Search = () => {
    const history = useHistory();
    const INITIAL_VALUE =  {search: ''}
    const [searchData, setSearchData] = useState(INITIAL_VALUE);
    const handleChange = e => {
        const {name, value} = e.target;
        setSearchData((data) => ({
            ...data,
            [name]: value
        }))
    } 

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/upc/${searchData.search}`)
        setSearchData(INITIAL_VALUE)
        
    }

    return (

        <form className="form-inline mx-auto my-lg-1"  onSubmit={handleSubmit}>
        <input className="form-control mr-md-2" type="search" style={{width:'400px'}} placeholder="Search" name="search" value={searchData.search} onChange={handleChange} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>

    )
}

export default Search;

