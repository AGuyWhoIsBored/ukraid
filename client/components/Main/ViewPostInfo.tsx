import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// TODO ASAP: delete marker support if the user matches

export default function ViewPostInfo({
  title,
  date,
  desc,
  lat,
  long,
  setShowMarkerInfo,
  canDelete,
  eventID,
  deleteCallback,
}) {
  return (
    <div>
      <div className="card shadow w-[500px] h-[400px] overflow-scroll ">
        <div className="card-body bg-base-100 relative">
          <span
            className="absolute top-4 right-6 text-slate-400 hover:cursor-pointer hover:text-slate-500 transition"
            onClick={() => setShowMarkerInfo(false)}
          >
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </span>
          <h2 className="card-title font-medium text-3xl">Marker Info</h2>
          <div className="divider py-0 my-0" />
          <h3 className="flex justify-between">
            <span className="font-semibold">Title:</span>
            <span>{title}</span>
          </h3>
          <h3 className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{date?.toLocaleString()}</span>
          </h3>
          <h3 className="flex justify-between">
            <span className="font-semibold">Latitude:</span>
            <span>{lat}</span>
          </h3>
          <h3 className="flex justify-between">
            <span className="font-semibold">Longitude:</span>
            <span>{long}</span>
          </h3>
          <h3 className="font-semibold">Description:</h3>
          <p className="whitespace-pre-wrap">{desc}</p>

          {canDelete ? (
            <button
              className="btn btn-error text-white mt-3"
              onClick={() => deleteCallback(eventID)}
            >
              Delete Marker
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
