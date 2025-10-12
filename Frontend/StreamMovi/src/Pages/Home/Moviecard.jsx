


import { useNavigate } from "react-router-dom";

export const MovieCard = ({ id, title, posterUrl, summary }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className="w-64 h-[410px] bg-white rounded-xl shadow-md cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 m-2 p-2 flex flex-col"
      onClick={goToDetail}
    >
      <div className="h-64 overflow-hidden rounded-xl">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full  rounded-lg" // image fits nicely
        />
      </div>
<div className="p-3 flex flex-col gap-1 flex-1">
 <h3 className="text-lg font-bold line-clamp-2 font-poppins text-gray-900 leading-snug text-center">
  {title}
</h3>

  {summary && (
    <p className="text-sm line-clamp-3 font-poppins text-gray-700 leading-relaxed">
      {summary}
    </p>
  )}
</div>

    </div>
  );
};
