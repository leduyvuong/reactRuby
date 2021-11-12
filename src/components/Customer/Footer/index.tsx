import "./index.scss";
import { useTranslation } from "react-i18next";
function Footer(props: any) {
  const { t } = useTranslation();
  return (
    <footer className="footer bg-white mt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 text-center">
            <div className="footer-site-logo mb-4">
              <a className="text-success" href="/#">Food and Drink</a>
            </div>
            <ul className="list-unstyled nav-links mb-5">
              <li><a href="https://www.facebook.com/macmotchiecvayxinh">{t("about")}</a></li>
              <li><a href="https://www.facebook.com/macmotchiecvayxinh">{t("services")}</a></li>
              <li><a href="https://www.facebook.com/macmotchiecvayxinh">{t("faq")}</a></li>
              <li><a href="https://www.facebook.com/messages/t/106386961103273">{t("contact")}</a></li>
            </ul>
            <div className="social mb-4">
              <h3>{t("stayintouch")}</h3>

              <ul className="list-unstyled">
                <li className="in"><a href="https://www.instagram.com/rubystar129/"><span className="fab fa-instagram" /></a></li>
                <li className="fb"><a href="https://www.facebook.com/macmotchiecvayxinh"><span className="fab fa-facebook-f" /></a></li>
                <li className="tw"><a href="/#"><span className="fab fa-twitter" /></a></li>
                <li className="pin"><a href="/#"><span className="fab fa-pinterest" /></a></li>
                <li className="dr"><a href="/#"><span className="fab fa-dribbble" /></a></li>
              </ul>
            </div>
            <div className="copyright">
              <p className="mb-0"><small>© FoodAndDrink. All Rights Reserved.</small></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;