import React,{useState,useEffect} from "react";
import styled from "styled-components";
import moment from 'moment';
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
width: ${(props) => props.size === "sm" ? "fit-content" : "295px"};
  margin-bottom: ${(props) => props.size === "sm" ? "10px" : "45px"};
  cursor: pointer;
  display:${(props)=>props.size ==="sm" && "flex"};
  gap:10px;
  
`;

const Image = styled.img`
  width: 100%;
  height:${(props)=>props.size === "sm" ? "100px" : "202px"};
  background-color: #999;
  flex: 1;
  
`;
const Details = styled.div`
margin-top: ${(props) => props.size !== "sm" && "16px"};
display:flex;
gap: 12px;
flex:1;

`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display:${(props)=>props.size==="sm" && "none"}
`;

const ChannelDetails = styled.div`

`;

const ChannelTitle = styled.h1`
 font-size:${(props)=>props.size === "sm" ? "12px" : "16px"};
font-weight: 500;
color: ${({ theme }) => theme.text};
`;

const ChannelOwner = styled.h2`
  font-size: 14px;
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};
`;

const ChannelInfo = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

function VideoCard({size,video}) {
  
  const[channel,setChannel]=useState("");
  
  
  useEffect(()=>{
    const fetchChannel = async ()=>{
     const URL = `http://localhost:5000/api/user/find/${video.userId}`;
     await axios.get(URL,{withCredentials: true})
                .then((res)=>setChannel(res.data))
                .catch((err)=>console.log(err));
    };
    fetchChannel();
  },[video.userId])
  
  const dateTimeAgo = moment(new Date(video.createdAt)).fromNow();
  
  
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container size={size}>
      <Image size={size}  src={video.imgUrl} />
      <Details size={size}>
        <ChannelImage size={size} src={channel.img}/>
        <ChannelDetails>
          <ChannelTitle size={size}>{video.title}</ChannelTitle>
          <ChannelOwner>{channel.name}</ChannelOwner>
          <ChannelInfo>{video.views} views • {dateTimeAgo}</ChannelInfo>
        </ChannelDetails>
      </Details>
    </Container>
    </Link>
  );
}

export default VideoCard;
