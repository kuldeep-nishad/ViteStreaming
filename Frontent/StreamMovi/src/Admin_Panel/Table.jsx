import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "./ApiService";
import EditMovie from "./Edit";
import CreateMovie from "./Create";

export const Table = () => {
  const [movies, setMovies] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(id);
      fetchMovies();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Movie Admin Panel</h2>

      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => setShowCreate(true)}
      >
        + Create Movie
      </button>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto border border-gray-300 rounded shadow">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Release Date</th>
              <th className="border px-3 py-2">Runtime</th>
              <th className="border px-3 py-2">Rating</th>
              <th className="border px-3 py-2">Age</th>
              <th className="border px-3 py-2">Summary</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Poster</th>
              <th className="border px-3 py-2">Video</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className=" text-center">
            {movies.map((movie) => (
              <tr key={movie.movieID} className="hover:bg-gray-50">
                <td className="border px-2 py-1 text-center">{movie.movieID}</td>
                <td className="border px-2 py-1">{movie.title}</td>
                <td className="border px-2 py-1">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{movie.runtime}</td>
                <td className="border px-2 py-1">{movie.rating}</td>
                <td className="border px-2 py-1">{movie.ageRecommendation}</td>
                <td className="border px-2 py-1 max-w-xs truncate">{movie.movieSummary}</td>
                <td className="border px-2 py-1">{movie.category}</td>
                <td className="border px-2 py-1 text-center">
                  <img src={movie.posterUrl} alt={movie.title} className="w-16 h-auto rounded" />
                </td>
                <td className="border px-2 py-1 text-center">
                  <a href={movie.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Play
                  </a>
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded mr-2 hover:bg-blue-700 transition"
                    onClick={() => setEditId(movie.movieID)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(movie.movieID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Movie Modal */}
      {editId && <EditMovie id={editId} onClose={() => { setEditId(null); fetchMovies(); }} />}

      {/* Create Movie Modal */}
      {showCreate && <CreateMovie onClose={() => { setShowCreate(false); fetchMovies(); }} />}
    </div>
  );
};
