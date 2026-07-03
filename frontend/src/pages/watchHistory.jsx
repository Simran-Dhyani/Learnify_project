import { useEffect, useState } from "react";
import authService from "@/services/authService";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function WatchHistory() {
  const [history, setHistory] = useState([]);

 useEffect(() => {
    const fetchHistory = async () => {
        try {
            const data = await authService.getWatchHistory();
            console.log(data);
            setHistory(data || []);
        } catch (err) {
            console.log(err);
        }
    };

    fetchHistory();
}, []);
  return (
    <div className=" bg-gradient-to-br from-slate-900 via-slate-950 to-gray-950">
    <div className="max-w-5xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-8">
        Watch History
      </h1>

      {history.map((video) => (
         <Link
    key={video._id}
    to={`/watch/${video.videoId}`}
    state={{
      videoTitle: video.videoTitle,
      thumbnail: video.thumbnail,
    }}
  >
        <div className="flex gap-4 mb-6 border rounded-lg p-4 hover:bg-slate-800  cursor-pointer hover:shadow-md hover:shadow-purple-500  transition-all duration-300">
      <img
        src={video.thumbnail}
        className="w-52 rounded-lg"
        alt={video.videoTitle}
      />

      <div>
        <h2 className="font-semibold text-xl">
          {video.videoTitle}
        </h2>
      </div>
    </div>
  </Link>
))}
    </div>
    </div>
  );
}

export default WatchHistory;