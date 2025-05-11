import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "./Store";

export default function Movie(props) {
  const { movie } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { savedMovies } = state;
  const handleAddToFavorite = () => {
    ctxDispatch({ type: "SAVE_MOVIE", payload: movie });
  };

  const handleRemoveFromFavorite = () => {
    ctxDispatch({ type: "UNSAVE_MOVIE", payload: movie });
  };

  const isMovieInFavorites = () => {
    return savedMovies.some((favMovie) => favMovie === movie);
  };
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
        <Typography
          variant="body2"
          sx={{
            display: "inline-block",
            color: "white",
            backgroundColor: "primary.main",
            px: 1.5,
            py: 0.5,
            borderRadius: "12px",
            fontSize: "0.8rem",
            mt: 1,
          }}
        >
          {movie.release_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/movies/${movie.id}`}>
          <Button size="small">More</Button>
        </Link>
        {!isMovieInFavorites() && (
          <Button size="small" onClick={handleAddToFavorite}>
            Add to Favorite
          </Button>
        )}
        {isMovieInFavorites() && (
          <Button size="small" onClick={handleRemoveFromFavorite}>
            Remove from Favorite
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
