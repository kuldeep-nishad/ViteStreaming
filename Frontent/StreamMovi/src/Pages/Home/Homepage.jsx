



import { useEffect, useState } from "react";
import axios from "axios";
import CategorySection from "./CategorySection";
import { ApiMovi } from "../../Url-Link/ApiMovi";
import { Footer } from "../../Footer/FooterComp";

export const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const resp = await axios.get(ApiMovi);
        setMovies(resp.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const categories = [...new Set(movies.map((m) => m.category))];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="p-6 overflow-y-hidden">
        {categories.map((cat) => (
          <CategorySection
            key={cat}
            category={cat}
            movies={movies.filter((m) => m.category === cat)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};


