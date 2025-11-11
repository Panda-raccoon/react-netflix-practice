import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy, genreId }) => {
  if (keyword) {
    // 검색 시에는 TMDB의 /search/movie 사용
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else {
    // 장르와 정렬이 적용된 인기 영화 (discover)
    return api.get(
      `/discover/movie?sort_by=${sortBy}&page=${page}${
        genreId ? `&with_genres=${genreId}` : ""
      }`
    );
  }
};

export const useSearchMovieQuery = ({ keyword, page, sortBy, genreId }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortBy, genreId }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy, genreId }),
    select: (result) => result.data,
  });
};
