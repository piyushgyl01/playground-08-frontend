import { Link } from "react-router";

export default function App() {
  return (
    <>
      <main className="container my-5">
        <section className="row pb-4">
          <div className="col-md-2"></div>
          <div className="col-md-8 text-center">
            <img
              src="https://tse2.mm.bing.net/th?id=OIG3.VB98JZs5QXAk06fMn.__&pid=ImgGn"
              className="img-fluid rounded mb-4"
              alt="hero-img"
            />
            <h4>One place to learn all the skills you want to.</h4>
            <Link className="btn btn-primary px-4" to={"/skill-listing"}>
              View Skills
            </Link>
          </div>
          <div className="col-md-2"></div>
        </section>
        <section className="row my-4 text-center">
          <div className="col-md-2"></div>
          <div className="col-md-8 text-center">
            <img
              src="https://tse3.mm.bing.net/th?id=OIG2.OILIfDJoLT2q9i9IIIp0&pid=ImgGn"
              className="img-fluid rounded mb-4"
              alt="hero-img"
            />
            <h4>
              Are you someone who want to share what <br /> you know with
              everyone?
            </h4>
            <Link className="btn btn-primary px-4" to={"/skill-listing"}>
              View Skills
            </Link>
          </div>
          <div className="col-md-2"></div>
        </section>
      </main>
    </>
  );
}
