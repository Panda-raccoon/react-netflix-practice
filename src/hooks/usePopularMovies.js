import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`); // 엔드포인트만 작성하면 됨
};

useQuery;

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    suspense: true, // 추가 부분
    select: (result) => result.data,
  });
};
