import { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./MoviePage.style.css";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");

  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { data: genres, isLoading: genreLoading } = useMovieGenreQuery();

  // 키워드 변경 시 1페이지로 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // page는 TMDB 제한값 500 이하로만 허용
  const safePage = Math.min(page, 500);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page: safePage,
    sortBy,
    genreIds: selectedGenres,
  });

  if (isLoading || genreLoading) return <LoadingSpinner />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <Container>
      <Row>
        {/* 🎬 왼쪽 필터 */}
        <Col lg={3} xs={12} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fw-bold mb-3 text-danger">
                🎬 필터
              </Card.Title>

              {/* 정렬 기준 */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">정렬 기준</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="popularity.desc">인기순</option>
                  <option value="vote_average.desc">평점 높은 순</option>
                  <option value="primary_release_date.desc">
                    최신 개봉 순
                  </option>
                </Form.Select>
              </Form.Group>

              {/* 장르 선택 */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">장르 선택</Form.Label>
                <div className="genre-checkbox-group">
                  {genres?.map((genre) => (
                    <Form.Check
                      key={genre.id}
                      type="checkbox"
                      label={genre.name}
                      checked={selectedGenres.includes(genre.id)}
                      onChange={() => {
                        const updatedGenres = selectedGenres.includes(genre.id)
                          ? selectedGenres.filter((g) => g !== genre.id)
                          : [...selectedGenres, genre.id];

                        setSelectedGenres(updatedGenres);
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              </Form.Group>

              {/* 초기화 */}
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={() => {
                  setSortBy("popularity.desc");
                  setSelectedGenres([]);
                  setPage(1);
                }}
              >
                필터 초기화
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* 🎥 오른쪽 영화 목록 */}
        <Col lg={9} xs={12}>
          <Row>
            {data?.results?.length ? (
              data.results.map((movie) => (
                <Col key={movie.id} lg={4} md={6} xs={12} className="mb-4">
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">검색 결과가 없습니다.</p>
            )}
          </Row>

          {/* 📌 페이지네이션 */}
          <ReactPaginate
            previousLabel="< 이전"
            nextLabel="다음 >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={window.innerWidth < 576 ? 1 : 3}
            marginPagesDisplayed={window.innerWidth < 576 ? 1 : 2}
            pageCount={Math.min(data?.total_pages || 1, 500)}
            forcePage={page - 1}
            containerClassName="pagination justify-content-center mt-4"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
