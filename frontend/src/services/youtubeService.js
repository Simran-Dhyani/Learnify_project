const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchVideos = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  const data = await response.json();
  return data.items;
};

export const fetchVideoTitle = async (videoId) => {
  if (!API_KEY || !videoId) return "";

  const response = await fetch(
    `${BASE_URL}/videos?part=snippet&id=${encodeURIComponent(videoId)}&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video title");
  }

  const data = await response.json();
  return data.items?.[0]?.snippet?.title || "";
};
