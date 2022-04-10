import {
  faSignsPost,
  faCalendarDay,
  faMapPin,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField, Formik } from "formik";

export default function ViewPostInfo(props) {

  const formValidation = (values: {
    title: string;
    datetime: Date;
    lat: number;
    long: number;
    desc: string;
  }) => {
    const errors: {
      title?: string;
      datetime?: string;
      lat?: string;
      long?: string;
      desc?: string;
    } = {};

    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.datetime) {
      errors.datetime = "Required";
    }
    if (!values.lat) {
      errors.lat = "Required";
    }
    if (!values.long) {
      errors.long = "Required";
    }
    if (!values.desc) {
      errors.desc = "Required";
    }

    return errors;
  };

  return (
    <div className="relative">
      <div className="card shadow">
        <h2 className="card-title font-medium text-3xl">Create New Marker</h2>
        <div className="card-body bg-base-100 items-center text-center">
          <div className="divider py-0 my-0" />

            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="form-control">
                  <label htmlFor="title" className="label">
                    <span className="label-text">{props.title}</span>
                  </label>
                </div>

                <div className="mt-3">
                  <label htmlFor="datetime" className="label">
                    <span className="label-text">Posted on {props.date}</span>
                  </label>
                </div>

                <div className="mt-3">
                  <label htmlFor="lat" className="label">
                    <span className="label-text">{props.lat}</span>
                  </label>
                </div>

                <div className="mt-3">
                  <label htmlFor="long" className="label">
                    <span className="label-text">{props.lng}</span>
                  </label>
                  <label className="input-group">
                    <span>
                      <FontAwesomeIcon icon={faMapPin} />
                    </span>
                  </label>
                </div>

                <div className="form-control mt-3">
                  <label htmlFor="desc" className="label">
                    <span className="label-text">{props.content}</span>
                  </label>
            
                </div>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}
