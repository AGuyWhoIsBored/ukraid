import type { NextPage } from "next";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import CreateNewPost from "../client/components/Main/CreateNewPost";

const AnyReactComponent = ({ text, onChildClick }) => (
  <div
    onClick={onChildClick}
    style={{
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FontAwesomeIcon icon={faLocationDot} size="3x" className="text-red-500" />
    <h6 className="font-semibold text-base">{text}</h6>
  </div>
);

const UKRAINE_BOUNDS = {
  north: -34.36,
  south: -47.35,
  west: 166.28,
  east: -175.81,
};
const UKRAINE = {
  center: { lat: 48.3794, lng: 31.1656 },
  zoom: 7,
  bounds: UKRAINE_BOUNDS,
};

const Main: NextPage = () => {
  const { data: session, status } = useSession();

  const [markers, setMarkers] = useState([
    { lat: -37.06, lng: 174.58, txt: "asdf", id: 1 },
    { lat: -30, lng: 175, txt: "hijk", id: 2 },
    { lat: -35, lng: 180, txt: "jijkjk", id: 3 },
  ]);
  const [expCounter, setExpCounter] = useState(4);

  const markerClicked = (marker) => {
    console.log("The marker that was clicked is", marker);
    // you may do many things with the "marker" object, please see more on tutorial of the library's author:
    // https://github.com/istarkov/google-map-react/blob/master/API.md#onchildclick-func
    // Look at their examples and you may have some ideas, you can also have the hover effect on markers, but it's a bit more complicated I think
  };

  const addMarker = ({ x, y, lat, lng }) => {
    const newMarker = { lat: lat, lng: lng, txt: "CLONE", id: expCounter };
    console.log("adding new marker at ", newMarker);
    setMarkers([...markers, newMarker]);
    setExpCounter(expCounter + 1);
  };

  const [markerOpen, setMarkerOpen] = useState(false);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBj9uPwBexPUrVp3JHkGDZJUDHfpWveUW4" }}
        defaultCenter={UKRAINE.center}
        defaultZoom={UKRAINE.zoom}
        onClick={addMarker}
      >
        {markers.map((marker, i) => {
          return (
            <AnyReactComponent
              key={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              text={marker.txt}
              onChildClick={() => markerClicked(marker)}
            />
          );
        })}
      </GoogleMapReact>

      {session ? (
        <div className="z-50">
          <button
            className="absolute top-[68px] right-16 btn btn-error text-white"
            onClick={() => setMarkerOpen(!markerOpen)}
          >
            {markerOpen ? "Hide Marker Creator" : "Show Marker Creator"}
          </button>
          {markerOpen ? (
            <div className="absolute right-5 bottom-[10%]">
              <CreateNewPost />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Main;
