import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width:100%;
height:100%;
position:absolute;
bottom:0;
right:0;
background-color: #000000a7;
display:flex;
align-items:center;
justify-content:center;
`;



const Wrapper = styled.div`
height:600px;
width:500px;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
padding:15px;
display:flex;
flex-direction:column;
gap:15px;
position:relative;
z-index: 999;
`;

const Close = styled.div`
cursor:pointer;
position:absolute;
right:15px;
top:15px;
`;

const Title = styled.h1`
 text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius:5px;
  padding:5px;
  background-color: transparent;

`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius:5px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
font-size:12px;
`;





function Upload({setOpen}) {

const [video,setVideo]=useState(null);
const [img,setImg]=useState(null);
const [videoPer,setVideoPer]=useState(0);
const [imgPer,setimgper]=useState(0);
const [inputs,setInputs]=useState({
  title:"",
  desc:"",
 
});
const [tags,setTags]=useState([]);
const navigate = useNavigate();


const handleTag = (e)=>{
    setTags(e.target.value.split(','));
}

const handleInput = (e)=>{
    setInputs((prevState)=>{
        return {
            ...prevState,
            [e.target.name]:e.target.value
        };
    });
};

const removePopup = ()=>{
    setOpen(false)}

const setHidden = () => {
   if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };


const uploadFile = (file,urlType)=>{
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "videoUrl" ? setVideoPer(Math.round(progress)) : setimgper(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
    }
  }, 
  (error) =>{console.log(error)},
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       setInputs((prevState)=>{
        return {
         ...prevState,
         [urlType]:downloadURL
        }
       })
    });
  }
);

}

useEffect(()=>{
  video && uploadFile(video,"videoUrl");
 },[video]);

 useEffect(()=>{
  img && uploadFile(img,"imgUrl");
 },[img]);

 const handleUpload = async (e)=>{
  try{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const res = await axios.post("http://localhost:5000/api/video",{...inputs,tags},
    {withCredentials: true});
    setOpen(false);
    navigate(`/video/${res.data._id}`);
    document.body.style.overflow = "scroll";
  }catch(error){
    console.log(error);
  }

 }


  return (
    <Container>
    <Wrapper>
       <Close onClick={()=>{removePopup();setHidden()}}>X</Close> 
       <Title>Upload a Video</Title>
       <Label>Video:</Label>
       {videoPer > 0 ? ("Uploading Video: " + videoPer ) : (
       <Input type="file" accept="video/*" name={video} onChange={(e)=>setVideo(e.target.files[0])}/>)}
       <Input type="text" placeholder='Title' name="title" value={inputs.title} onChange={handleInput}/>
       <Desc placeholder="Description" rows={5} name="desc" value={inputs.desc} onChange={handleInput}/>
        <Input type="text" placeholder='Separate the tags with commas.' name="tags" value={tags} onChange={handleTag}/>
        <Label>Image:</Label>
        {imgPer > 0 ? ("Uploading Image: " + imgPer) : (
        <Input type="file" accept="image/*" name={img} onChange={(e)=>setImg(e.target.files[0])}/>)}
        <Button onClick={handleUpload}>Upload</Button>
    </Wrapper>
    </Container>
  )
}

export default Upload;