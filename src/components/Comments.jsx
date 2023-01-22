import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comment from "../components/Comment";
import axios from "axios";

const Container = styled.div`
${'' /* display:flex;
align-items: center;
justify-content:center; */}
`;

const Wrap = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  padding: 5px;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;



function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState("");
  const [postButton, setPostButton] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleButton = () => {
    setPostButton(!postButton);
    if (!user) {
      navigate("/login");
    }
  };

  const handleComment = async () => {

    axios.defaults.withCredentials = true;

    if (postComments.length !== 0) {
      try {
        const URL = "http://localhost:5000/api/comment/";
        await axios.post(
          URL,
          { videoId: videoId, desc: postComments },
          { withCredentials: true }
        );
     
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
  
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/comment/${videoId}`,
          { withCredentials: true }
        );
        setComments(res.data);
      
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [videoId]);




const reloadPage = () => {
  window.location.reload()
}


  return (
  <Container style={{}}>
   <Wrap>
      <NewComment>
        <Image src={user?.img} />

        <Input
          placeholder="Add a comment..."
          value={postComments}
          onChange={(e) => setPostComments(e.target.value)}
          onClick={handleButton}
        />

        {user && postButton && <Button onClick={()=>{handleComment();reloadPage()}}>Comment</Button>}
      </NewComment>

      {comments.map((comment) =>
        <Comment key={comment._id} comment={comment} />
      )}
      </Wrap>
    </Container>
  );
}

export default Comments;
