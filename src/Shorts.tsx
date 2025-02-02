import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

import './Shorts.css'


const YoutubeAPIKey = import.meta.env.VITE_YOUTUBE_API_KEY

const fetchYouTubeData = async ({ endpoint, params }) => {
  try {
    const baseURL = "https://www.googleapis.com/youtube/v3";
    const url = `${baseURL}/${endpoint}`;
    
    const response = await axios.get(url, {
      params: { key: YoutubeAPIKey, ...params },
    });

    return response.data;
  } catch (error) {
    console.error("YouTube API Error:", error);
    return null;
  }
};

const fetchShorts = async (pageToken = "") => {
  return fetchYouTubeData({
    endpoint: "search",
    params: {
      part: "snippet",
      q: "financial scam",
      type: "video",
      videoDuration: "short",
      maxResults: 10,
      pageToken: pageToken
    },
  });
};


const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadShorts();
  }, []);

  const loadShorts = async () => {
    const data = await fetchShorts(pageToken);
    setVideos((prev) => [...prev, ...data.items]);

    setPageToken(data.nextPageToken || "");
    setHasMore(!!data.nextPageToken);
  };

  return (
    <div className="phone-frame">
      <div className="phone-notch"></div>
      <div className="shorts-container">
        <InfiniteScroll dataLength={videos.length} next={loadShorts} hasMore={hasMore}>
          {videos.map((video, index) => (
            <ShortsVideo key={index} video={video.snippet} videoId={video.id.videoId} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const ShortsVideo = ({ video, videoId }) => {
  return (
    <motion.div 
      className="shorts-video" 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
    >

      <img 
        className="video-background" 
        src={video.thumbnails.high.url} 
        alt="Blurred background" 
      />

      {videoId ? (
        <iframe
          className="video-frame"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&controls=0`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Video unavailable</p>
      )}

      <div className="video-overlay">
        <h3>{video.title}</h3>
        <p>{video.channelTitle}</p>
        <div className="video-actions">
          <button className="action-button"><FaHeart /></button>
          <button className="action-button"><FaComment /></button>
          <button className="action-button"><FaShare /></button>
        </div>
      </div>
    </motion.div>
  );
};



export default Shorts;


