import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import { color } from "../theme/theme";

type HeaderProps = {
  children: any;
};

interface FormProps {
  declaration: boolean;
}

export default function FormSubmitButton({ children }: HeaderProps) {
  const { values, handleSubmit } = useFormikContext<FormProps>();

  return (
    <Button
      onClick={() => handleSubmit()}
      disabled={!values.declaration}
      sx={{
        border: `1px solid ${color.primary}`,
        backgroundColor: color.primary,
        borderRadius: "0px",
        textTransform: "none",
        ":hover": { backgroundColor: color.primary },
        minWidth: "125px",
        ":disabled": {
          border: `1px solid ${color.border}`,
          backgroundColor: color.border,
        },
      }}
    >
      {children}
    </Button>
  );
}
