import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import VideoCard from "../components/VideoCard";
import axios from "axios";

const Container = styled.div`
  flex: 3;
`;

function Recommendation({tags}) {
  
    const[videoBasedOnTags,setvideoBasedOnTags] = useState([]);

    useEffect(()=>{
        const videosFetch = async ()=>{
            const URL = `http://localhost:5000/api/video/tags?tags=${tags}`;
            axios.defaults.withCredentials = true;
            const res = await axios.get(URL,{withCredentials: true});
            setvideoBasedOnTags(res.data);
        }
        videosFetch();
    },[tags])
  
 
  
    return (
    <Container>
        {videoBasedOnTags.map((videoTag)=>{
          return   <VideoCard key={videoTag._id} size="sm" video={videoTag}/>
        })}
    </Container>
  )
}

export default Recommendation;