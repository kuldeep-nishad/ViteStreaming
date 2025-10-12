
import { MovieCard } from "./Moviecard";

const CategorySection = ({ category, movies }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 px-4 text-purple-700">{category}</h2>

      <div className="flex overflow-x-auto overflow-y-hidden space-x-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.movieID} className="snap-start flex-shrink-0">
            <MovieCard
              id={movie.movieID}
              title={movie.title}
              posterUrl={movie.posterUrl}
              summary={movie.movieSummary}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
