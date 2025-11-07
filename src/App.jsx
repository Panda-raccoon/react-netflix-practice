import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import MoviePage from "./pages/Movies/MoviePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// 페이지
// 1. 홈페이지 => /
// 2. 영화 전체보여주는 페이지 (서치) => /movies
// 3. 영화 디테일 페이지 => /movies/:id
// 추천영화 => /movies/:id/recommendation
// 리뷰 => /movies/:id/reviews

function App() {
  return (
    <Routes>
      {/* user화면 */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />

        {/* movie화면 */}
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
      </Route>

      {/* 404화면 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
