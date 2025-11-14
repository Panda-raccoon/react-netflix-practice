import React from "react";
import { useRecommendMoviesQuery } from "../../../../hooks/useRecommendMovie";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
const RecommendMovieSlide = ({ movieId }) => {
  const { data, isLoading, isError, error } = useRecommendMoviesQuery({
    movieId,
  });

  console.log("추천영화", data);

  // 로딩 상태
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 에러 상태
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 데이터 정리
  const movies = data?.results ?? [];

  return (
    <div className="recommend-movie-container">
      {movies.length > 0 ? (
        <MovieSlider
          title="추천 영화"
          movies={movies}
          responsive={responsive}
        />
      ) : (
        <p className="no-recommendations">추천 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default RecommendMovieSlide;
