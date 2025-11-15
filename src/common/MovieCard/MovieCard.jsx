import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre.js";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  // console.log("Movie Adult Status:", movie.adult);

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-link">
      <div
        style={{
          backgroundImage: `${
            movie.poster_path
              ? "url(" +
                `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
                ")"
              : `url("https://placehold.co/300x450?text=No+Image")`
          }`,
        }}
        className="movie-card"
      >
        <div className="overlay p-2">
          <h3>{movie.title}</h3>
          {showGenre(movie.genre_ids).map((genre, index) => (
            <Badge bg="danger" key={index}>
              {genre}
            </Badge>
          ))}
          {/*  */}
          <div className="movie-info">
            <div className="info-item">
              <span>⭐</span> {movie.vote_average.toFixed(1)}
            </div>
            <div className="info-item">
              <span>🔥</span> {Math.round(movie.popularity)}
            </div>
            <div className="info-item">
              {movie.adult ? "🔞 Adult" : "UNDER18"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
