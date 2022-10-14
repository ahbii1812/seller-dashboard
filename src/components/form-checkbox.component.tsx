import React from "react";
import {
  FormControlLabel,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { useFormikContext } from "formik";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
  required: boolean;
  message: string;
}

interface CheckBoxProps {
  checked: boolean;
}

export default function FormCheckBox({
  label,
  name,
  required,
  message,
}: Props) {
  const { setFieldValue, values, errors, touched, setFieldTouched } =
    useFormikContext<CheckBoxProps>();
  type ObjectKey = keyof typeof values;
  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  const handleOnChange = (event: { target: { checked: any } }) => {
    setFieldTouched(name);
    setFieldValue(name, event.target.checked);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: showError ? color.error : color.primary,
        }}
      >{`${label} ${required ? "*" : ""}`}</Typography>
      <FormControlLabel
        sx={{ alignItems: "flex-start", margin: "0px", padding: "4px 0px 5px" }}
        control={
          <CheckBox
            checked={values[name as ObjectKey]}
            onChange={handleOnChange}
            size="small"
            sx={{
              padding: "0px",
              marginTop: "3px",
              color: color.primary,
              "&.Mui-checked": {
                color: color.primary,
              },
            }}
          />
        }
        label={
          <Typography variant="body2" sx={{ marginLeft: "10px" }}>
            {message}
          </Typography>
        }
      />
      {showError && (
        <FormHelperText error>{errors[name as ObjectKey]}</FormHelperText>
      )}
    </Box>
  );
}
