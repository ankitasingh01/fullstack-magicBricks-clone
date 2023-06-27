import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import QuickViewCarousel from "./QuickViewCarousel";

export default function QuickViewPopupModal({
  open,
  handleClose,
  singlePropertyDataUpdation,
  handleSinglePropertyDataUpdation,
}) {
  const [scroll, setScroll] = React.useState("paper");
  console.log("singlePropertyDataUpdation", singlePropertyDataUpdation);
  const descriptionElementRef = React.useRef(null);
  //   React.useEffect(() => {
  //     if (open) {
  //       const { current: descriptionElement } = descriptionElementRef;
  //       if (descriptionElement !== null) {
  //         descriptionElement.focus();
  //       }
  //     }
  //   }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {singlePropertyDataUpdation.title}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={2} flexDirection="row" flexWrap="nowrap">
              <Grid item xs={8}>
                <QuickViewCarousel />
              </Grid>
              <Grid item xs={6}>
                {singlePropertyDataUpdation.body}
                <Typography className="card-content-container-subchild">
                  <CurrencyRupeeIcon
                    fontSize="12px"
                    sx={{ marginBottom: "-1px" }}
                  />
                  {singlePropertyDataUpdation.flatBudget.budget} -
                  {singlePropertyDataUpdation.flatCategory.title}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Contact Owner</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
