import { Button, Menu } from "@mui/material";
import { useRef, useState, type ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AppBarMenuButtonProps {
  buttonLabel: string;
  menuItems?: ReactNode[];
}
export default function AppBarMenuButton(props: AppBarMenuButtonProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <div>
      <Button
        endIcon={<ExpandMoreIcon />}
        color="inherit"
        onClick={toggleOpen}
        ref={anchorRef}
      >
        {props.buttonLabel}
      </Button>

      {props.menuItems && (
        <Menu anchorEl={anchorRef.current} open={open} onClose={toggleOpen}>
          {props.menuItems.map((item) => item)}
        </Menu>
      )}
    </div>
  );
}
