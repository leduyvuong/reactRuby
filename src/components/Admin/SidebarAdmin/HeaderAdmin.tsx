import { useTranslation } from "react-i18next";
import "./Sidebar.scss"

function HeaderAdmin() {

  let user = {
    token: "",
    username: "",
    role: ""
  };

  user = JSON.parse(localStorage.getItem("user") || "");
  const { t } = useTranslation();

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <div >
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <span>Hi, {user.username}</span>
            </button>
            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-align-justify" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active">
                  <button onClick={() => logout()} type="button" id="sidebarCollapse" className="btn btn-info">
                    <span>{t("logout")}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default HeaderAdmin;