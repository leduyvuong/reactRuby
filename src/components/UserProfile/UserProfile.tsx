
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import AlertSuccess from "../share/AlertSuccess";
import "./UserProfile.scss"
const UserProfile: React.FC = (props) => {
  const [type, setType] = useState(1);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    password: "",
    password_confirmation: ""
  })


  const [errors, setErrors] = useState([] as any[]);
  const [errorsUserProfile, setErrorsUserProfile] = useState([] as any[]);
  const [userProfile, setUserProfile] = useState({
    id: "1",
    name: "",
    address: "",
    date_of_birth: "",
    phone: "",
    user_id: 1
  })

  const { t } = useTranslation();
  const { id } = useParams<ParamTypes>();
  console.log("a" + id);
  let requestUrl = "https://rubyclosetapi.herokuapp.com/api/v1/users/" + id;

  const qs = require("qs");

  interface ParamTypes {
    id: string
  }

  function handleAccountSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(user);
    let role = document.getElementById("role") as HTMLSelectElement;
    setUser({
      ...user,
      role: role.value,
    })
    console.log(role.value);

    if (type == 1) {
      axios.patch(requestUrl, qs.stringify({
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
          password_confirmation: user.password_confirmation
        }
      }))
        .then(res => {
          const resJSON = JSON.parse(JSON.stringify(res.data));
          if (resJSON.success)
            console.log(resJSON.user)
          else {
            let errors: any[] = resJSON.errors;
            let list: any[] = [];
            Object.entries(errors).forEach(
              ([key, value]) => {
                list.push(key + " " + value);
              }
            );
            setErrors(list);
          }
        })
    } else {
      const url = "https://rubyclosetapi.herokuapp.com/api/v1/users"
      axios.post(url, qs.stringify({
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
          password_confirmation: user.password_confirmation
        }
      }))
        .then(res => {
          const resJSON = JSON.parse(JSON.stringify(res.data));
          if (resJSON.success)
            console.log(resJSON.user)
          else {
            let errors: any[] = resJSON.errors;
            let list: any[] = [];
            Object.entries(errors).forEach(
              ([key, value]) => {
                list.push(key + " " + value);
              }
            );
            setErrors(list);
          }
        })
    }
  }

  function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setUser({ ...user, [name]: value });
  }

  function handleInputUserProfileChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setUserProfile({ ...userProfile, [name]: value });
  }

  async function handleUserProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    let address = document.getElementById("address") as HTMLTextAreaElement;
    setUserProfile({
      ...userProfile,
      address: address.value
    })
    const url = "https://rubyclosetapi.herokuapp.com/api/v1/user_profiles/" + userProfile.id
    await axios.patch(url, qs.stringify({
      user_profile: {
        id: userProfile.id,
        name: userProfile.name,
        address: userProfile.address,
        date_of_birth: userProfile.date_of_birth,
        phone: userProfile.phone,
        user_id: user.id
      }
    }))
      .then(res => {
        const resJSON = JSON.parse(JSON.stringify(res.data));
        if (resJSON.success)
          window.location.href = "/admin";
        else {
          let errors: any[] = resJSON.errors;
          let list: any[] = [];
          Object.entries(errors).forEach(
            ([key, value]) => {
              list.push(key + " " + value);
            }
          );
          setErrorsUserProfile(list);
        }
      })
  }


  useEffect(() => {
    async function fetchUser() {

      await axios.get(requestUrl)
        .then(res => {
          const resJSON = JSON.parse(JSON.stringify(res.data));
          if ((typeof resJSON.user) !== "undefined") {
            setUser(resJSON.user);
            setUserProfile(resJSON.user_profile);
          } else {
            setType(2);
          }
        })
        .catch(error => console.log(error))
    }
    fetchUser();
  }, [])
  return (
    <div style={{ display: "flex" }}>
      <div className="col-md-6">
        <div className="myaccount-content">
          <h3>{t("useradmin.account_detail")}</h3>
          <div className="account-details-form">
            <form onSubmit={handleAccountSubmit}>
              <div className="row">
                <AlertSuccess errors={errors} />
              </div>
              <div className="row">
                <div className="col-lg-12 col-12 mb-30">
                  <label>Username: </label>
                  <input name="username" placeholder="Username" onChange={handleInputChange} defaultValue={user.username} type="text" />
                </div>
                <div className="col-12 mb-30">
                  <label>Email: </label>
                  <input name="email" placeholder="Email" onChange={handleInputChange} defaultValue={user.email} type="email" />
                </div>
                <div className="col-12 mb-30 form-group">
                  <label>{t("useradmin.role")}: </label>

                  {
                    user.role === "admin" ? (
                      <select className="form-control" name="role" id="role">
                        <option value="admin">{t("useradmin.admin")}</option>
                        <option value="customer">{t("useradmin.customer")}</option>
                      </select>
                    ) : (
                      <select className="form-control" name="role" id="role">
                        <option value="customer">{t("useradmin.customer")}</option>
                        <option value="admin">{t("useradmin.admin")}</option>
                      </select>
                    )
                  }
                </div>
                <div className="col-12 mb-30">
                  <h4>{t("useradmin.password_change")}</h4>
                </div>

                <div className="col-lg-6 col-12 mb-30">
                  <label>{t("useradmin.new_password")}: </label>
                  <input name="password" placeholder={t("useradmin.new_password")} onChange={handleInputChange} type="password" />
                </div>
                <div className="col-lg-6 col-12 mb-30">
                  <label>{t("useradmin.password_confirm")}: </label>
                  <input name="password_confirmation" placeholder={t("useradmin.password_confirm")} onChange={handleInputChange} type="password" />
                </div>
                <div className="col-12">
                  <button className="save-change-btn">{t("useradmin.save")}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="myaccount-content">
          <h3>{t("useradmin.userprofile")}</h3>
          <div className="account-details-form">
            <form onSubmit={handleUserProfileSubmit}>
              <div className="row">
                <AlertSuccess errors={errorsUserProfile} />
              </div>
              <div className="row">
                <div className="col-lg-12 col-12 mb-30">
                  <label>{t("useradmin.fullname")}: </label>
                  <input defaultValue={userProfile.name} name="name" onChange={handleInputUserProfileChange} placeholder={t("useradmin.fullname")} type="text" />
                </div>

                <div className="col-12 mb-30">
                  <label>{t("useradmin.date")}: </label>
                  <input defaultValue={userProfile.date_of_birth} name="date_of_birth" onChange={handleInputUserProfileChange} placeholder={t("useradmin.date")} type="date" />
                </div>
                <div className="col-12 mb-30">
                  <label>{t("useradmin.address")}: </label>
                  <textarea id="address" defaultValue={userProfile.address} name="address" placeholder={t("useradmin.address")} />
                </div>
                <div className="col-12 mb-30">
                  <label>{t("useradmin.phone")}: </label>
                  <input id="phone" defaultValue={userProfile.phone} name="phone" onChange={handleInputUserProfileChange} placeholder={t("useradmin.phone")} type="text" />
                </div>
                <div className="col-12">
                  <button className="save-change-btn">{t("useradmin.save")}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;