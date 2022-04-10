import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import CreateNewPost from "../client/components/Main/CreateNewPost";
import ViewPostInfo from "../client/components/Main/ViewPostInfo";

const AnyReactComponent = ({ text, onChildClick, id }) => {
  return (
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
      <FontAwesomeIcon
        icon={faLocationDot}
        size="3x"
        className={`${id == -1 ? "text-orange-500" : "text-red-500"}`}
      />
      <h6 className="font-semibold text-base">{text}</h6>
    </div>
  );
};

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

  // marker states
  const [markers, setMarkers] = useState([] as any[]);
  const [selectMarker, setSelectMarker] = useState({
    lat: 48, // random default value
    lng: 31, // random default value
    txt: "selected",
    id: -1,
  });

  const [expCounter, setExpCounter] = useState(4);

  // use the useEffect hook to fetch the initial markers
  useEffect(() => {
    async function fetchData() {
      const markers = (await fetch("/api/posts").then((resp) =>
        resp.json()
      )) as any[];
      console.log("markers", markers);

      setMarkers(
        markers.map((marker, i) => {
          return {
            lat: parseFloat(marker.Latitude),
            lng: parseFloat(marker.Longitude),
            txt: marker.Title,
            id: i,
          };
        })
      );
    }
    fetchData();
  }, []);

  const markerClicked = (marker) => {
    console.log("The marker that was clicked is", marker);

    // setCurMarker(marker);
    // you may do many things with the "marker" object, please see more on tutorial of the library's author:
    // https://github.com/istarkov/google-map-react/blob/master/API.md#onchildclick-func
    // Look at their examples and you may have some ideas, you can also have the hover effect on markers, but it's a bit more complicated I think
  };

  const addMarker = ({ lat, lng, txt }) => {
    console.log("lat", lat, "long", lng);

    const newMarker = { lat, lng, txt, id: expCounter };
    console.log("adding new marker at ", newMarker);
    setMarkers([...markers, newMarker]);
    setExpCounter(expCounter + 1);
  };

  const updateSelectMarker = ({ lat, lng }) => {
    console.log("select marker lat", lat, "long", lng);

    const newMarker = { lat, lng, txt: "selected", id: -1 };
    console.log("updating select marker", newMarker);
    setSelectMarker(newMarker);
  };

  const [markerOpen, setMarkerOpen] = useState(false);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBj9uPwBexPUrVp3JHkGDZJUDHfpWveUW4" }}
        defaultCenter={UKRAINE.center}
        defaultZoom={UKRAINE.zoom}
        onClick={updateSelectMarker}
      >
        <AnyReactComponent
          key={selectMarker.id}
          lat={selectMarker.lat}
          lng={selectMarker.lng}
          text={selectMarker.txt}
          id={selectMarker.id}
          onChildClick={() => markerClicked(selectMarker)}
        />
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
              <CreateNewPost
                user={session}
                updateSelectMarker={updateSelectMarker}
                addMarker={addMarker}
                key={`${selectMarker.lat}-${selectMarker.lng}`}
                lat={selectMarker.lat}
                long={selectMarker.lng}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Main;
