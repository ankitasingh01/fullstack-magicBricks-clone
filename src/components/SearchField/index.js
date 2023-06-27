import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProperty } from "../reduxState/ListedPropertiesReducer";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Autocomplete, Button, TextField } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import {
  FLAT_CATEGORIES,
  FLAT_MIN_BUDGET,
  FLAT_MAX_BUDGET
} from "../reduxState/constant";
import "./SearchField.styles.scss";
import { styled, lighten, darken } from "@mui/system";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8)
}));

const GroupItems = styled("ul")({
  padding: 0
});

const defaultInitial = {
  search: "",
  flatCategories: [],
  minbudget: {},
  maxbudget: {}
};

export default function CustomizedInputBase() {
  const dispatch = useDispatch();
  const { allData } = useSelector((state) => state.updateProperty);
  // console.log("updatePostData", updatePostData);
  const [searchValue, setSearchValue] = React.useState(defaultInitial);
  const handleChange = (targetValue) => {
    console.log("targetValue", targetValue);
    const { name, value } = targetValue;
    setSearchValue((prevState) => {
      return { ...prevState, [name]: value === null ? {} : value };
    });
  };

  const handleSearch = () => {
    const { search, flatCategories, minbudget, maxbudget } = searchValue;
    console.log("searchValue", searchValue);
    // console.log("minbudget, maxbuget", minbudget, maxbudget);
    // console.log("updatePostData", allData);
    const temporaryData = allData.filter((item) => {
      console.log("item", item);
      const filter = {
        bySearch: true,
        byBudget: true,
        byFlatCategories: true
      };
      console.log("filter", filter);
      if (search)
        filter.bySearch = item.title
          .toLowerCase()
          .includes(search.toLowerCase());
      // Even if one ward_no.ward matches the value it's true
      if (flatCategories.length)
        filter.byFlatCategories = flatCategories.some(
          (newCat) => newCat.title === item.flatCategory.title
        );
      if (Object.keys(minbudget).length && Object.keys(maxbudget).length)
        filter.byBudget =
          item.flatBudget.budget >= minbudget.budget &&
          item.flatBudget.budget <= maxbudget.budget;
      else if (Object.keys(minbudget).length)
        filter.byBudget = item.flatBudget.budget >= minbudget.budget;
      else if (Object.keys(maxbudget).length)
        filter.byBudget = item.flatBudget.budget <= maxbudget.budget;

      // if (filterData.category)
      //   filter.byCategory = item.ward_no.some((wards) =>
      //     Object.keys(wards).some((categoryName) => categoryName !== 'ward' && categoryName === filterData.category));
      console.log("filterNew", filter);
      return filter.bySearch && filter.byFlatCategories && filter.byBudget;
    });
    console.log("temporaryData", temporaryData);
    dispatch(searchProperty(temporaryData));
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        border: "1px solid #808080",
        borderRadius: "40px"
        // marginTop: "75px",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <LocationOn className="search-autocomplete-icon" />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        name="search"
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) =>
          handleChange({ name: e.target.name, value: e.target.value })
        }
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <div style={{ display: "flex" }}>
        <HomeIcon
          className="search-autocomplete-icon"
          style={{ cursor: "pointer", padding: "15px 0px 15px 15px" }}
        />
        <Autocomplete
          multiple
          limitTags={1}
          id="multiple-limit-tags"
          name="flatCategories"
          className="search-flat-autocomplete"
          options={FLAT_CATEGORIES}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) =>
            handleChange({ name: "flatCategories", value: newValue })
          }
          defaultValue={[FLAT_CATEGORIES[3], FLAT_CATEGORIES[4]]}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              placeholder="Flat"
            />
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: 0
            }
          }}
        />
      </div>
      {/* https://stackoverflow.com/questions/64943770/material-ui-adding-search-icon-in-autocomplete-component
      check the above link */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <div style={{ display: "flex" }}>
        <CurrencyRupeeIcon
          className="search-autocomplete-icon"
          style={{ cursor: "pointer", padding: "15px 0px 15px 15px" }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={FLAT_MIN_BUDGET}
          getOptionLabel={(option) => option.budget}
          onChange={(event, newValue) =>
            handleChange({
              name: "minbudget",
              value: newValue
            })
          }
          sx={{
            width: 150,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: 0
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              placeholder="Min-Budget"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          name="budget"
          options={FLAT_MAX_BUDGET}
          getOptionLabel={(option) => option.budget}
          onChange={(event, newValue) =>
            handleChange({
              name: "maxbudget",
              value: newValue
            })
          }
          sx={{
            width: 150,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: 0
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              placeholder="Max-Budget"
            />
          )}
        />
      </div>

      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <Button
          variant="contained"
          sx={{ borderRadius: "100px" }}
          className="search-field-button"
          endIcon={<SearchIcon />}
        >
          Search
        </Button>
      </IconButton>
    </Paper>
  );
}
