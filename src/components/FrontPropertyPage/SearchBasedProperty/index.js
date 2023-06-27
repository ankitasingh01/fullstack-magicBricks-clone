import React, { Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import SearchBasedCard from "./SearchBasedCard";
import "./SearchBasedProperty.styles.scss";
import { SEARCH_BASED_PROPERTY_CONSTANT } from "./constant";

const SearchBasedProperty = () => {
  return (
    <div className="search-based-property-container">
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        className="search-based-property-header-grid"
      >
        <Typography
          variant="h2"
          gutterBottom
          className="search-based-property-typography"
        >
          Because you searched
          <span> Pune</span>
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        // justifyContent="center"
        // alignItems="center"
        spacing={2}
      >
        {SEARCH_BASED_PROPERTY_CONSTANT &&
          SEARCH_BASED_PROPERTY_CONSTANT.map(
            ({ title, subtitle, id, icon_name, count }) => (
              <SearchBasedCard
                key={id}
                title={title}
                subtitle={subtitle}
                icon_name={icon_name}
                count={count}
              />
            )
          )}
      </Grid>
    </div>
  );
};

export default SearchBasedProperty;
