import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrailerMovie = ({ movieId }) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useTrailerMovieQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["movie-trailer", movieId],
    queryFn: () => fetchTrailerMovie({ movieId }),
    select: (result) => result.data.results,
  });
};
