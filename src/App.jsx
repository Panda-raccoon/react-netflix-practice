import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";

// 페이지
// 1. 홈페이지
// 2. 영화 전체보여주는 페이지 (서치)
// 3. 영화 디테일 페이지

function App() {
  return (
    <Routes>
      {/* user화면 */}
      <Route path="/" element={<AppLayout />} />
    </Routes>
  );
}

export default App;
