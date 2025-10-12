




import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiMovi } from "../Url-Link/ApiMovi";
import { MovieCard } from "../Pages/Home/Moviecard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`${ApiMovi}/search?title=${query}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 via-white to-purple-50 min-h-screen">
      {/* Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-80 sm:w-96 border px-4 py-2 rounded-l-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

           {/* Search results */}
      {movies.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {movies
            .filter(
              (movie, index, self) =>
                index ===
                self.findIndex(
                  (m) => m.title.toLowerCase() === movie.title.toLowerCase()
                )
            )
            .map((movie) => (
              <MovieCard
                key={movie.movieID}
                id={movie.movieID}
                title={movie.title}
                posterUrl={movie.posterUrl}
                summary={movie.movieSummary}
              />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          {query ? "No results found." : "Start typing to search movies..."}
        </p>
      )}

    </div>
  );
};

export default SearchPage;
