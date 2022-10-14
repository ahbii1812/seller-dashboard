import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
}

interface ImageProps {
  image: Array<string>;
}

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default function ThumbnailImage({ label, name }: Props) {
  const {
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    touched,
    errors,
  } = useFormikContext<ImageProps>();
  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  type ObjectKey = keyof typeof values;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: showError ? color.error : color.primary,
          margin: "0px 0px 5px",
        }}
      >{`${label} *`}</Typography>
      {values[name as ObjectKey].length > 0 ? (
        <img
          src={JSON.parse(values[name as ObjectKey][0])}
          alt="213"
          width="100%"
        />
      ) : (
        <Button
          component="label"
          sx={{
            minWidth: "90px",
            textTransform: "none",
            borderRadius: "0px",
            fontWeight: "light",
            paddingLeft: "16px",
            paddingRight: "16px",
            border: `1px solid ${color.primary}`,
            color: "white",
            backgroundColor: color.primary,
            ":hover": {
              backgroundColor: color.primary,
            },
          }}
        >
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <AddPhotoAlternateIcon />
            Add Image
          </Box>

          <input
            onClick={() => setFieldTouched(name)}
            type="file"
            name={name}
            hidden
            accept="image/*"
            onChange={(e) => {
              const { files } = e.target;
              if (files) {
                const selectedFIles = files[0];
                const allowedFileType = SUPPORTED_FORMATS.includes(
                  selectedFIles.type
                );
                if (allowedFileType) {
                  const fileReader = new FileReader(); // to preview the image
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      const tempArr: string[] = values[name as ObjectKey];
                      tempArr.push(JSON.stringify(fileReader.result));
                      setFieldValue(name, tempArr);
                    }
                  };
                  fileReader.readAsDataURL(selectedFIles);
                } else if (!allowedFileType) {
                  setFieldError(name, `Only ${SUPPORTED_FORMATS} are allowed`);
                }
              }
            }}
          />
        </Button>
      )}
      {showError && (
        <FormHelperText error>{errors[name as ObjectKey]}</FormHelperText>
      )}
    </Box>
  );
}
