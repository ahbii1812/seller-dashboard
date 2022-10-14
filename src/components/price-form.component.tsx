import { Box, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
}

export default function PriceForm({
  label,
  name,
  placeholder,
  required,
}: Props) {
  const { values, setFieldValue } = useFormikContext<Props>();

  type ObjectKey = keyof typeof values;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/\./g)) {
      const [, decimal] = event.target.value.split(".");
      if (decimal?.length > 2) {
        return;
      }
    }
    setFieldValue(name, event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontWeight: "bold" }}>{`${label} ${
        required ? "*" : ""
      }`}</Typography>
      <TextField
        placeholder={placeholder}
        variant="standard"
        sx={{ width: "100%" }}
        value={values[name as ObjectKey]}
        onChange={handleChange}
        InputProps={{
          startAdornment: name.toUpperCase() === "RETAIL" && (
            <InputAdornment position="start">
              <Typography>S$</Typography>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
