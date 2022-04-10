import { faUserTie } from "@fortawesome/free-solid-svg-icons";
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
      showTimeSelect={true}
      // inline
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setValue(val);
      }}
    />
  );
};

export default function CreateNewPost() {
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

  // const formikHook = useFormik({
  //   initialValues: {
  //     title: "",
  //     datetime: new Date(),
  //     lat: 0,
  //     long: 0,
  //     desc: "",
  //   },
  //   validate: formValidation,
  //   onSubmit: (values) => {
  //     console.log("values", values);
  //   },
  // });

  return (
    <div className="">
      <div className="card shadow">
        <div className="card-body bg-base-100 items-center text-center">
          <h2 className="card-title font-medium text-3xl">Create New Marker</h2>

          <div className="divider py-0 my-0" />

          <Formik
            initialValues={{
              title: "",
              datetime: new Date(),
              lat: 0,
              long: 0,
              desc: "",
            }}
            validate={formValidation}
            onSubmit={(values, actions) => {
              console.log("values", values);
            }}
          >
            <form
              onSubmit={(e) =>
                e.preventDefault()
              } /*onSubmit={formikHook.handleSubmit}*/
            >
              <div className="form-control">
                <label htmlFor="title" className="label">
                  <span className="label-text">Marker Name</span>
                </label>
                <label className="input-group">
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="my resource"
                    className="input input-bordered"
                    // onChange={formikHook.handleChange}
                    // value={formikHook.values.title}
                  />
                </label>
                {/* {formikHook.errors.title ? (
              <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.title}
                </div>
              ) : null} */}
              </div>

              <div className="form-control mt-3">
                <label htmlFor="datetime" className="label">
                  <span className="label-text">Availability Date</span>
                </label>
                <label className="input-group">
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  <DatePickerField
                    name="datetime"
                    className="input input-bordered"
                  />
                </label>
                {/* {formikHook.errors.datetime ? (
                  <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.datetime}
                  </div>
                ) : null} */}
              </div>

              <div className="form-control mt-3">
                <label htmlFor="lat" className="label">
                  <span className="label-text">Marker Latitude</span>
                </label>
                <label className="input-group">
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  <input
                    type="text"
                    id="lat"
                    name="lat"
                    placeholder="0"
                    className="input input-bordered"
                    // onChange={formikHook.handleChange}
                    // value={formikHook.values.lat}
                  />
                </label>
                {/* {formikHook.errors.lat ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.lat}
                </div>
              ) : null} */}
              </div>

              <div className="form-control mt-3">
                <label htmlFor="long" className="label">
                  <span className="label-text">Marker Longitude</span>
                </label>
                <label className="input-group">
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  <input
                    type="text"
                    id="long"
                    name="long"
                    placeholder="0"
                    className="input input-bordered"
                    // onChange={formikHook.handleChange}
                    // value={formikHook.values.long}
                  />
                </label>
                {/* {formikHook.errors.long ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.long}
                </div>
              ) : null} */}
              </div>

              <div className="form-control mt-3">
                <label htmlFor="desc" className="label">
                  <span className="label-text">Marker Description</span>
                </label>
                <label className="input-group">
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  <textarea
                    id="desc"
                    name="desc"
                    placeholder="description"
                    className="textarea textarea-bordered min-h-16"
                    // onChange={formikHook.handleChange}
                    // value={formikHook.values.desc}
                  />
                </label>
                {/* {formikHook.errors.desc ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.desc}
                </div>
              ) : null} */}
              </div>

              <button
                type="submit"
                className="btn btn-accent text-white mt-6 w-full"
              >
                Create
              </button>
            </form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
