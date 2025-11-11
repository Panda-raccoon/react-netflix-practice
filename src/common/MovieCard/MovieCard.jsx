import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre.js";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  console.log("장르", genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) return ["ㅎㅎ"];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay p-2">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((genre, index) => (
          <Badge bg="danger" key={index}>
            {genre}
          </Badge>
        ))}
        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "over18" : "under18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
