import styled from "styled-components";
import {Homecomponent} from "../components/Homecomponent";
export function Home(){
    return (<Container>
        <Homecomponent/>
    </Container>)
}
const Container=styled.div`
height:100vh;
 display: flex;
  
`;