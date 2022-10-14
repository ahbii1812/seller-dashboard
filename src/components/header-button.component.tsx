import { Button } from "@mui/material";

type HeaderButtonProps = {
  title: string;
  onClick: Function;
  isSelected: Boolean;
};

export default function HeaderButton({
  title,
  onClick,
  isSelected,
}: HeaderButtonProps) {
  return (
    <Button
      onClick={(i) => onClick(i)}
      sx={{
        fontWeight: isSelected ? "bold" : "light",
        padding: "0px",
        color: "white",
        fontSize: "18px",
      }}
      disableRipple
    >
      {title.toUpperCase()}
    </Button>
  );
}
