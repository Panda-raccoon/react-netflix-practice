import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`); // 엔드포인트만 작성하면 됨
};

useQuery;

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRatedMovies,
    suspense: true,
    select: (result) => result.data,
  });
};
