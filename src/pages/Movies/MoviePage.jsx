import { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre"; // 장르 정렬

import ReactPaginate from "react-paginate";

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  // const [query, setQuery] = useSearchParams();

  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const [sortBy, setSortBy] = useState("popularity.desc"); // 인기순을 기본으로 추가 필터링 부분
  const [selectedGenres, setSelectedGenres] = useState([]); // 장르 정렬

  const { data: genres, isLoading: genreLoading } = useMovieGenreQuery(); // 장르정렬

  // 키워드 변경 시 초기화 ( 페이지네이션도 첫 페이지로 )
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // 페이지네이션
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortBy,
    genreIds: selectedGenres, // 장르정렬
  });
  // console.log("서치: ", { data, isLoading, isError, error });
  // 장르정렬 추가
  if (isLoading || genreLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        {/* 🎬 왼쪽 필터 카드 */}
        <Col lg={3} xs={12} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fw-bold mb-3 text-danger">
                🎬 필터
              </Card.Title>

              {/* 정렬 선택 */}
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
                      id={`genre-${genre.id}`}
                      label={genre.name}
                      checked={selectedGenres.includes(genre.id)}
                      onChange={() => {
                        const newSelectedGenres = selectedGenres.includes(genre.id)
                          ? selectedGenres.filter((id) => id !== genre.id)
                          : [...selectedGenres, genre.id];
                        setSelectedGenres(newSelectedGenres);
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              </Form.Group>

              {/* 초기화 버튼 */}
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
              <p className="text-center">검색 결과가 없습니다.</p>
            )}
          </Row>

          {/* 페이지네이션 */}
          <ReactPaginate
            nextLabel="다음 >"
            previousLabel="< 이전"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages || 0}
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
