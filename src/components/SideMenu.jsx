import React from "react";
import styled from "styled-components";
import Youtube from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {logOut} from "../redux/userSlice";
import {toggleDarkMode} from "../redux/darkModeSlice";
import { useSelector,useDispatch} from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

const Container = styled.div`
  position: sticky;
  top: 0;
  flex: 2;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  height: 100%;
`;

const Wrap = styled.div`
  padding: 16px 24px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  padding: 5px 0px;
`;
const Image = styled.img`
  height: 30px;
  margin-bottom: 0.5rem;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  cursor: pointer;
  padding: 10px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 2px;
  font-weight: 500;
  margin-top: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const LogoTitle = styled.h2`
  font-family: "Roboto";
  font-weight: bold;
  font-size: 1.5rem;
`;

function SideMenu() {
  
  const User = useSelector((state)=>state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dark = useSelector((state)=>state.dark.dark);

  const handleLogout = ()=>{
   dispatch(logOut());
   navigate('/login');
  }

  const handleMode = ()=>{
    dispatch(toggleDarkMode());
  }
  
  return (
    <Container>
      <Wrap>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Image src={Youtube} />
            <LogoTitle>YouTube</LogoTitle> <sup>IN</sup>
          </Logo>

          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!User && <Login>
          Sign in to like videos, comment, and subscribe.
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </Login>}
        {!User &&<Hr />}
        <Title>More from Youtube</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={handleMode}>
          <SettingsBrightnessOutlinedIcon />
          {dark ? "Light" : "Dark"} Theme
        </Item>
       {User && <Item onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </Item>}
      </Wrap>
    </Container>
  );
}

export default SideMenu;
