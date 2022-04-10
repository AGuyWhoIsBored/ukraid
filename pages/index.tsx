import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://picsum.photos/1000/800)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w ">
          <h1 className="mb-10 text-5xl font-bold">WELCOME</h1>
          <h1 className="mb-10 text-3xl font-bold">Here are some useful links</h1>
          <Link href={"https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/"}>
            <a className="hover:bg-slate-400/30 text-blue-600 font-bold text-4xl">Ukraine Crisis Relief Fund</a>
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <table>
            <tr>
              <td>
                <Link href={"https://www.smithsonianmag.com/history/the-20th-century-history-behind-russias-invasion-of-ukraine-180979672/"}>
                  <a className="hover:bg-slate-400/30 text-blue-600 font-bold text-4xl mr-10">Brief History of Ukraine and Russia</a>
                </Link>
              </td>
              <td>
                <Link href={"https://www.britannica.com/place/Ukraine/Economy"}>
                  <a className="hover:bg-slate-400/30 text-blue-600 font-bold text-4xl ml-10 ">Information on Ukraine</a>
                </Link>
              </td>
              <td>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
