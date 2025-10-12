import { useParams, useNavigate } from "react-router-dom";
import { ApiMovi } from "../../Url-Link/ApiMovi";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Play = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [locked, setLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to watch the video");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`${ApiMovi}/${id}`)
      .then((res) => {
        setVideoUrl(res.data.videoUrl);
      })
      .catch((err) => console.error("Error fetching video:", err));
  }, [id]);

  const handleDoubleClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === "Space" && videoRef.current && !locked) {
        e.preventDefault();
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [locked]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white">
      {videoUrl ? (
        <div
          className="relative w-full max-w-5xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDoubleClick={handleDoubleClick}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            controls={!locked}
            className="w-full h-[70vh] rounded-lg"
            autoPlay
          />

          {isHovered && (
            <button
              onClick={() => setLocked(!locked)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 px-3 py-2 rounded-full text-lg"
            >
              {locked ? "🔒" : "🔓"}
            </button>
          )}
        </div>
      ) : (
        <p className="mt-4 text-gray-400">Loading video...</p>
      )}
    </div>
  );
};

export default Play;
