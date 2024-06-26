import React, { MouseEvent, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovie } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";

const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

interface MovieCardProps extends BaseMovie {
    selectFavourite: (movieId: number) => void;
}

interface MovieListProps {
    movie: MovieT;
    action: (m: MovieT) => void;
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
    const movie = { ...props.movie, favourite: false };
    const { favourites, addToFavourites } = useContext(MoviesContext);

    if (favourites.find((id) => id === movie.id)) movie.favourite = true;

    return (
        <Card sx={styles.card}>
            <CardHeader
                avatar={
                    props.favourite ? (
                        <Avatar sx={styles.avatar}>
                            <FavoriteIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="p">
                        {props.title}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={styles.media}
                image={
                    props.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${props.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <CalendarIcon fontSize="small" />
                            {props.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <StarRateIcon fontSize="small" />
                            {"  "} {props.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {props.action(movie)}
                <Link to={`/movies/${props.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
