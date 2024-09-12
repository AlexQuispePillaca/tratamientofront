import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MyRoutes } from "./routes/routes"
import styled from 'styled-components'
import { BrowserRouter } from "react-router-dom"
import {Sidebar} from "./components/Sidebar";
import { Light, Dark } from "./styles/Theme"
import { ThemeProvider } from "styled-components"

export const ThemeContext = React.createContext(null);


function App() {
  const [theme, setTheme] = useState("ligth");
  const themeStyle = theme == "ligth" ?
    Light : Dark;
  const cambiarTheme = () => {
    setTheme((theme) => (theme === "ligth" ? "dark" : "ligth"))
  };
  const [sidebarOpen, setsideBarOpen] = useState(true);

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container className={sidebarOpen ? "sidebarState active" : ""}>
              <Sidebar sidebarOpen={sidebarOpen} setsideBarOpen={setsideBarOpen}/>
                
              <MyRoutes />
                         
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}

const Container = styled.div`

display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s ;
  &.active {
    grid-template-columns: 300px auto;
  }
  color:${({theme})=>theme.text};

`;
export default App;
