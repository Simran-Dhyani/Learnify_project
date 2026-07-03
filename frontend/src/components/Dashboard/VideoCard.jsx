import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function VideoCard({ video }) {

  return (
    <Link 
   to={`/watch/${video.id.videoId}`}
    state={{
    videoTitle: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    }}
     >

    <motion.div

      whileHover={{
        y: -6,
      }}

      className="
        group
        cursor-pointer
       
      "
    >

      {/* Thumbnail */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-white/60
          backdrop-blur-xl
          border
          border-white/30
          shadow-lg
           hover:shadow-purple-500
        "
      >

        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="
            w-full
            h-52
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />

        {/* Duration */}

        <div
          className="
            absolute
            bottom-3
            right-3
            px-2
            py-1
            rounded-lg
            bg-black/70
            text-white
            text-xs
          "
        >

          {"10.00"}

        </div>

      </div>

      {/* Text */}

      <div className="mt-4 px-1">

        <h3
          className="
            text-lg
            font-semibold
            text-white
            line-clamp-2
          "
        >

          {video.snippet.title}

        </h3>

        <p className="mt-2 text-sm text-gray-500">

          {video.snippet.channelTitle}

        </p>

      </div>

    </motion.div>
    </Link>

  );
}

export default VideoCard;