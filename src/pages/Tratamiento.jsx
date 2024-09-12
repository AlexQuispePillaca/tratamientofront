import styled from "styled-components";
import { ThemeContext } from "../App"; 
import {Tratamientocomponent} from "../components/Tratamientocomponent";
export function Tratamiento(){
   
    return (<Container>
        <Tratamientocomponent/>
    </Container>)
}
const Container=styled.div`
height:100vh;
   

`;