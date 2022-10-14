import { Button } from "@mui/material";
import { color } from "../theme/theme";

type HeaderProps = {
  children: any;
  onClick: Function;
};

export default function BorderButton({ children, onClick }: HeaderProps) {
  return (
    <Button
      onClick={() => onClick()}
      sx={{
        color: color.primary,
        border: `1px solid ${color.primary}`,
        borderRadius: "0px",
        textTransform: "none",
        ":hover": { backgroundColor: "transparent" },
        minWidth: "125px",
      }}
    >
      {children}
    </Button>
  );
}
