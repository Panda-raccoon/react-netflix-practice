import MovieReview from "./components/Review/MovieReview";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Alert, Badge, Button, Col, Container, Row } from "react-bootstrap";
import Banner from "../../common/Banner/Banner";
import "./MovieDetailPage.style.css";
import RecommendMovieSlide from "./components/RecommendMovieSlide/RecommendMovieSlide";

// 추가된 부분
import { useState } from "react";
import TrailerModal from "./components/TrailerModal";
import YouTube from "react-youtube";
import { useTrailerMovieQuery } from "../../hooks/useTrailerMovie";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  const { data: trailerList } = useTrailerMovieQuery({ movieId: id });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  // YouTube 예고편 key 찾기
  const trailer = trailerList?.find(
    (item) => item.type === "Trailer" && item.site === "YouTube"
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <Banner movie={data} />

      <Container className="movie-detail-container">
        <Row>
          {/* 왼쪽 포스터 */}
          <Col lg={4} sm={12}>
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
              alt={data.title}
              className="movie-poster"
            />
          </Col>

          {/* 오른쪽 영화 상세 정보 */}
          <Col lg={8} sm={12}>
            <div className="movie-info">
              <h1>{data.title}</h1>

              {/* 예고편 */}
              <Button
                variant="outline-danger"
                size="lg"
                className="mb-4"
                onClick={() => setShowModal(true)}
              >
                🎬 예고편 보기
              </Button>

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

        {/* 리뷰 */}
        <MovieReview movieId={id} />

        {/* 추천 영화 슬라이드 */}
        <RecommendMovieSlide movieId={id} />
      </Container>

      {/* 예고편 Modal */}
      <TrailerModal show={showModal} onHide={() => setShowModal(false)}>
        {trailer ? (
          <YouTube
            videoId={trailer.key}
            opts={{ width: "100%", height: "400" }}
          />
        ) : (
          <p>예고편이 제공되지 않습니다.</p>
        )}
      </TrailerModal>
    </div>
  );
};

export default MovieDetailPage;
