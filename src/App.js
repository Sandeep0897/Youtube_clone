import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector} from 'react-redux'
import Nav from "./components/Nav";
import SideMenu from "./components/SideMenu";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Video from "./Pages/Video";
import Search from "./Pages/Search";

const Container = styled.div`
  display: flex;
 
 
`;
//maincontainer includes navbar and cards(videos)
const MainContainer = styled.div`
  flex: 9;
  background-color: ${({ theme }) => theme.bg};
`;
//wrap includes only cards
const Wrap = styled.div`
 padding: 22px 95px;
`;

function App() {
 
  // const [dark, setDark] = useState(false);

  // const handleMode = () => {
  //   setDark(!dark);
  // };

   const dark = useSelector((state)=>state.dark.dark);


  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <SideMenu />
          <MainContainer>
            <Nav dark={dark} />
            <Wrap>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend"/>}/>
                  <Route path="subscriptions" element={<Home type="sub"/>}/>
                  <Route path="search" element={<Search />}/>
                  <Route path="login" element={<Login />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrap>
          </MainContainer>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
