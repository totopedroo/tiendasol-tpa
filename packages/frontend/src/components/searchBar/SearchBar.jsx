/* eslint-disable react/prop-types */
import React from 'react'
import './SearchBar.css'    
import { useState } from "react";
import { TextField } from '@mui/joy';
import { SearchIcon } from "../../components/icons/Search";
import { Button } from '@mui/joy';

const SearchBar = ({filtrarProductos}) => {

    const [searchText, setSearchText] = useState('')
  
    return (
    <div className="search-section">
      <div className='search-bar-container'>
        <div className='search-input-wrapper'>
          <SearchIcon className='search-input-wrapper' />
            <TextField
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value)}}
            fullWidth
            variant="standard"
            placeholder="Buscar productos..."
          />
        </div>
      </div>
      
      <Button variant="outlined" onClick={() => filtrarProductos(searchText)}>
        <SearchIcon className='button-icon' />
      </Button>
    </div>
  )
}

export default SearchBar    