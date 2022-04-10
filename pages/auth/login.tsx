import { NextPage } from "next";
import {
  faEnvelope,
  faUserTie,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";

const Register: NextPage = () => {
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

  return (
    <div className="flex justify-center">
      <div className="card shadow sm:w-[500px] md:w-[750px] lg:w-[1000px] mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title font-medium text-3xl">Sign In</h2>

          <div className="divider" />

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

const onSubmit = async (username: string, password: string) => {
  console.log("sign in details", username, password);

  // call the sign in function
  await signIn("credentials", {
    username,
    password,
    // The page where you want to redirect to after a
    // successful login
    callbackUrl: `${window.location.origin}/main`,
  });
};

export default Register;
