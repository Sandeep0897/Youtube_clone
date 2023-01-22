import React,{useState} from "react";
import styled from "styled-components";
import Upload from "./Upload";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 4rem;

`;

const Wrap = styled.div`
  min-width: 900px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 0px 25px;
`;

const SearchBar = styled.div`
  width: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin:  auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 2px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserDiv = styled.div`
display:flex;
align-items:center;
gap:10px;
font-weight:500;
color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
width:32px;
height:32px;
border-radius:50%;
background-color: #999;
`;


function Nav({ dark }) {
  
const User = useSelector((state)=>state.user.currentUser);
const [open,setOpen]=useState(false);
const [query,setQuery]=useState("");
const navigate = useNavigate();

const handlePopup = ()=>{
  setOpen(true);
}

const setHidden = () => {
   
  if (document.body.style.overflow !== "hidden") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
};

const handleSearch = (event)=>{
  setQuery(event.target.value);
  
}

  return (
    <>
    <Container>
      <Wrap>
        <SearchBar>
          <Input placeholder="Search.." onChange={handleSearch}/>
          <SearchOutlinedIcon style={{ color: dark ? "white" : "black" , cursor:"pointer"}} onClick={()=>navigate(`/search?q=${query}`)}/>
        </SearchBar>
        {User ? <UserDiv>
         <VideoCallOutlinedIcon style={{cursor:"pointer"}} onClick={()=>{handlePopup();setHidden();}}/>
         <Avatar src = {User.img}/>
          {User.name}
          </UserDiv>
         :<Link to="/login" style={{textDecoration:"none"}}>
          <Button>
            <AccountCircleOutlinedIcon />
            LOGIN
          </Button>
        </Link>}
      </Wrap>
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  );
}

export default Nav;
