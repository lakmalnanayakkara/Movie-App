import Alert from "@mui/material/Alert";

export default function MessageBox(props) {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
}
