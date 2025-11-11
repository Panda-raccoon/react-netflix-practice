import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchMovieGenre = () => {
  return api.get(`/genre/movie/list`);
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => {
      return result.data.genres; // 내가 이것땜에 한시간동안 리턴이 안되는 이유를 계속 찾았따아ㅏ아아아
    },
    staleTime: 300000, //5분
  });
};
