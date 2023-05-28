import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';

export default function SearchBar(props) {
    const { setSearchQuery } = props;

    return (
        <TextField
            id="search-bar"
            className="SearchBar-TextField"
            onInput={(e) => { setSearchQuery(e.target.value) }}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{ width: '100%' }}
        ></TextField>
    );
}