import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import KeyIcon from "@mui/icons-material/Key";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./SearchBasedCard.styles.scss";
import { Grid } from "@mui/material";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

const handleIcons = (icon_name) => {
  switch (icon_name) {
    case "watch":
      return (
        <WatchLaterIcon className="search-based-card-container-watch-icon" />
      );
    case "key":
      return (
        <KeyIcon className="search-based-card-container-watch-icon key-rotate" />
      );
    case "building":
      return (
        <HomeWorkIcon className="search-based-card-container-watch-icon" />
      );
    case "location":
      return (
        <LocationOnIcon className="search-based-card-container-watch-icon" />
      );
  }
};

export default function SearchBasedCard({ title, subtitle, icon_name, count }) {
  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });
  return (
    <Grid item xs={3}>
      <Card
        // sx={{
        //   display: "block",
        //   width: "200px",
        //   // transitionDuration: "0.3s",
        //   height: "100px",
        // }}
        className="search-based-card-container"
        onMouseOver={() => setState({ raised: true, shadow: 5 })}
        onMouseOut={() => setState({ raised: false, shadow: 1 })}
        raised={state.raised}
        zdepth={state.shadow}
      >
        <CardContent className="search-based-card-card-content">
          <Typography
            variant="h5"
            component="div"
            className="search-based-card-typography"
          >
            <span className={count > 0 && "search-based-card-span"}>
              {count > 0 ? `${count}K` : null}
            </span>
            {title}
          </Typography>
        </CardContent>
        <CardActions className="search-based-card-card-actions">
          <Button
            size="small"
            className="search-based-card-card-actions-button"
          >
            {subtitle}
            <ArrowForwardIcon className="search-based-card-card-actions-arrow-icon" />
          </Button>
        </CardActions>
        {icon_name && handleIcons(icon_name)}
        {/* <WatchLaterIcon className="search-based-card-container-watch-icon" /> */}
      </Card>
    </Grid>
  );
}
