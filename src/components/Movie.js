import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;
  return (
    <Card sx={{ maxWidth: "100%", height: "100%" }}>
      <CardMedia
        sx={{ height: 400 }}
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        title={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {movie.release_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/movies/${movie.id}`}>
          <Button size="small">More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
