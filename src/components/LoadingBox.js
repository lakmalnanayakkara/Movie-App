import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingBox() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size="3rem" />
    </Box>
  );
}
