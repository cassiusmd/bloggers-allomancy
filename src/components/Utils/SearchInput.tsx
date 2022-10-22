import {ChangeEvent} from 'react';
import {TextInput} from '@mantine/core';

interface SearchInputProps {
    onChange: (search: string) => void;
    // value: string;
}

const SearchInput = ({onChange}: SearchInputProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    return (
        <TextInput
            placeholder="Search"
            onChange={handleChange}
        />
    );
};

export default SearchInput;
