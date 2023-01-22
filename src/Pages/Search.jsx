import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const Container = styled.div`
display:flex;
flex-wrap:wrap;
gap:10px;
`;



function Search() {

const [searchVideos,setSearchVideos]=useState([]);
const query = useLocation().search
console.log(query)

useEffect(()=>{
    const fetchSearchVideos = async ()=>{
        axios.defaults.withCredentials = true;
        const URL = `http://localhost:5000/api/video/search${query}`;
        const res = await axios.get(URL,{withCredentials: true});
        setSearchVideos(res.data);
        
    }
    fetchSearchVideos();
},[query]);


    return (
    <Container>
    {searchVideos.map((video)=>{
        return <VideoCard key={video._id} video = {video}/>
    })}
    </Container>
  )
}

export default Search;