import { useContext, useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

import { UserContext } from "./contexts/UserContext";
import askLLM from "./AskLLM"
import { storeUserKey, cleanSearchQuery } from './common'

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

const fetchShorts = async (pageToken = "", queryStr) => {
  console.log("Final query: ", cleanSearchQuery(queryStr))
  return fetchYouTubeData({
    endpoint: "search",
    params: {
      part: "snippet",
      q: cleanSearchQuery(queryStr) || "financial scam",
      type: "video",
      videoDuration: "short",
      maxResults: 1,
      pageToken: pageToken
    },
  });
};


const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const {count, resetCount} = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      if (count === 1) {
        const userStr = localStorage.getItem(storeUserKey);
        if (userStr !== null) {
          try {
            const response = await askLLM(JSON.parse(userStr));
            console.log("LLM response: ", response);
            loadShorts(response.join(" "));
          } catch (error) {
            console.error("Error calling askLLM: ", error);
          }
        }
        resetCount();
      } else {
        loadShorts(null);
      }
    };
  
    fetchData(); // Call the async function
  }, [count]);
  

  const loadShorts = async (queryStr) => {
    const data = await fetchShorts(pageToken, queryStr);

    if (!data || !data.items) {
      return
    }

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
          {/* <button className="action-button"><FaComment /></button>
          <button className="action-button"><FaShare /></button> */}
        </div>
      </div>
    </motion.div>
  );
};



export default Shorts;


