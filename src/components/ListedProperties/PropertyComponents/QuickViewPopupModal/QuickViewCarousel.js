import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Bedroom from "../../../assets/Bedroom.png";
import EntranceRoom from "../../../assets/EntranceRoom.png";
import LivingRoom from "../../../assets/LivingRoom.png";
import LivingRoomWithNoKitchen from "../../../assets/LivingRoomWithNoKitchen.png";
import StudyRoom from "../../../assets/StudyRoom.png";
import TVRoom from "../../../assets/TVRoom.png";
import { HandleImage } from "../../utils";
import { CardMedia } from "@mui/material";

const steps = [
  {
    label: "Bedroom",
    imageUrl: "Bedroom"
  },
  {
    label: "Entrance Room",
    imageUrl: "EntranceRoom"
  },
  {
    label: "Living Room",
    imageUrl: "LivingRoom"
  },
  {
    label: "LivingRoom With No Kitchen",
    imageUrl: "LivingRoomWithNoKitchen"
  },
  {
    label: "Study Room",
    imageUrl: "StudyRoom"
  },
  {
    label: "TV Room",
    imageUrl: "TVRoom"
  }
];

export default function QuickViewCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default"
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
        {/* {steps[activeStep].description} */}
        <CardMedia
          component="img"
          height="194"
          image={HandleImage(steps[activeStep].imageUrl)}
          alt="Paella dish"
        />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
