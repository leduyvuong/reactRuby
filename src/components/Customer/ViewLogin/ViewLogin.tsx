import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AlertSuccess from "../../share/AlertSuccess";
import "./ViewLogin.scss";

const ViewLogin: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  let currentUser = ({
    token: "",
    username: "",
    role: ""
  })

  const [userNew, setUserNew] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  const [errors, setErrors] = useState([] as any[]);
  const [errorsNew, setErrorsNew] = useState([] as any[]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const requestUrl = "https://rubyclosetapi.herokuapp.com/api/v1/login"
    if (!user.username || !user.password) return;
    const qs = require("qs");
    axios.post(requestUrl, qs.stringify(
      {
        user: {
          username: user.username,
          password: user.password
        }
      }
    ))
      .then(res => {
        if (res.data.login) {
          currentUser.token = res.data.token;
          currentUser.username = res.data.user.username;
          currentUser.role = res.data.user.role;
          localStorage.setItem("user", JSON.stringify(currentUser));
          if (currentUser.role == "admin")
            window.location.href = "/admin";
          else
            window.location.href = "/";
        } else {
          let errors = document.getElementById("errors") as HTMLElement;
          setErrors(["Password or username wrong"]);
        }
      })
      .catch(error => {
        console.log(error);

      });
  }

  function handleSubmitNew(event: React.FormEvent) {
    event.preventDefault();

    const requestUrl = "https://rubyclosetapi.herokuapp.com/api/v1/users"
    if (!user.username || !user.password) return;
    console.log(user);
    const qs = require("qs");
    axios.post(requestUrl, qs.stringify(
      {
        user: {
          username: userNew.username,
          email: userNew.email,
          password: userNew.password,
          password_confirmation: userNew.password_confirmation
        },
        full_name: userNew.full_name
      }
    ))
      .then(res => {
        if (res.data.success) {
          currentUser.token = res.data.token;
          currentUser.username = res.data.user.username;
          currentUser.role = res.data.user.role;
          localStorage.setItem("user", JSON.stringify(currentUser));
          if (currentUser.role == "admin")
            window.location.href = "/admin";
          else
            window.location.href = "/";
        } else {
          let errors: any[] = res.data.errors;
          let list: any[] = [];
          Object.entries(errors).forEach(
            ([key, value]) => {
              list.push(key + " " + value);
            }
          );
          setErrorsNew(list);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    console.log(user.username)
    setUser({ ...user, [name]: value });
  }

  function handleInputChangeNew(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    console.log(userNew.username)
    setUserNew({ ...userNew, [name]: value });
  }

  return (

    <div className="page-content mt-50 mb-50">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30">
            {/* Login Form s*/}
            <form action="#" onSubmit={handleSubmit}>
              <div className="login-form">
                <h4 className="login-title">{t("login.content")}</h4>
                <div className="row">
                  <AlertSuccess errors={errors} />
                </div>
                <div className="row">
                  <div className="col-md-12 col-12 mb-20">
                    <input className="mb-0" name="username" value={user.username} onChange={handleInputChange} type="text" placeholder={t("login.email")} />
                  </div>
                  <div className="col-12 mb-20">
                    <label>{t("login.password")}</label>
                    <input className="mb-0" name="password" value={user.password} onChange={handleInputChange} type="password" placeholder={t("login.password")} />
                  </div>
                  <div className="col-md-8">
                  </div>
                  <div className="col-md-4 mt-10 mb-20 text-start text-md-end">
                    <a className="forget" href="/#"> {t("login.forget")}</a>
                  </div>
                  <div className="col-md-12">
                    <button className="register-button mt-0">{t("login.content")}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6">
            <form action="#" onSubmit={handleSubmitNew}>
              <div className="login-form">
                <h4 className="login-title">{t("register.content")}</h4>
                <label id="errorNew"></label>
                <div className="row">
                  <AlertSuccess errors={errorsNew} />
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 mb-20">
                    <label>{t("register.username")}</label>
                    <input className="mb-0" name="username" value={userNew.username} onChange={handleInputChangeNew} type="text" placeholder={t("register.username")} />
                  </div>
                  <div className="col-md-6 col-12 mb-20">
                    <label>{t("register.full_name")}</label>
                    <input className="mb-0" name="full_name" value={userNew.full_name} onChange={handleInputChangeNew} type="text" placeholder={t("register.full_name")} />
                  </div>
                  <div className="col-md-12 mb-20">
                    <label>{t("register.email")}</label>
                    <input className="mb-0" name="email" value={userNew.email} onChange={handleInputChangeNew} type="email" placeholder={t("login.email")} />
                  </div>
                  <div className="col-md-6 mb-20">
                    <label>{t("register.password")}</label>
                    <input className="mb-0" name="password" value={userNew.password} onChange={handleInputChangeNew} type="password" placeholder={t("login.password")} />
                  </div>
                  <div className="col-md-6 mb-20">
                    <label>{t("register.password_confirm")}</label>
                    <input className="mb-0" name="password_confirmation" value={userNew.password_confirmation} onChange={handleInputChangeNew} type="password" placeholder={t("register.password_confirm")} />
                  </div>
                  <div className="col-12">
                    <button className="register-button mt-0">{t("register.content")}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
}

export default ViewLogin;