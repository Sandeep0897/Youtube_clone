import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from "moment";

const Container = styled.div`
display:flex;
gap:20px;
margin:20px 0px;
`;
const Image = styled.img`
width:40px;
height:40px;
border-radius:50%;
`;
const Details = styled.div`
display:flex;
flex-direction:column;
gap:6px;
color: ${({ theme }) => theme.text};
`;
const Title = styled.span`
 font-size: 14px;
font-weight: 500;
`;
const Days = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 6px;
`;
const Descr = styled.p`
 font-size: 14px;
`;


function Comment({comment}) {

  const [commentUser, setCommentUser] = useState("");
  const days = moment(comment?.createdAt).format("MMM DD, YYYY");

  useEffect(()=>{
   
    const commentOwner = async ()=>{
      axios.defaults.withCredentials = true;
      const URL = `http://localhost:5000/api/user/find/${comment.userId}`
    const res =  await axios.get(URL,{
      withCredentials: true,
    });
    setCommentUser(res.data);
    }
    commentOwner();
  },[comment.userId])



  return (
    <Container>
     <Image src={commentUser.img}/>
     <Details>
        <Title>{commentUser.name} <Days>{days}</Days></Title>
        <Descr>  
         {comment.desc}
          </Descr>
     </Details>
    </Container>
  )
}

export default Comment;