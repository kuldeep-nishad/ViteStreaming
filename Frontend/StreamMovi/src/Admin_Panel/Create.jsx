import { useState } from "react";
import { createMovie } from "./ApiService";

const initialState = {
  title: "",
  releaseDate: "",
  runtime: "",
  rating: "",
  ageRecommendation: "",
  movieSummary: "",
  keywords: "",
  posterUrl: "",
  videoUrl: "",
  category: "",
};

const CreateMovie = ({ onClose }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Map camelCase → PascalCase before sending
  const mapToPascalCase = (form) => ({
    Title: form.title,
    ReleaseDate: form.releaseDate,
    Runtime: form.runtime,
    Rating: form.rating,
    AgeRecommendation: form.ageRecommendation,
    MovieSummary: form.movieSummary,
    Keywords: form.keywords,
    PosterUrl: form.posterUrl,
    VideoUrl: form.videoUrl,
    Category: form.category
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = mapToPascalCase(form); // ✅ fix here
    await createMovie(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form className="bg-white p-6 rounded w-2/3" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Create Movie</h2>
        {Object.keys(initialState).map((key) => (
          <div key={key} className="mb-2">
            <label className="block font-semibold">{key}</label>
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="border w-full p-1"
              required
            />
          </div>
        ))}
        <div className="flex justify-end mt-4 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
