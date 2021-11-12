import "./index.scss";
import Product from "../Product";
import { useTranslation } from "react-i18next";
function ListProduct(props: any) {
  const { t } = useTranslation();
  return (
    <div className="container mt-4 listproduct">
      <nav className="row">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item ">
            <a className="nav-link active font-weight-bold " id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{t("drink")}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link font-weight-bold text-" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{t("food")}</a>
          </li>
        </ul>
      </nav>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="row">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className="row">
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListProduct;