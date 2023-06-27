import React, { Fragment } from "react";
import { Grid, Typography } from "@mui/material";
// import SearchBasedCard from "./SearchBasedCard";
import "./FeaturedProjects.styles.scss";
import FeaturedProjectCard from "./FeaturedProjectCard";
// import { SEARCH_BASED_PROPERTY_CONSTANT } from "./constant";

const FeaturedProjects = ({ updatePostData }) => {
  return (
    <div className="featured-projects-container">
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        className="featured-projects-header-grid"
      >
        <Typography
          variant="h2"
          gutterBottom
          className="featured-projects-typography"
        >
          Featured
          <span> Projects</span>
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {updatePostData &&
          updatePostData
            .filter((_, index) => index < 2)
            .map((postData) => {
              return <FeaturedProjectCard postData={postData} />;
            })}
      </Grid>
    </div>
  );
};

export default FeaturedProjects;
