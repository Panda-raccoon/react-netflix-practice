import React, { useState } from "react";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReviews";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { Alert } from "react-bootstrap";
import "./MovieReview.style.css";

// 단일 리뷰를 처리하는 내부 컴포넌트
const Review = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // 리뷰 내용이 길지 않으면 전체를 보여줌
  if (review.content.length <= maxLength) {
    return (
      <div className="review-item">
        <div className="review-author">
          <strong>작성자 : {review.author}</strong>
        </div>
        <p className="review-content">{review.content}</p>
      </div>
    );
  }

  // 리뷰 내용이 길 경우, 더보기/접기 기능 추가
  return (
    <div className="review-item">
      <div className="review-author">
        <strong>작성자 : {review.author}</strong>
      </div>
      <p className="review-content">
        {isExpanded
          ? review.content
          : `${review.content.substring(0, maxLength)}...`}
      </p>
      <button onClick={toggleReadMore} className="read-more-btn">
        {isExpanded ? "접기" : "더보기"}
      </button>
    </div>
  );
};

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
        data.results.map((review) => <Review key={review.id} review={review} />)
      ) : (
        <p className="no-reviews">아직 작성된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MovieReview;
