import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("Query State: ", { data, isLoading, isError, error });
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.results[0].poster_path}` +
          ") ",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center center",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{data.results[0].title} </h1>
        <p>{data.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
