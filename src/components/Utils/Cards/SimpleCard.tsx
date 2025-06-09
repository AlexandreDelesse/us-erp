import {
  Card,
  CardContent,
  CardHeader,
  type CardProps,
  type SxProps,
} from "@mui/material";

import { type ReactNode } from "react";

interface SimpleCardProps extends CardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  sx?: SxProps;
}
export default function SimpleCard(props: SimpleCardProps) {
  const { action, sx, ...otherprops } = props;
  const sxProps = sx ? { ...sx, borderRadius: 0 } : { borderRadius: 0 };
  return (
    <Card variant="outlined" sx={sxProps} {...otherprops}>
      <CardHeader
        sx={{ alignItems: "center" }}
        title={props.title}
        action={action}
      />
      {/* <Divider /> */}
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
