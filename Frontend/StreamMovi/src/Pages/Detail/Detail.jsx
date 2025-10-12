

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApiMovi } from "../../Url-Link/ApiMovi";
import { ApiReview } from "../../Url-Link/ApiReview"; 
import { Footer } from "../../Footer/FooterComp";
import { MovieCard } from "../Home/Moviecard";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "../../Helper/Helper-to-UseraccuntId"; // your context

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ✅ get user from context
  const userAccountId = user?.userAccountId; // safely access

  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingText, setEditingText] = useState("");



  useEffect(() => {
    axios.get(`${ApiMovi}/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error("Movie fetch error:", err));

    axios.get(ApiMovi)
      .then(res => setMovies(res.data.slice(0, 10)))
      .catch(err => console.error("Movies fetch error:", err));

    fetchReviews();
  }, [id]);

  

  const fetchReviews = () => {
    axios.get(`${ApiReview}/movie/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Reviews fetch error:", err));
  };

  const handleAddReview = () => {
  if (!userAccountId) {
    alert("Please login to add a review");
    navigate("/login");
    return;
  }

  if (!newReview.trim()) {
    alert("Please enter a review");
    return;
  }

  const payload = {
    movieId: parseInt(id),
    userAccountId: userAccountId, // ✅ keep string
    reviewText: newReview.trim()
  };

  console.log("Submitting review:", payload);

  axios.post(`${ApiReview}/add`, payload, {
  headers: { "Content-Type": "application/json" },
})
    .then(() => {
      setNewReview(""); 
      fetchReviews(); 
    })
    .catch(err => {
      console.error("Review submit error:", err.response?.data || err);
      alert("Failed to submit review: " + (err.response?.data?.title || err.message));
    });
};

  const handleEditReview = (review) => {
    setEditingReviewId(review.reviewId);
    setEditingText(review.reviewText);
  };

  const handleUpdateReview = () => {
    axios.put(`${ApiReview}/update/${editingReviewId}`, {
  UserAccountId: userAccountId,
  ReviewText: editingText
    })
    .then(() => {
      setEditingReviewId(null);
      setEditingText("");
      fetchReviews();
    })
    .catch(err => alert("Failed to update review: " + err.message));
  };
console.log("UserAccountId:", user.userAccountId, typeof user.userAccountId);

  const handleDeleteReview = (reviewId) => {
    if(!window.confirm("Are you sure you want to delete this review?")) return;

    axios.delete(`${ApiReview}/delete/${reviewId}`, { params: { userAccountId } })
      .then(() => fetchReviews())
      .catch(err => alert("Failed to delete review: " + err.message));
  };

  if (!movie) return <p className="p-6 text-white text-xl">Loading...</p>;

  const runtimeMinutes = parseInt(movie.runtime) || 0;
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;
  const formattedRuntime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950 text-white">
      <div className="flex-1 overflow-auto pt-24 px-6 md:px-16">

        {/* Movie Details */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative rounded-xl w-[50%] overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={movie.posterUrl} alt={movie.title} className="w-full max-h-[800px] object-cover rounded-xl" />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">{movie.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg md:text-xl">
              <p><span className="font-semibold">⭐ Rating:</span> {movie.rating}</p>
              <p><span className="font-semibold">⏱ Duration:</span> {formattedRuntime}</p>
            </div>

            <button
              onClick={() => {
                if (userAccountId) navigate(`/play/${id}`);
                else { alert("Please login or signup first"); navigate("/login"); }
              }}
              className="mt-6 w-fit px-10 md:px-12 py-4 text-xl font-bold rounded-xl 
                         bg-gradient-to-r from-red-500 via-pink-500 to-purple-600
                         hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              🎬 Watch Now
            </button>

            <div className="mt-6 bg-gray-900/70 p-6 rounded-xl backdrop-blur-sm shadow-inner space-y-4">
              <p><span className="font-semibold">📅 Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">🔞 Age:</span> {movie.ageRecommendation}</p>
              <p><span className="font-semibold">📝 Summary:</span> {movie.movieSummary}</p>
              <p><span className="font-semibold">🏷 Keywords:</span> {movie.keywords}</p>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-purple-500 mb-4">💬 Reviews</h2>

          {/* Add Review */}
          <div className="flex flex-col gap-3 mb-6">
            <textarea
              className="bg-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button
              onClick={handleAddReview}
              className="w-fit px-6 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Submit Review
            </button>
          </div>

          {/* Display Reviews */}
          <div className="bg-gray-900/50 rounded-xl p-4 max-h-96 overflow-y-auto space-y-4">
            {reviews.length === 0 && (
              <p className="text-gray-400">No reviews yet. Be the first one!</p>
            )}

            {reviews.map((r) => (
              <div key={r.reviewId} className="bg-gray-800/70 p-4 rounded-xl shadow-md relative">
                <p className="font-semibold text-yellow-300">{r.userName || r.userAccountId}</p>

                {editingReviewId === r.reviewId ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <textarea
                      className="bg-gray-700 rounded-lg p-2 resize-none"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button 
                      onClick={handleUpdateReview} 
                      className="px-4 py-1 bg-green-500 rounded-xl self-start"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <p className="mt-2">{r.reviewText}</p>
                )}

                {/* Edit & Delete icons */}
                {r.userAccountId?.toString() === userAccountId && editingReviewId !== r.reviewId && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button 
                      onClick={() => handleEditReview(r)} 
                      className="text-yellow-400 hover:text-yellow-200"
                      title="Edit Review"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteReview(r.reviewId)}
                      className="text-red-500 hover:text-red-300"
                      title="Delete Review"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}

                <p className="text-sm text-gray-400 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Movies Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-purple-500 mb-6">🎞 You Might Also Like</h2>
          <div className="flex overflow-x-auto overflow-y-hidden space-x-4 snap-x snap-mandatory scrollbar-hide pb-6">
            {movies.map(m => (
              <div key={m.movieID} className="snap-start flex-shrink-0">
                <MovieCard id={m.movieID} title={m.title} posterUrl={m.posterUrl} summary={m.movieSummary} />
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Detail;
