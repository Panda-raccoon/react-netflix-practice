import React from "react";
import { useRecommendMoviesQuery } from "../../../hooks/useRecommendMovie";

const RecommendMovieSlide = () => {
  const { data, isLoading, isError, error } = useRecommendMoviesQuery;
  console.log("추천영화", { data, isLoading, isError, error });

  return (
    <div>
      <MovieSlider
        title="추천 영화"
        movies={data.results}
        // responsive={responsive}
      />
    </div>
  );
};

export default RecommendMovieSlide;
