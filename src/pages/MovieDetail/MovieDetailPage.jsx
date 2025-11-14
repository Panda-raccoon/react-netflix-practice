import MovieReview from "./components/Review/MovieReview";
import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Alert, Badge, Col, Container, Row } from "react-bootstrap";
import Banner from "../../common/Banner/Banner";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  console.log("상세", data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <Banner movie={data} />
      <Container className="movie-detail-container">
        <Row>
          {/* 영화포스터 왼쪽*/}
          <Col lg={4} sm={12}>
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
              alt={data.title}
              className="movie-poster"
            />
          </Col>
          {/* 오른쪽*/}
          <Col lg={8} sm={12}>
            <div className="movie-info">
              <h1>{data.title}</h1>
              <div className="genres">
                {data.genres.map((genre) => (
                  <Badge key={genre.id} bg="danger" className="genre-badge">
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <p>
                <strong>Popularity:</strong> {data.popularity}
              </p>
              <p>
                <strong>Release Date:</strong> {data.release_date}
              </p>
              <p>
                <strong>Budget:</strong> ${data.budget.toLocaleString()}
              </p>
              <hr />
              <p className="overview">{data.overview}</p>
            </div>
          </Col>
        </Row>
        {/* MovieReview 컴포넌트를 기존 Container 안에 추가 */}
        <MovieReview movieId={id} />
      </Container>
    </div>
  );
};

export default MovieDetailPage;
