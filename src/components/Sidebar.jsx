import styled from "styled-components";
import logo from "../assets/react.svg"
import { v } from "../styles/Variables"
import {AiOutlineLeft} from "react-icons/ai";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaHouseMedicalCircleCheck } from "react-icons/fa6";
import { BsDatabaseFillGear } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { ThemeContext } from "../App"; 
import { NavLink,useLocation } from "react-router-dom";
import { useContext } from "react";
export function Sidebar({ sidebarOpen, setsideBarOpen }) {
    const ModSidebaropen = () => {
        setsideBarOpen(!sidebarOpen);
    };
    const {setTheme,theme}=useContext(ThemeContext)
    const cambiarTheme = () => {
        setTheme((theme) => (theme === "ligth" ? "dark" : "ligth"))
      };
    return (
        <Container isOpen={sidebarOpen}>
            <button className="Sidebarbutton" onClick={ModSidebaropen}>
                <AiOutlineLeft/>

            </button>
            <div className="Logocontent">
                <div className="imgcontent">
                    <img src={logo}>
                    </img>

                </div>
                <h2>
                    Proyecto2
                </h2>

            </div>
            {linkArray.map(({icon,label,to})=>(
                <div className="LinkContainer" key={label}>
                    <NavLink to={to} className={({isActive})=>`Links${isActive?` active`:``}`}>
                        <div className="Linkicon">
                            {icon}
                        </div>
                        {sidebarOpen && (
                            <span>{label}</span>
                        )}
                    
                    </NavLink>

                    
                </div>
            ))}
            <Divisor/>
            {secoundarylinkArray.map(({icon,label,to})=>(
                <div className="LinkContainer" key={label}>
                    <NavLink to={to} className={({isActive})=>`Links${isActive?` active`:``}`}>
                        <div className="Linkicon">
                            {icon}
                        </div>
                        {sidebarOpen && (
                            <span>{label}</span>
                        )}
                    
                    </NavLink>

                    
                </div>
            ))}
            <Divisor/>
            <div className="Themecontent">
                {sidebarOpen&& <span className="titletheme">Dark Mode</span>}
                <div className="Togglecontent">
                    <div className="grid theme-container">
                        <div className="content">
                            <div className="demo">
                                <label className="switch" istheme={theme}>
                                    <input istheme={theme} type="checkbox" className="theme-swither" onClick={cambiarTheme}>
                                    
                                    </input>
                                    <span className="slider round"></span>
                                </label>

                            </div>
                        </div>

                    </div>

                </div>
                
            </div>
        </Container>)
}

//#region data links
const linkArray=[
    {
    label:"Home",
    icon:<FaHouseMedicalCircleCheck/>,
    to:"/"
    },
    {
    label:"Tratamiento",
    icon:<FaBriefcaseMedical/>,
    to:"/tratamiento"
    },
    {
    label:"Configuracion",
    icon:<BsDatabaseFillGear/>,
    to:"/configuracion"
    }


]
//#endregion


//#region data links secoundary
const secoundarylinkArray=[
    {
    label:"Reglas",
    icon:<IoDocumentText/>,
    to:"/reglas"
    },
    {
    label:"Salir",
    icon:<ImExit/>,
    to:"/salir"
    }


]
//#endregion




//#region Styled components
const Container = styled.div`
color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: ;
  padding-top: 20px;
.Sidebarbutton{
    position: absolute;
    top: ${v.xxlSpacing};
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3}, 0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
}
.Logocontent{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${v.lgSpacing};
    .imgcontent{
    display:flex;
    img{
        max-width: 100%;
        height: auto;
        }
        cursor: pointer;
        transition: all 0.3s;
        transform: ${({isOpen}) => (isOpen ? `scale(0.7)` : `scale(1.5)`)};
    }
    h2{
        display: ${({ isOpen }) => (!isOpen ? `none` : `block`)};
    }

}

.LinkContainer {
    margin: 8px 0;
   
    padding: 0 15%;
    :hover {
      background: ${(props) => props.theme.bg3};
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.text};
      height:50px;
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;

        svg {
          font-size: 25px;
        }
      }
      &.active {
        .Linkicon {
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
    .Themecontent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titletheme {
      display: block;
      padding: 10px;
      font-weight: 700;
      opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }
    .Togglecontent {
      margin: ${({ isOpen }) => (isOpen ? `auto 40px` : `auto 15px`)};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: 0.4s;
        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }
        .demo {
          font-size: 32px;
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            .theme-swither {
              opacity: 0;
              width: 0;
              height: 0;
              &:checked + .slider:before {
                left: 4px;
                content: "🌑";
                transform: translateX(26px);
              }
            }
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${({ themeUse }) =>
                themeUse === "light" ? v.lightcheckbox : v.checkbox};

              transition: 0.4s;
              &::before {
                position: absolute;
                content: "☀️";
                height: 0px;
                width: 0px;
                left: -10px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
              }
              &.round {
                border-radius: 34px;

                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
    
`;
//#endregion

//#region divisor
const Divisor=styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;

`;
//#endregion