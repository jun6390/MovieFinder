import MovieError from "./MovieError";
import MovieListItem from "./MovieListItem";
import MovieLoader from "./MovieLoader";

type MovieListProps = {
  title: string;
  movies: MovieType[];
  loading: boolean;
  error: Error | null;
};

export default function MovieList({
  title,
  movies,
  loading,
  error,
}: MovieListProps) {
  return (
    <article className="bg-black px-4 pt-4 xs:px-0">
      <div id="movie-list-top" className="scroll-mt-24" />
      <section className="container mx-auto py-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-yellow-600">온라인 스트리밍</span>
            <h2 className="text-[36px] font-bold">{title}</h2>
          </div>
        </div>

        <div className="mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:px-0">
          {loading ? (
            <MovieLoader />
          ) : movies.length === 0 ? (
            <p className="col-span-full rounded-md border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-white/70">
              검색 결과가 없습니다.
            </p>
          ) : (
            movies.map((movie) => <MovieListItem key={movie.id} {...movie} />)
          )}
        </div>
        {error && <MovieError error={error} />}
      </section>
    </article>
  );
}
