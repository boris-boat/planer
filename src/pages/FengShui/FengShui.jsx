import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";

import "react-bootstrap-typeahead/css/Typeahead.css";
import Loader from "./Loader.jsx";

const FengShui = () => {
  // const mastersNames = ["Master Pun-Yin","Chow Hon Ming","Lillian Too","Guo Pu"]
  const { REACT_APP_API_URL } = process.env;
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  // const ref = useRef();
  // const { REACT_APP_COOKBOOK_API } = process.env;
  //base querry where rest of info is added
  // let base = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_COOKBOOK_API}&addRecipeInformation=true&number=5&sort=random`;

const sendQuestion = async () => {
  setIsLoading(true)
  try {
    await fetch(REACT_APP_API_URL + "/gpt/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt}),
      
    }).then((res) => res.json()).then((response) => {
      setResponse(response?.completion?.choices[0]?.message?.content)
      setIsLoading(false)
    })
  } catch (e) {
    setIsLoading(false)
    console.log(e);
  }
}


  const center =
    "d-flex justify-content-center align-items-center align-content-center";
  return (
    <Container>
      <Container
        className={`flex-column  flex-wrap ${center}`}
        style={{ paddingTop: "130px" }}
      >
        <Container
          className="justify-content-center align-items-center d-flex flex-column"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Container
            style={{
              fontFamily: "Noto Serif",
              fontSize: "30px",
              color: "white",
            }}
          >
            {/* Pozdrav , moje ime je {`${mastersNames[Math.floor(Math.random()*mastersNames.length)]}`} */}
            Pozdrav , moje ime je  <a href="https://en.wikipedia.org/wiki/Lillian_Too">Lillian Too</a>
          </Container>
          <Container
            className="d-flex justify-content-center mt-3"
            style={{ color: "white" }}
          >
           Ako imas neko pitanje u vezi feng shui tematike ja sam tu da ti pomognem !
          </Container>
          <Col style={{ width: "100%", marginTop: "20px" }}>
            <Form.Group>
            <input type="text" style={{width:"100%"}} onChange={(e) => setPrompt(e.target.value)} value={prompt}/>
            </Form.Group>
            <Container className={`${center}  pt-3 space-between mt-3`}>
              <Button onClick={sendQuestion} >Postavi Pitanje</Button>
              <Button
               onClick={() => {
                setPrompt("")
                setResponse("")}}
                style={{ marginLeft: "20px" }}
              >
                Novo Pitanje
              </Button>
            </Container>
          </Col>
          <Col style={{ width: "100%", paddingTop: "10px",marginBottom:"20px" }} className={`${center} mt-1`}>
          <p style={{color:"white",fontSize:"20px"}} className="mt-0">{response}</p> 
          {isLoading ? (<Loader className="mt-2"/>) : (null)}
          
          </Col>
        </Container>
      </Container>
    </Container>
  );
};

export default FengShui;
