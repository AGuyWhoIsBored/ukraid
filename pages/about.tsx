import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container text-center mx-auto">
      <h1 className="font-semibold text-4xl mt-8">About UkrAID</h1>

      <div className="divider"></div>

      <div className="text-justify">
        <p>
          UkrAID was made by a team of Cal Poly students during the Spring of 2022 for the SLO Hacks 2022 Hackathon.
          After hearing about the humanitarian crisis due to Russia's invasion of Ukraine,
          as well as the amount of misinformation on social media, our team decided to make a collaborative,
          interactive map of Ukraine. On the interactive map, authenticated users can share markers of events or
          community efforts to to help the people of Ukraine, such as recent information about Ukrainian cities or regions
          or links to charities or relief efforts for Ukraine. Our goal is to help Ukrainians
          come together to support and help one another while also raising awareness and directing other people from around the world to 
          donate or offer words of encouragement and love to Ukraine. Everyone is able to traverse the live map to see the events that 
          are occuring around them, however only verified users can create events and posts on the map. The other main goal of this webapp
          is to allow the people or Ukraine to document the tragedies that befalls them soe the world can know the events that are occuring 
          without any censorship and without the need to reporters to be out on the front lines in places where they may not be able to get 
          their stories out. 
        </p>
      </div>
      <img
        src="/about_us.jpg"
        width="50%"
        height="50%"
        className="mx-auto mt-4"
        alt="hackers"
      ></img>
    </div>
  );
};

export default About;
