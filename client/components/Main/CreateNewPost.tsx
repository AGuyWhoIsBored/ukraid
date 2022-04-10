import {
  faSignsPost,
  faCalendarDay,
  faMapPin,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField, Formik } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ ...props }) => {
  const [field, , { setValue }] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      showTimeSelect
      timeFormat="p"
      dateFormat="Pp"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setValue(val);
      }}
    />
  );
};

export default function CreateNewPost({ user, updateSelectMarker, lat, long }) {
  console.log("lat", lat, "long", long);

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

  const onSubmit = async (values, actions) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UId: user.id,
        Title: values.title,
        DateOfEvent: values.datetime,
        Latitude: values.lat,
        Longitude: values.long,
        Description: values.desc,
      }),
    }).then((resp) => resp.status);

    if (res === 201) {
      // add to the frontend state with markers
      updateSelectMarker({
        lat: values.lat,
        lng: values.long,
      });
    }
  };

  return (
    <div className="relative">
      <div className="card shadow">
        <div className="card-body bg-base-100 items-center text-center">
          <h2 className="card-title font-medium text-3xl">Create New Marker</h2>

          <div className="divider py-0 my-0" />

          <Formik
            initialValues={{
              title: "",
              datetime: new Date(),
              lat: lat,
              long: long,
              desc: "",
            }}
            validate={formValidation}
            onSubmit={onSubmit}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="form-control">
                  <label htmlFor="title" className="label">
                    <span className="label-text">Marker Name</span>
                  </label>
                  <label className="input-group">
                    <span>
                      <FontAwesomeIcon icon={faSignsPost} />
                    </span>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="my resource"
                      className={`input input-bordered ${
                        props.errors.title ? "input-error" : ""
                      }`}
                      onChange={props.handleChange}
                      value={props.values.title}
                    />
                  </label>
                </div>

                <div className="form-control mt-3">
                  <label htmlFor="datetime" className="label">
                    <span className="label-text">Availability Date</span>
                  </label>
                  <label className="input-group">
                    <span>
                      <FontAwesomeIcon icon={faCalendarDay} />
                    </span>
                    <DatePickerField
                      name="datetime"
                      className={`input input-bordered ${
                        props.errors.datetime ? "input-error" : ""
                      }`}
                    />
                  </label>
                </div>

                <div className="form-control mt-3">
                  <label htmlFor="lat" className="label">
                    <span className="label-text">Marker Latitude</span>
                  </label>
                  <label className="input-group">
                    <span>
                      <FontAwesomeIcon icon={faMapPin} />
                    </span>
                    <input
                      type="text"
                      id="lat"
                      name="lat"
                      placeholder="0"
                      className={`input input-bordered ${
                        props.errors.lat ? "input-error" : ""
                      }`}
                      onChange={props.handleChange}
                      value={props.values.lat}
                    />
                  </label>
                </div>

                <div className="form-control mt-3">
                  <label htmlFor="long" className="label">
                    <span className="label-text">Marker Longitude</span>
                  </label>
                  <label className="input-group">
                    <span>
                      <FontAwesomeIcon icon={faMapPin} />
                    </span>
                    <input
                      type="text"
                      id="long"
                      name="long"
                      placeholder="0"
                      className={`input input-bordered ${
                        props.errors.long ? "input-error" : ""
                      }`}
                      onChange={props.handleChange}
                      value={props.values.long}
                    />
                  </label>
                </div>

                <div className="form-control mt-3">
                  <label htmlFor="desc" className="label">
                    <span className="label-text">Marker Description</span>
                  </label>
                  <label className="input-group">
                    <span>
                      <FontAwesomeIcon icon={faFileLines} />
                    </span>
                    <textarea
                      id="desc"
                      name="desc"
                      placeholder="description"
                      className={`textarea textarea-bordered min-h-16 resize-none ${
                        props.errors.desc ? "textarea-error" : ""
                      }`}
                      onChange={props.handleChange}
                      value={props.values.desc}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-accent text-white mt-6 w-full"
                >
                  Create
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
