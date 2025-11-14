import React from "react";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReviews";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { Alert } from "react-bootstrap";
import "./MovieReview.style.css";

const MovieReview = ({ movieId }) => {
  const { data, isLoading, isError, error } = useMovieReviewQuery({ movieId });
  console.log("리뷰", data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="movie-review-container">
      <h3 className="review-title">Reviews</h3>
      {data?.results?.length > 0 ? (
        data.results.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-author">
              <strong>작성자 : {review.author}</strong>
            </div>
            <p className="review-content">{review.content}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">아직 작성된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MovieReview;
