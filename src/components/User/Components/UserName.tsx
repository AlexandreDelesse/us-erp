import { Typography } from "@mui/material";

interface Props {
  firstname?: string;
  lastname?: string;
  fullName?: string;
  username?: string;
}

function UserName(props: Props) {
  const {} = props;

  const getLabel = () => {
    if (props.fullName) return props.fullName;
    if (props.firstname && props.lastname)
      return `${props.lastname.toLocaleUpperCase()} ${props.firstname}`;
    return props.username ?? "No name";
  };

  return (
    <Typography mt={2} fontSize={24} p={2}>
      {getLabel()}
    </Typography>
  );
}

export default UserName;
