import { Box, Grid, Tab, useMediaQuery, useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { color } from "../theme/theme";
import ImageList from "./image-list.component";
import Preview from "./preview.component";

export default function ImageAndPreview() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={6}
      sx={{
        paddingLeft: isMobile ? "0px" : "40px",
        paddingRight: isMobile ? "0px" : "40px",
      }}
    >
      <Grid item xs={12} />
      <Grid item xs={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: color.primary,
                  height: "1px",
                },

                width: "100%",
              }}
            >
              <Tab
                disableRipple
                sx={{
                  textTransform: "none",
                  color: color.border,
                  "&.Mui-selected": {
                    color: color.primary,
                  },
                }}
                label="Image Gallery"
                value="1"
              />
              <Tab
                disableRipple
                sx={{
                  textTransform: "none",
                  color: color.border,
                  "&.Mui-selected": {
                    color: color.primary,
                  },
                }}
                label="Preview"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "24px 0px 24px 0px" }}>
            <ImageList name="image" label="test" />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "24px 0px 24px 0px" }}>
            <Preview />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}
