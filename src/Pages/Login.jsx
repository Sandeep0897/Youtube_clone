import React, { useState } from "react";
import validator from 'validator';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  
} from "../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import {auth,provider} from "../firebase";
import {signInWithPopup} from "firebase/auth";

const Container = styled.div`
  ${"" /* min-width:1024px; */}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 2rem);
  color: ${({ theme }) => theme.text};
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  min-width: 35%;
  height: 100%;
  gap: 10px;
`;

const Title = styled.h1`
  margin-top: 10px;
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 5px;
  background-color: transparent;
  width: 80%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  justify-content: space-between;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;


function Login() {
  const [name, setname] = useState("");
  // eslint-disable-next-line
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (inputText) => {
    setname(validator.trim(inputText))
}


  
  const handleClick = async (event) => {
    event.preventDefault();
    dispatch(loginRequest());
    try {
      const URL = "http://localhost:5000/api/auth/signin";
      const res = await axios.post(URL, { name, password },{withCredentials: true});
      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle  = async ()=>{
    dispatch(loginRequest());
    await  signInWithPopup(auth,provider)
                   .then((result)=>{
                    axios.post("http://localhost:5000/api/auth/google",{
                      name:result.user.displayName,
                      email:result.user.email,
                      img:result.user.photoURL
                    },{withCredentials: true}).then((res)=>{
                      dispatch(loginSuccess(res.data));
                      navigate('/');
                    }).catch((err)=>{
                      console.log(err);
                      dispatch(loginFailure());
                    })
                    
                   })
  };

  return (
    <Container>
      <Wrap>
        <Title>Sign in</Title>
        <SubTitle>to continue to Youtube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => {
            validate(e.target.value);
          }}
          value={name}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
        />
        <Button onClick={handleClick}>Sign in</Button>
        <Title>OR</Title>
         <Button onClick={signInWithGoogle }>Sign in with google</Button>
        <Title>OR</Title>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button>Sign up</Button>
      </Wrap>
      <More>
        English(UK)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default Login;
