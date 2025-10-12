import { useEffect, useState } from "react";
import { getMovieById, updateMovie } from "./ApiService";

const EditMovie = ({ id, onClose }) => {
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(id);
      setForm(data);
    };
    fetchMovie();
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovie(id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto p-4">
      <form
        className="bg-white p-6 rounded w-full max-w-3xl max-h-[90vh] overflow-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
        {Object.keys(form).map((key) => (
          <div key={key} className="mb-3">
            <label className="block font-semibold mb-1">{key}</label>
            <input
              type="text"
              name={key}
              value={form[key] || ""}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              required
            />
          </div>
        ))}
        <div className="flex justify-end mt-6 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
