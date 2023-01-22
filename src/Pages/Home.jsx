import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoCard from "../components/VideoCard";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width: 900px;
`;

function Home({ type }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
     
      await axios
        .get(`http://localhost:5000/api/video/${type}`,{withCredentials: true})
        .then((res) => setVideos(res.data))
        .catch((error) => console.log(error));
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => {
        return <VideoCard key={video._id} video={video} />;
      })}
    </Container>
  );
}

export default Home;
