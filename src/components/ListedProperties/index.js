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
import { HandleImage } from "./utils";
import { POPUPTYPES } from "./constant";
import Paper from "@mui/material/Paper";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./ListedProperties.styles.scss";
// import { ListedPropertiesContext } from "../context/ListedPropertiesContextProvider";
import {
  duplicateProperty,
  fetchPosts
} from "../reduxState/ListedPropertiesReducer";
import SearchField from "../SearchField";
import EditPopupModal from "./PropertyComponents/EditPopupModal";
import DeletePopupModal from "./PropertyComponents/DeletePopupModal";
import QuickViewPopupModal from "./PropertyComponents/QuickViewPopupModal";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: "20px",
  padding: "5px",
  color: theme.palette.text.secondary
}));

export default function ListedProperties() {
  const [open, setOpen] = useState(false);
  const [singlePropertyDataUpdation, setSinglePropertyDataUpdation] = useState(
    {}
  );
  const [popupPurposeName, setPopupPurposeName] = useState("");
  let name;
  const updateProperty = useSelector((state) => state.updateProperty);
  const { allData, isLoading, error, updatePostData } = updateProperty;
  // console.log("updatePostData", updatePostData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  // const { allData, isLoading, error } = useContext(ListedPropertiesContext);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = (
    userId,
    id,
    title,
    body,
    flatBudget,
    flatCategory,
    popupType
  ) => {
    setSinglePropertyDataUpdation({
      userId,
      id,
      title,
      body,
      flatBudget,
      flatCategory
    });
    if (popupType === "edit") {
      setPopupPurposeName(popupType);
    } else if (popupType === "delete") {
      setPopupPurposeName(popupType);
    } else {
      setPopupPurposeName(popupType);
    }
    setOpen(true);
  };

  const handleSinglePropertyDataUpdation = (event) => {
    const { name, value } = event.target;
    setSinglePropertyDataUpdation({
      ...singlePropertyDataUpdation,
      [name]: value
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePopupModal = (popupPurposeName) => {
    if (popupPurposeName === "edit") {
      return (
        <EditPopupModal
          open={open}
          handleClose={handleClose}
          singlePropertyDataUpdation={singlePropertyDataUpdation}
          handleSinglePropertyDataUpdation={handleSinglePropertyDataUpdation}
        />
      );
    } else if (popupPurposeName === "delete") {
      return (
        <DeletePopupModal
          open={open}
          handleClose={handleClose}
          singlePropertyDataUpdation={singlePropertyDataUpdation}
        />
      );
    } else {
      return (
        <QuickViewPopupModal
          open={open}
          handleClose={handleClose}
          singlePropertyDataUpdation={singlePropertyDataUpdation}
          handleSinglePropertyDataUpdation={handleSinglePropertyDataUpdation}
        />
      );
    }
  };

  return (
    <>
      {open && handlePopupModal(popupPurposeName)}
      <Item elevation={6}>
        <Grid container spacing={8} justifyContent="center">
          {updatePostData &&
            updatePostData.map(
              ({
                title,
                body,
                id,
                userId,
                ObjectImage,
                flatBudget,
                flatCategory
              }) => (
                <Grid item key={id}>
                  <Card className="card-container" sx={{ maxWidth: 345 }}>
                    <CardHeader
                      className="card-container-header"
                      action={
                        <>
                          <IconButton aria-label="settings">
                            {/* request more photos/videos, contact owner, site visit schedule */}
                            <MoreVertIcon className="card-container-header-button" />
                          </IconButton>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon className="card-container-header-button" />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon className="card-container-header-button" />
                          </IconButton>
                        </>
                      }
                      title={title}
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={HandleImage(ObjectImage)}
                      alt="Paella dish"
                    />
                    <CardContent className="card-content-container-child">
                      <Typography className="card-content-container-subchild">
                        <CurrencyRupeeIcon
                          fontSize="12px"
                          sx={{ marginBottom: "-1px" }}
                        />
                        {flatBudget.budget} - {flatCategory.title}
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
                            className="card-actions-button"
                            onClick={(e) =>
                              handleClickOpen(
                                userId,
                                id,
                                title,
                                body,
                                flatBudget,
                                flatCategory,
                                POPUPTYPES.quickView
                              )
                            }
                          >
                            QUICK VIEW
                          </Button>
                        </Grid>
                        {/* these options should be disabled for customers, enabled for broker/owners */}
                        <Grid item className="card-action-icons">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="upload picture"
                              size="small"
                              onClick={(e) =>
                                handleClickOpen(
                                  userId,
                                  id,
                                  title,
                                  body,
                                  flatBudget,
                                  flatCategory,
                                  POPUPTYPES.edit
                                )
                              }
                            >
                              <EditIcon className="icon-color" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() =>
                                dispatch(
                                  duplicateProperty({
                                    userId: userId,
                                    id: id,
                                    title: title,
                                    body: body
                                  })
                                )
                              }
                            >
                              <ContentCopyIcon className="icon-color" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) =>
                                handleClickOpen(
                                  userId,
                                  id,
                                  title,
                                  body,
                                  flatBudget,
                                  flatCategory,
                                  POPUPTYPES.delete
                                )
                              }
                            >
                              <DeleteIcon className="icon-color" />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              )
            )}
        </Grid>
      </Item>
    </>
  );
}
