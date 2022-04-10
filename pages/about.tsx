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
          our team decided to make a product that the people of Ukraine can use to navigate this crisis. UkrAID creates
          a way for the struggling people of Ukraine to organize and focus their efforts around helping ensure safety and 
          recovery within their communities. Our service provides its users with a interactive live map that contains 
          markers of events or community efforts to help each other is these unprecedented times. Our goal is to help Ukraines
          come together to support and help one another while also raising awareness and directing other people from around the world to 
          donate or offer words of encouragement and love to Ukraine. Everyone is able to traverse the live map to see the events that 
          are occuring around them, however only verified users can create events and posts on the map.
        </p>
      </div>
      <div className="text-align: center;">
        <img src="assets/about-me-min.png" style={{margin: "auto"}} className="img-thumbnail rounded"></img>
      </div>
    </div>
  );
};

export default About;
