import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
}

export default function QuantityField({
  label,
  name,
  placeholder,
  required,
}: Props) {
  const { values, setFieldValue, touched, errors, setFieldTouched } =
    useFormikContext<Props>();

  type ObjectKey = keyof typeof values;

  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;

    if (event.target.value === "" || regex.test(event.target.value)) {
      setFieldValue(name, event.target.value);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: showError ? color.error : color.primary,
        }}
      >{`${label} ${required ? "*" : ""}`}</Typography>
      <TextField
        helperText={showError ? errors[name as ObjectKey] : null}
        onBlur={() => setFieldTouched(name)}
        error={showError}
        placeholder={placeholder}
        variant="standard"
        sx={{ width: "100%" }}
        value={values[name as ObjectKey]}
        onChange={handleChange}
      />
    </Box>
  );
}
