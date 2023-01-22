import React, { useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Recommendation from "../components/Recommendation";
import axios from "axios";
import moment from "moment";
import { subscribe, unsubscribe } from "../redux/userSlice";
import {
  videoRequest,
  videoSuccess,
  videoFailure,
  videoLike,
  videoDislike,
} from "../redux/videoSlice";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";

const Container = styled.div`
  display: flex;
  gap: 18px;
`;

const Content = styled.div`
  flex: 7;
`;



const VideoWrap = styled.div`
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoViews = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.textSoft};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 25px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const ChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelDetails = styled.div`
  display: flex;
  gap: 20px;
`;
const ChannelText = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:disabled {
    background-color: #cc1a00;
    cursor: not-allowed;
  }


`;
const ChannelImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const ChannelTitle = styled.span`
  font-weight: 500;
`;
const ChannelSubs = styled.span`
  margin-top: 6px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const ChannelDescr = styled.p`
  font-size: 14px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  z-index:1;
`;

function Video() {
  const [channel, setChannel] = useState("");
  const [isVideoWatchedFully, setIsVideoWatchedFully] = useState(false);
  const dispatch = useDispatch();
  const Video = useSelector((state) => state.video.currentVideo);
  const User = useSelector((state) => state.user.currentUser);
  const userid = useLocation().pathname.split("/")[2];
  const days = moment(Video?.createdAt).format("MMM DD, YYYY");
  const VideoRef = useRef(null);
 
  

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(videoRequest());
      try {
        const videoRes = await axios.get(
          `http://localhost:5000/api/video/find/${userid}`,
          { withCredentials: true }
        );
        const channelRes = await axios.get(
          `http://localhost:5000/api/user/find/${videoRes.data.userId}`,
          { withCredentials: true }
        );
        dispatch(videoSuccess(videoRes.data));
        setChannel(channelRes.data);
      } catch (error) {
        console.log(error);
        dispatch(videoFailure());
      }
    };
    fetchVideos();
  }, [userid, dispatch]);

  const handleLike = async () => {
    axios.defaults.withCredentials = true;
    await axios.put(`http://localhost:5000/api/user/like/${Video._id}`, {
      withCredentials: true,
    });
    dispatch(videoLike(User._id));
  };

  const handleDislike = async () => {
    axios.defaults.withCredentials = true;
    await axios.put(`http://localhost:5000/api/user/dislike/${Video._id}`, {
      withCredentials: true,
    });
    dispatch(videoDislike(User._id));
  };

  const handleSub = async () => {
    axios.defaults.withCredentials = true;
    if (User?.subscribedUsers?.includes(channel._id)) {
      await axios.put(`http://localhost:5000/api/user/unsub/${Video.userId}`, {
        withCredentials: true,
      });
      dispatch(unsubscribe(Video.userId));
    } else {
      await axios.put(`http://localhost:5000/api/user/sub/${Video.userId}`, {
        withCredentials: true,
      });
      dispatch(subscribe(Video.userId));
    }
  };

  const handleTimeUpdate = () => {
    if (VideoRef.current && VideoRef.current.currentTime === VideoRef.current.duration) {
        setIsVideoWatchedFully(true);
    }
}

useEffect(()=>{
  if(isVideoWatchedFully){
    const handleViews = async ()=>{
      axios.defaults.withCredentials = true;
     await axios.put(`http://localhost:5000/api/video/view/${Video._id}`,{withCredentials: true});
     
    }
    handleViews();
  }

},[isVideoWatchedFully,Video._id])

  

  return (
    <Container>
      <Content>
        <VideoWrap >
        <VideoFrame src={Video?.videoUrl} controls ref={VideoRef} onTimeUpdate={handleTimeUpdate}/>
        </VideoWrap>
        <Title>{Video?.title}</Title>
        <Details>
          <InfoViews>
            {Video?.views} views • {days}
          </InfoViews>
          <ButtonContainer>
            <Button onClick={handleLike}>
              {Video?.likes?.includes(User?._id) ? (
                <ThumbUpRoundedIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {Video?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {Video?.dislikes?.includes(User?._id) ? (
                <ThumbDownAltRoundedIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon />
              Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon />
              Save
            </Button>
          </ButtonContainer>
        </Details>
        <Hr />
        <ChannelContainer>
          <ChannelDetails>
            <ChannelImage src={channel?.img} />
            <ChannelText>
              <ChannelTitle>{channel?.name}</ChannelTitle>
              <ChannelSubs>{channel?.subscribers} subscribers</ChannelSubs>
              <ChannelDescr>{Video?.desc}</ChannelDescr>
            </ChannelText>
          </ChannelDetails>
          {User?._id === Video.userId ? <Subscribe disabled>Subscribed</Subscribe>:<Subscribe
            onClick={handleSub}
            style={{
              backgroundColor: User?.subscribedUsers?.includes(Video?.userId)
                ? "green"
                : "#cc1a00",
            }}
          >
            {User?.subscribedUsers?.includes(Video?.userId) 
              ? "Subscribed"
              : "Subscribe"}{" "}
             
          </Subscribe>}
          
          
        </ChannelContainer>
        <Hr />
        <Comments videoId = {Video?._id}/>
      </Content>
      
     <Recommendation tags = {Video?.tags}/>
    </Container>
  );
}

export default Video;
