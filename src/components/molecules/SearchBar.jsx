import React from 'react';
import Input from '../atoms/Input';
import '../../styles/molecules/SearchBar.css'; 

const SearchBar = ({ onSearch }) => {
    const handleChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <div className="search-icon-box">
                <i className="bi bi-search"></i>
            </div>
            <Input
                type="text"
                placeholder="Buscar..."
                onChange={handleChange}
                className="search-input-atom" 
            />
        </div>
    );
};

export default SearchBar;