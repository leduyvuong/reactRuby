import "./Sidebar.scss"
import { useTranslation } from "react-i18next";

function Sidebar() {
  let user = {
    token: "",
    username: "",
    role: ""
  };
  user = JSON.parse(localStorage.getItem("user") || "");
  const { t } = useTranslation();
  return (
    <div className="wrapper">
      {/* Sidebar  */}
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Food and Drink</h3>
          <strong>BS</strong>
        </div>
        <ul className="list-unstyled components">
          <li className="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
              {t("sidebar.user")}
            </a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a href="/admin/newUser">{t("sidebar.addUser")}</a>
              </li>
              <li>
                <a href="/admin">{t("sidebar.userList")}</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
              <i className="fa fa-coffee" aria-hidden="true"></i>
              {t("sidebar.product")}
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <a href="/admin/newProduct">{t("sidebar.addProduct")}</a>
              </li>
              <li>
                <a href="/admin/products">{t("sidebar.productList")}</a>
              </li>
            </ul>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
              <i className="fas fa-copy" />
              {t("sidebar.order")}
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="/admin/orders/pending">Danh sách chờ</a>
              </li>
              <li>
                <a href="/admin/orders/shipping">Danh sách đang ship</a>
              </li>
              <li>
                <a href="/admin/orders/done">Danh sách đã hoàn thành</a>
              </li>
              <li>
                <a href="#">{t("sidebar.pendingOrder")}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default Sidebar;