import { axiosInstance } from "../api/axios";

export type MovieCategoryKey =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";

type MoviePageResponse = {
  results: MovieType[];
  total_pages: number;
};

type FetchSearchMoviePageParams = {
  category: MovieCategoryKey;
  keyword: string;
  page: number;
  signal: AbortSignal;
};

const NOW_PLAYING_WINDOW_DAYS = 120;
const HANGUL_REGEX = /[가-힣]/;
const SPACE_REGEX = /\s/;

export const normalizeSearchKeyword = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const normalizeComparableText = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "");

const getCompactHangulFallbackQueries = (keyword: string) => {
  const compactKeyword = normalizeComparableText(keyword);

  if (
    SPACE_REGEX.test(keyword) ||
    !HANGUL_REGEX.test(compactKeyword) ||
    compactKeyword.length < 4
  ) {
    return [];
  }

  return [4, 3, 2]
    .filter((length) => length < compactKeyword.length)
    .map((length) => compactKeyword.slice(0, length));
};

const getSearchQueries = (keyword: string) => {
  const compactKeyword = normalizeComparableText(keyword);

  return Array.from(
    new Set([
      keyword,
      compactKeyword,
      ...getCompactHangulFallbackQueries(keyword),
    ]),
  ).filter(Boolean);
};

const getDateString = (date: Date) => date.toISOString().slice(0, 10);

const getPastDateString = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return getDateString(date);
};

const hasReleaseDate = (movie: MovieType) => Boolean(movie.release_date);

const matchesKeyword = (movie: MovieType, keyword: string) => {
  const comparableKeyword = normalizeComparableText(keyword);

  return [movie.title, movie.original_title].some((title) =>
    normalizeComparableText(title).includes(comparableKeyword),
  );
};

const sortByPopularity = (movies: MovieType[]) =>
  [...movies].sort((a, b) => b.popularity - a.popularity);

const sortByRating = (movies: MovieType[]) =>
  [...movies].sort(
    (a, b) =>
      b.vote_average - a.vote_average ||
      b.vote_count - a.vote_count ||
      b.popularity - a.popularity,
  );

const applyCategoryToSearchResults = (
  movies: MovieType[],
  category: MovieCategoryKey,
) => {
  const today = getDateString(new Date());
  const nowPlayingStartDate = getPastDateString(NOW_PLAYING_WINDOW_DAYS);

  if (category === "upcoming") {
    return movies
      .filter((movie) => hasReleaseDate(movie) && movie.release_date > today)
      .sort((a, b) => a.release_date.localeCompare(b.release_date));
  }

  if (category === "now_playing") {
    return sortByPopularity(
      movies.filter(
        (movie) =>
          hasReleaseDate(movie) &&
          movie.release_date <= today &&
          movie.release_date >= nowPlayingStartDate,
      ),
    );
  }

  if (category === "top_rated") {
    return sortByRating(movies);
  }

  return sortByPopularity(movies);
};

const mergeMoviesById = (movies: MovieType[]) => {
  const movieMap = new Map<number, MovieType>();

  movies.forEach((movie) => {
    movieMap.set(movie.id, movie);
  });

  return Array.from(movieMap.values());
};

const fetchSearchResults = async (
  query: string,
  page: number,
  signal: AbortSignal,
) => {
  const searchParams = new URLSearchParams({
    query,
    page: String(page),
  });

  const { data } = await axiosInstance.get<MoviePageResponse>(
    `https://api.themoviedb.org/3/search/movie?${searchParams.toString()}`,
    { signal },
  );

  return data;
};

export const fetchSearchMoviePage = async ({
  category,
  keyword,
  page,
  signal,
}: FetchSearchMoviePageParams): Promise<MoviePageResponse> => {
  const searchPages = await Promise.all(
    getSearchQueries(keyword).map((query) =>
      fetchSearchResults(query, page, signal),
    ),
  );

  const movies = mergeMoviesById(searchPages.flatMap(({ results }) => results));
  const matchedMovies = movies.filter((movie) => matchesKeyword(movie, keyword));

  return {
    results: applyCategoryToSearchResults(matchedMovies, category),
    total_pages: Math.max(...searchPages.map(({ total_pages }) => total_pages)),
  };
};
