import { Box, Button, Grid, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
  required: Boolean;
  list: Array<String>;
}

export default function CategorySelect({ label, name, required, list }: Props) {
  const { values, setFieldValue } = useFormikContext<Props>();

  type ObjectKey = keyof typeof values;

  const renderButton = (label: string) => (
    <Grid item>
      <Button
        sx={{
          minWidth: "70px",
          textTransform: "none",
          borderRadius: "0px",
          fontWeight: "light",
          paddingLeft: "16px",
          paddingRight: "16px",
          border: `1px solid ${color.primary}`,
          color: values[name as ObjectKey] === label ? "white" : color.primary,
          backgroundColor:
            values[name as ObjectKey] === label ? color.primary : "white",
          ":hover": {
            backgroundColor:
              values[name as ObjectKey] === label ? color.primary : "white",
          },
        }}
        onClick={() => setFieldValue(name, label)}
      >
        {label}
      </Button>
    </Grid>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>{`${label} ${
        required ? "*" : ""
      }`}</Typography>
      <Grid container spacing={2}>
        {list.map((item) => (
          <Grid item key={item.toString()}>
            {renderButton(item.toString())}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
