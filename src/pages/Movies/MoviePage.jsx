import { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";

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

  // 페이지네이션
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortBy,
  });
  // console.log("서치: ", { data, isLoading, isError, error });
  if (isLoading) {
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
        <Col lg={4} xs={12}>
          <div className="mb-3">
            <label htmlFor="sortBy">정렬 기준</label>
            <select
              id="sortBy"
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1); // 정렬 바꾸면 1페이지로
              }}
            >
              <option value="popularity.desc">인기순</option>
              <option value="vote_average.desc">평점 높은 순</option>
              <option value="primary_release_date.desc">최신 개봉 순</option>
            </select>
          </div>
        </Col>

        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="다음  >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} // 전체페이지
            previousLabel="< 이전"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
