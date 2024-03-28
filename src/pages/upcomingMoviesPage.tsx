import { useState, useEffect, FC } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMovies: FC = () => {
    const [movies, setMovies] = useState<ListedMovie[]>([]);

    const addToFavourites = (movieId: number) => {
        const updatedMovies = movies.map((m: ListedMovie) =>
            m.id === movieId ? { ...m, favourite: true } : m
        );
        setMovies(updatedMovies);
    };

    useEffect(() => {
        getUpcomingMovies().then((movies) => {
            setMovies(movies);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            selectFavourite={addToFavourites}
        />
    );
};
export default UpcomingMovies;
