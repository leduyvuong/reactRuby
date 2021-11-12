import "./index.scss";
import category1 from "./images/category1.webp";
import { useTranslation } from "react-i18next";
function TopCategories(props: any) {
  const { t } = useTranslation();
  return (
    <div className="container bg-white mt-4 pb-4">
      <div className="row">
        <div className="section-title pointer">
          <div className="">
            <h3>{t("top-categories")}</h3>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="single-category col-lg-2">
          <div className="category-image">
            <a href="shop-left-sidebar.html" title="Vegetables" className="test">
              <img width="121" height="121" src={category1} className="img-fluid cricle" alt="" />
            </a>
          </div>
          <div className="category-title">
            <h3>
              <a href="shop-left-sidebar.html"> Vegetables</a>
            </h3>
          </div>
        </div>

        <div className="single-category col-lg-2">
          <div className="category-image">
            <a href="shop-left-sidebar.html" title="Vegetables" className="test">
              <img width="121" height="121" src={category1} className="img-fluid cricle" alt="" />
            </a>
          </div>
          <div className="category-title">
            <h3>
              <a href="shop-left-sidebar.html"> Vegetables</a>
            </h3>
          </div>
        </div>

        <div className="single-category col-lg-2">
          <div className="category-image">
            <a href="shop-left-sidebar.html" title="Vegetables" className="test">
              <img width="121" height="121" src={category1} className="img-fluid cricle" alt="" />
            </a>
          </div>
          <div className="category-title">
            <h3>
              <a href="shop-left-sidebar.html"> Vegetables</a>
            </h3>
          </div>
        </div>

        <div className="single-category col-lg-2">
          <div className="category-image">
            <a href="shop-left-sidebar.html" title="Vegetables" className="test">
              <img width="121" height="121" src={category1} className="img-fluid cricle" alt="" />
            </a>
          </div>
          <div className="category-title">
            <h3>
              <a href="shop-left-sidebar.html"> Vegetables</a>
            </h3>
          </div>
        </div>

        <div className="single-category col-lg-2">
          <div className="category-image">
            <a href="shop-left-sidebar.html" title="Vegetables" className="test">
              <img width="121" height="121" src={category1} className="img-fluid cricle" alt="" />
            </a>
          </div>
          <div className="category-title">
            <h3>
              <a href="shop-left-sidebar.html"> Vegetables</a>
            </h3>
          </div>
        </div>

        <div className="single-category col-lg-2">
          <div className="category-image">
            <a href="shop-left-sidebar.html" title="Vegetables" className="test">
              <img width="121" height="121" src={category1} className="img-fluid cricle" alt="" />
            </a>
          </div>
          <div className="category-title">
            <h3>
              <a href="shop-left-sidebar.html"> Vegetables</a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopCategories;