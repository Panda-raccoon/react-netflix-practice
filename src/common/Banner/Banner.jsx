import React from "react";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Banner = ({ movie }) => {
  const { data, isError, error } = usePopularMoviesQuery();
  // console.log("Query State: ", { data, isLoading, isError, error });
  // 로딩은 컴포넌트 화 하고 훅에 suspense 함으로써 isloading
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const displayMovie = movie || (data && data.results[0]);

  if (!displayMovie) {
    return <LoadingSpinner />;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${displayMovie.poster_path}` +
          ") ",
        // backgroundRepeat: "no-repeat",                                                                                                                                            │
        // backgroundSize: "cover",                                                                                                                                                  │
        // backgroundPosition: "center center",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{displayMovie.title} </h1>
        <p>{displayMovie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
