import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapLocationDot,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <span className="flex justify-between">
                <Link href="/">
                  <a>Home</a>
                </Link>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </span>
            </li>
            <li>
              <span className="flex justify-between">
                <Link href="/main">
                  <a>View Main Map</a>
                </Link>
                <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
              </span>
            </li>
            <li>
              <span className="flex justify-between">
                <Link href="/about">
                  <a>About Project</a>
                </Link>
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
              </span>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Ukraine Aid</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <span className="flex justify-between">
              <Link href="/">
                <a>Home</a>
              </Link>
              <FontAwesomeIcon icon={faHome} size="lg" />
            </span>
          </li>
          <li>
            <span className="flex justify-between">
              <Link href="/main">
                <a>View Main Map</a>
              </Link>
              <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
            </span>
          </li>
          <li>
            <span className="flex justify-between">
              <Link href="/about">
                <a>About Project</a>
              </Link>
              <FontAwesomeIcon icon={faCircleInfo} size="lg" />
            </span>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost mr-3">Sign Up</a>
        <a className="btn mr-3">Sign In</a>
      </div>
    </div>
  );
}
