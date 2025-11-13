import { Suspense } from "react";
import Banner from "../../common/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// 1. 배너 => popular 영화를 들고와서 첫번째 아이템을 보여주자
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <PopularMovieSlide />
        <TopRatedMovieSlide />
        <UpcomingMovieSlide />
      </Suspense>
    </div>
  );
};

export default Homepage;

// 영화 디테일 페이지에서 영화에 대한 디테일한 정보를 볼 수 있다. ( 포스터, 제목, 줄거리, 점수, 인기도, ,,,)
// trailer 를 누르면 trailer 볼 수 있다.
// 영화에 리뷰도 볼 수 있다.
// 관련된 영화도 볼 수 있다.
// 영화 검색을 할 수 있다.
// 영화 정렬할 수 있다.
// 영화를 필터링 할 수 있다.
