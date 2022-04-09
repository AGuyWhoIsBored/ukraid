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
              <Link href="/">
                <a className="flex justify-between w-full mb-1 py-2">
                  <span>Home</span>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/main">
                <a className="flex justify-between w-full mb-1 py-2">
                  <span>View Main Map</span>
                  <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="flex justify-between w-full py-2">
                  <span>About Project</span>
                  <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">
            Ukraine Aid Tracker
          </a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/">
              <a className="flex justify-between w-full mr-1">
                <span>Home</span>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/main">
              <a className="flex justify-between w-full mr-1">
                <span>View Main Map</span>
                <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="flex justify-between w-full mr-1">
                <span>About Project</span>
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
              </a>
            </Link>
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