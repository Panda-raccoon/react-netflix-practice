import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendMovies = ({ movieId }) => {
  return api.get(`movie/${movieId}/recommendations`); // 엔드포인트만 작성하면 됨
};

export const useRecommendMoviesQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["movie-recommend", movieId],
    queryFn: () => fetchRecommendMovies({ movieId }),
    select: (result) => result.data,
  });
};
