import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("Query State: ", { data, isLoading, isError, error });

  return <div>Banner</div>;
};

export default Banner;
