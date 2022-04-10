import { NextPage } from "next";
import { useRouter } from "next/router";
import { faUserTie, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { signIn, SignInResponse } from "next-auth/react";
import { useState } from "react";

const Register: NextPage = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState(0);

  const formValidation = (values: { username: string; password: string }) => {
    const errors: {
      username?: string;
      password?: string;
    } = {};

    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formikHook = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: formValidation,
    onSubmit: (values) => onSubmit(values.username, values.password),
  });

  const onSubmit = async (username: string, password: string) => {
    console.log("sign in details", username, password);

    // call the sign in function
    const results = (await signIn("credentials", {
      username,
      password,
      redirect: false,
    })) as unknown as SignInResponse;

    if (!results.ok) {
      setErrorCode(results.status);
    } else {
      console.log("results", results);
      router.push(`${window.location.origin}/main`);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card shadow sm:w-[500px] md:w-[750px] lg:w-[1000px] mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title font-medium text-3xl">Sign In</h2>

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
                  {errorCode === 401
                    ? "Incorrect username or password."
                    : "An internal error occurred."}
                </span>
              </div>
            </div>
          ) : null}

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

            <button
              type="submit"
              className="btn btn-accent text-white mt-6 w-full"
            >
              Sign In!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
