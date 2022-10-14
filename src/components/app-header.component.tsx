import {
  AppBar,
  Avatar,
  Box,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { color, PCMaxWidth } from "../theme/theme";
import HeaderButton from "./header-button.component";

const CenterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const MaxWidthBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: PCMaxWidth,
  minHeight: "40px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: "white",
  backgroundColor: "transparent",
  border: "white",
}));

const AppBarFlexEndBox = styled(Box)({
  height: "80px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

type HeaderProps = {
  children: any;
};

function AppHeader({ children }: HeaderProps) {
  const location = window.location;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));

  const PaddingX = isMobile ? "10px" : "50px";

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: color.primary,
          paddingLeft: PaddingX,
          paddingRight: PaddingX,
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
        elevation={0}
      >
        <Grid container sx={{ alignItems: "center" }} spacing={5}>
          {!isMobile ? (
            <>
              <Grid item xs={2}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  LOGO
                </Typography>
              </Grid>
              <Grid item>
                <HeaderButton
                  isSelected={location.pathname.includes("events")}
                  title="Events"
                  onClick={() => console.log("Navigate to events")}
                />
              </Grid>
              <Grid item>
                <HeaderButton
                  isSelected={location.pathname.includes("features")}
                  title="Features"
                  onClick={() => console.log("Navigate to Features")}
                />
              </Grid>
              <Grid item>
                <HeaderButton
                  isSelected={location.pathname.includes("community")}
                  title="Community"
                  onClick={() => console.log("Navigate to Community")}
                />
              </Grid>
              <Grid item>
                <HeaderButton
                  isSelected={
                    location.pathname.includes("catalogue") ||
                    location.pathname === "/"
                  }
                  title="Catalogue"
                  onClick={() => console.log("Navigate to Catalogue")}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <AppBarFlexEndBox>
                  <StyledAvatar />
                </AppBarFlexEndBox>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "90px",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  LOGO
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </AppBar>
      <CenterBox
        sx={{
          paddingLeft: PaddingX,
          paddingRight: PaddingX,
        }}
      >
        <MaxWidthBox>{children}</MaxWidthBox>
      </CenterBox>
    </Box>
  );
}

export default AppHeader;
