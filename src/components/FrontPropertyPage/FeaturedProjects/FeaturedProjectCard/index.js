import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { HandleImage } from "../../../ListedProperties/utils";
import { POPUPTYPES } from "../../../ListedProperties/constant";
import Paper from "@mui/material/Paper";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./FeaturedProjectCard.styles.scss";
// import { ListedPropertiesContext } from "../context/ListedPropertiesContextProvider";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: "20px",
  padding: "5px",
  color: theme.palette.text.secondary
}));

export default function FeaturedProjectCard(postData) {
  const {
    ObjectImage,
    body,
    flatBudget,
    flatCategory,
    id,
    title,
    userId
  } = postData.postData;
  console.log("flatBudget", flatBudget);

  return (
    <Grid item key={id} xs={6}>
      <Card className="featured-project-card">
        <CardMedia
          component="img"
          height="194"
          image={HandleImage(ObjectImage)}
          alt="Paella dish"
        />
        <CardContent className="featured-project-container-card--child">
          <Typography className="featured-project-container-card--subchild">
            <CurrencyRupeeIcon fontSize="12px" sx={{ marginBottom: "-1px" }} />
            {/* {flatBudget.budget} - {flatCategory.title} */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>

        <CardActions>
          <Grid container direction="row" spacing={8}>
            <Grid item>
              <Button
                size="small"
                className="featured-project-container-card-button"
              >
                QUICK VIEW
              </Button>
            </Grid>
            {/* these options should be disabled for customers, enabled for broker/owners */}
            <Grid item className="card-action-icons">
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="upload picture" size="small">
                  <EditIcon className="icon-color" />
                </IconButton>
                <IconButton
                  size="small"
                  //   onClick={() =>
                  //     dispatch(
                  //       duplicateProperty({
                  //         userId: userId,
                  //         id: id,
                  //         title: title,
                  //         body: body,
                  //       })
                  //     )
                  //   }
                >
                  <ContentCopyIcon className="icon-color" />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon className="icon-color" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
