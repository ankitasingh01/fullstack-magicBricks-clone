import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchField from "../SearchField";
import "./PropertyHeader.styles.scss";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d8232a"
    }
    //   secondary: pink,
  },
  // Name of the component
  typography: {
    // Name of the slot
    button: {
      // Some CSS
      textTransform: "none",
      fontSize: "14px",
      fontWeight: 600
    }
  }
  // MuiTabs: {
  //   root: {
  //     textTransform: "lowercase",
  //   },
  // },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    className: "simple-tab-child"
  };
}

export default function PropertyHeader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: "100%", marginTop: "75px" }}
        className="property-header-tabs-container"
      >
        <Typography className="property-header-tabs-typography">
          Find your perfect
          <span className="property-header-tabs-span"> Rental home</span>
        </Typography>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            aria-label="basic tabs example"
            className="property-header-tabs-child"
          >
            <Tab label="Buy" {...a11yProps(0)} />
            <Tab label="Rent" {...a11yProps(1)} />
            <Tab label="Sale" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SearchField />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchField />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SearchField />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
