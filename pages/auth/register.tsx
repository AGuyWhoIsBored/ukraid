import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  faEnvelope,
  faUserTie,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";

const Register: NextPage = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState(0);

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

  const onSubmit = async (
    email: string,
    username: string,
    password: string
  ) => {
    console.log("create account details", email, username, password);

    //POST form values
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
        email,
        password,
      }),
    }).then(async (res) => {
      if (res.status !== 201) {
        console.log("didnt create account");
        setErrorCode(res.status);
      } else {
        console.log("account successfully created");
        router.push(`${window.location.origin}/auth/login`);
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div className="card shadow sm:w-[500px] md:w-[750px] lg:w-[1000px] mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title font-medium text-3xl">Create Account</h2>

          <div className="divider" />

          {errorCode !== 0 ? (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {errorCode === 422
                    ? "Username or email already used."
                    : "An internal error occurred."}
                </span>
              </div>
            </div>
          ) : null}

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

export default Register;
