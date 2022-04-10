import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="wrapper flex-grow-1 container text-center">
      <h1 style={{
        paddingTop: "1.5em",
        color: "#1B733C",
        }}>About UkrAID</h1>
      
      <div style={{
        textAlign: "justify"
      }}>
        <p>
          UkrAID was made by a team of Cal Poly students during the Spring of 2022 for the SLO Hacks 2022 Hackathon.
          After hearing about the humanitarian crisis currently taking place as a result of the invasion of Ukraine, 
          our team decided to make a product that the people of Ukraine can use to navigate this crisis. UkrAID provides 
          a way for the struggling people of Ukraine to organize and focus their efforts around helping ensure safety and 
          recovery within their communities. 
        </p>
      </div>
      <div className="text-align: center;">
        <img src="assets/about-me-min.png" style={{margin: "auto"}} className="img-thumbnail rounded"></img>
      </div>
    </div>
  );
};

export default About;
