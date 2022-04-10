import { NextPage } from "next";
import {
  faEnvelope,
  faUserTie,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";

const Register: NextPage = () => {
  const formValidation = (values: {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const errors: {
      email?: string;
      username?: string;
      password?: string;
      passwordConfirm?: string;
    } = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!values.email.includes("@")) {
      errors.email = "Invalid email address";
    }

    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (values.passwordConfirm != values.password) {
      errors.passwordConfirm = "Does not match password";
    }

    return errors;
  };

  const formikHook = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validate: formValidation,
    onSubmit: (values) =>
      onSubmit(values.email, values.username, values.password),
  });

  return (
    <div className="flex justify-center">
      <div className="card shadow sm:w-[500px] md:w-[750px] lg:w-[1000px] mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title font-medium text-3xl">Create Account</h2>

          <div className="divider" />

          <p>Fill out the following information to create an account.</p>

          <form onSubmit={formikHook.handleSubmit}>
            <div className="form-control mt-3">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <label className="input-group">
                <span>
                  <FontAwesomeIcon icon={faUserTie} />
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="my nice username"
                  className="input input-bordered"
                  onChange={formikHook.handleChange}
                  value={formikHook.values.username}
                />
              </label>
              {formikHook.errors.username ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.username}
                </div>
              ) : null}
            </div>

            <div className="form-control mt-3">
              <label htmlFor="email" className="label">
                <span className="label-text">Email Address</span>
              </label>
              <label className="input-group">
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="info@site.com"
                  className="input input-bordered"
                  onChange={formikHook.handleChange}
                  value={formikHook.values.email}
                />
              </label>
              {formikHook.errors.email ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.email}
                </div>
              ) : null}
            </div>

            <div className="form-control mt-3">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input-group">
                <span>
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input input-bordered"
                  onChange={formikHook.handleChange}
                  value={formikHook.values.password}
                />
              </label>
              {formikHook.errors.password ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.password}
                </div>
              ) : null}
            </div>

            <div className="form-control mt-3">
              <label htmlFor="passwordConfirm" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <label className="input-group">
                <span>
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  className="input input-bordered"
                  onChange={formikHook.handleChange}
                  value={formikHook.values.passwordConfirm}
                />
              </label>
              {formikHook.errors.passwordConfirm ? (
                <div className="text-red-500 text-left text-sm">
                  {formikHook.errors.passwordConfirm}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="btn btn-accent text-white mt-6 w-full"
            >
              Create Account!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const onSubmit = async (email: string, username: string, password: string) => {
  console.log("create account details", email, username, password);

  //POST form values
  const data = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: username,
      email,
      password,
    }),
  }).then(async (res) => await res.json());
  console.log(data);
};

export default Register;
