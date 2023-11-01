import React, { useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchKeyword(term);
    onSearch(term);
  };

  return (
    <TextField
      variant="outlined"
      label="Search Keywords"
      fullWidth
      value={searchKeyword}
      onChange={handleSearch}
      margin="normal"
    />
  );
};

export default SearchBar;
