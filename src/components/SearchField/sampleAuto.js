import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import "./styles.css";

const numbers = [0, 1, 2, 3, 4, 5];
const filter = createFilterOptions();

export default function App() {
  const [value, setValue] = React.useState(null);

  return (
    <div className="App">
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            const updatedValue = newValue.replace("Add ", "");
            setValue(updatedValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue(newValue.inputValue);
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option);
          if (inputValue !== "" && !isExisting) {
            filtered.push(`Add ${inputValue}`);
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={numbers}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            const updatedOption = option.replace("Add ", "");
            return updatedOption;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.toString();
        }}
        renderOption={(props, option) => <li {...props}>{option}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Array of numbers demo" />
        )}
      />
    </div>
  );
}

// Reasearch

// <Autocomplete
//           disablePortal
//           id="combo-box-demo"
//           // value={searchValue.minbudget.toString()}
//           options={FLAT_MIN_BUDGET}
//           name="minbudget"
//           getOptionLabel={(option) => option.budget}
//           // value={searchValue.minbudget}
//           // onChange={(_, newValue) => {
//           //   setSearchValue((prevState) => {
//           //     return {
//           //       ...prevState,
//           //       minbudget: newValue,
//           //     };
//           //   });
//           // }}
//           // suggestion to change it here only setSearchValue({...searchValue, minbudget:newvalue})
//           onChange={(event, newValue) =>
//             handleChange({
//               targetValue: { name: "minbudget", value: newValue },
//             })
//           }
//           // inputValue={searchValue.minbudget}
//           // onInputChange={(_, newInputValue) => {
//           //   setSearchValue((prevState) => {
//           //     return {
//           //       ...prevState,
//           //       minbudget: newInputValue,
//           //     };
//           //   });
//           // }}
//           sx={{
//             width: 150,
//             "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//               border: 0,
//             },
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               InputProps={{ ...params.InputProps, disableUnderline: true }}
//               placeholder="Min-Budget"
//             />
//           )}
//         />

// TRY THIS in free Time

{
  /* <Autocomplete
          options={FLAT_MAX_BUDGET.map((item) => item.budget)}
          getOptionLabel={(option) => option.budget}
          value={searchValue.maxbudget}
          onChange={(event, newValue) => {
            setSearchValue((prevState) => {
              return {
                ...prevState,
                maxbudget: newValue,
              };
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              placeholder="Max-Budget"
            />
          )}
        /> */
}
