import "./index.scss";
import slider1 from "./images/background.jpg";
import slider2 from "./images/background1.jpg";
import icon1 from "./images/icon1.webp";
import icon2 from "./images/icon2.webp";
import icon3 from "./images/icon3.webp";
import fooddrink from "./images/fooddrink.jpg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";


function Header(props: any) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  function SwitchLanguage(e: any) {
    i18n.changeLanguage(e.target.value);
  }

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    setTotalCart(JSON.parse(localStorage.getItem("cart") || "[]").length);
  }, [localStorage.getItem("cart")])
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-white">
        <a className="navbar-brand" href="/">
          <img src={fooddrink} height={50} alt="mdb logo" />
        </a>
        {/* Collapse button */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav1" aria-controls="basicExampleNav1" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        {/* Links */}
        <div className="collapse navbar-collapse" id="basicExampleNav1">
          {/* Right */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/cart" className="nav-link navbar-link-2 waves-effect">
                {t("cart")}
                <i className="fas fa-shopping-cart pl-0" />
                <span className="badge badge-pill red">{totalCart}</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link waves-effect">{t("home")}</a>
            </li>

            <li className="nav-item pl-2 mb-2 mb-md-0">
              {
                localStorage.getItem("user") == null ?
                  <a href="/login" type="button" className="btn btn-outline-info btn-md btn-rounded btn-navbar waves-effect waves-light">{t("signin")} / {t("signup")}</a>
                  : <a type="button" onClick={() => logout()} className="btn btn-outline-info btn-md btn-rounded btn-navbar waves-effect waves-light">{t("logout")}</a>
              }

            </li>
            <li className="nav-item pl-2">
              <select className="custom-select" onChange={SwitchLanguage}>
                <option value="vi">Vi</option>
                <option value="en">En</option>
              </select>
            </li>
          </ul>
        </div>
        {/* Links */}
      </nav>
      {/* Navbar */}
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={slider1} alt="First slide" />
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={slider2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={slider1} alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="policy-section mb-35 mt-4">
        <div className="container">
          <div className="">
            <div className="policy-titles d-flex align-items-center flex-wrap row">
              {/*=======  single policy  =======*/}
              <div className="single-policy">
                <span><img width={30} height={25} src={icon1} className="img-fluid" alt="" /></span>
                <p> {t("freeship")}</p>
              </div>
              {/*=======  End of single policy  =======*/}
              {/*=======  single policy  =======*/}
              <div className="single-policy">
                <span><img width={30} height={29} src={icon2} className="img-fluid" alt="" /></span>
                <p>{t("moneyback")}</p>
              </div>
              {/*=======  End of single policy  =======*/}
              {/*=============================================
              =            single policy         =
						=============================================*/}
              <div className="single-policy">
                <span><img width={30} height={29} src={icon3} className="img-fluid" alt="" /></span>
                <p> {t("support")}</p>
              </div>
              {/*=====  End of single policy  ======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;