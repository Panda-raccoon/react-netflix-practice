import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy, genreIds }) => {
  // 장르 복수 선택해서 보여 줄 수 있게 하기
  const genreQuery =
    genreIds && genreIds.length > 0 ? `&with_genres=${genreIds.join(",")}` : "";

  if (keyword) {
    // 검색 시에는 TMDB의 /search/movie 사용
    return api.get(`/search/movie?query=${keyword}&page=${page}${genreQuery}`);
  } else {
    // 장르와 정렬이 적용된 인기 영화 (discover)
    return api.get(
      `/discover/movie?sort_by=${sortBy}&page=${page}${genreQuery}`
    );
  }
};

export const useSearchMovieQuery = ({ keyword, page, sortBy, genreIds }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortBy, genreIds }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy, genreIds }),
    select: (result) => result.data,
  });
};
