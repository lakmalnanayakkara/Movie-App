import Alert from "@mui/material/Alert";

export default function MessageBox(props) {
  return (
    <Alert variant="filled" severity={props.severity || "info"}>
      {props.children}
    </Alert>
  );
}
