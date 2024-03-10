import React, { useState, useEffect } from 'react';
import {TextField , Box} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import { apiUrl, getDirectoryAuthtoken, view_url} from "../constants";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

interface Film {
  title: string;
  year: number;
}



const AsyncSearch = ({searchedValue})=> {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Film[]>([]);
  const [loading, setIsLoading] = React.useState(false);
  const [cancelIcon, setCancelIcon] = React.useState(false);

  const [searchVal, setSearchVal] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  
  const [freeSolo, setFreeSolo] = useState(true);

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     (async () => {
//       await sleep(1e3); // For demo purposes.

//       if (active) {
//         setOptions([...topFilms]);
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading]);

// console.log("loading cc" , loading)

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);




useEffect(() => {
    const loadSearchUsers = async () => {
      try {
        // console.log(searchVal)
         setIsLoading(true);
    
        const response = await axios.get(
          `${apiUrl}profiles/names?name=${searchVal}`,
          {
            headers: {
                Authorization: getDirectoryAuthtoken(),
              "Content-Type": "application/json",
            } 
        }
        );
        setOptions(response.data.response.data)
       
      } catch (error) {
        // console.log(error)
        // setErrorMsg('Error while loading data. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if(searchVal.length > 2){
        loadSearchUsers();
    }
  }, [searchVal]);

  const onCancelEvent = () => {
    setInputValue("");
     searchedValue("");
     searchedValue("")
    setOptions([]);
    setFreeSolo(false)
    setOpen(false);
    setCancelIcon(false);
  };

  const handleInputChange = (event, newInputValue) => {
    setFreeSolo(true)
       setInputValue(newInputValue);
       setSearchVal(newInputValue);

    if (newInputValue.length > 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    if (newInputValue.length > 1) {
        setCancelIcon(true);
      } else {
        setCancelIcon(false);
      }
  };
  const keyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchedValue(inputValue);
    }
  };

const onChangeVal= (e,v) => {

    v?.name ? searchedValue(v?.name): ''
}
const getOptionLabel = (option: any) => {

     if(typeof option === 'object' && option !== null
     ){
        return option?.name
     }else{
        return inputValue

     }
}

const onSearchEvent = () =>{
    searchedValue(inputValue)
    }
  return (
    <Autocomplete
    freeSolo={freeSolo}
    sx={{
        borderRadius: "2px",
        borderBottom: "1px solid #000",
        color: '#2D5453',
        "& fieldset": { top: 0,
          border : "none"
        },
        width: 500
      
      }}
      id="autocomplete-highlight-id"
      className="autocomplete-highlight-id"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
    //   isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={getOptionLabel}
      options={options}
     loading={loading}
      onInputChange={handleInputChange}
    //   onSelect={handleChange}
    value={inputValue}
    onChange={onChangeVal}
      onKeyDown={keyDownHandler}
      renderInput={(params) => (
        <TextField
        autoFocus 
        // onChange={({ target }) => searchedValue(target.value)}
        // value={autoCompleteval}
        className="autocomplete-textfield-highlight"
            placeholder={"Type a name"}
            sx={{
              backgroundColor: 'white',
              "& .MuiOutlinedInput-root": {
                padding: "0px !important",
                paddingRight: "8px !important",
              },
              "& .MuiAutocomplete-inputFocused:focus" : {
                  backgroundColor: '#E5F3F4',
              },
              "& .MuiAutocomplete-endAdornment" : {
                backgroundColor: '#E5F3F4',
               },

              "& fieldset": { top: 0 }

            }}
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
                <Box>
                {cancelIcon && (
                  <CloseSharpIcon color="primary"
                    className="autocomplete-cancel-highlight"
                    onClick={onCancelEvent} sx={{cursor: "pointer"}}
                  ></CloseSharpIcon>
                )}
                <SearchIcon
                  className="autocomplete-searchoutline-highlight"
                  onClick={onSearchEvent}
                  sx={{cursor: "pointer"}}
                ></SearchIcon>
              </Box>
            ),
          }}
        />
      )}
      renderOption={(props, option: any, { inputValue }) => {
        const matches = match(option.name, inputValue, {
          insideWords: true,
        });
        const parts = parse(option.name, matches);

        return (
          <li {...props} key={option.name}>
            <div >
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}

    />
  );
}

export default  AsyncSearch; 

