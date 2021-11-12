import "./checkout.scss"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import axios from "axios";
import AlertSuccess from "../../share/AlertSuccess";


const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState([] as any[]);
  const [carts, setCarts] = useState([] as any[]);
  let total = 0;
  useEffect(() => {
    setCarts(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [])

  carts.map(prd => {
    total += prd.price * prd.quantity;
  })


  function createOrder(e: React.FormEvent) {
    e.preventDefault();
    let name = (document.getElementById("fullname") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let id;
    if (localStorage.getItem("user"))
      id = localStorage.getItem("user");
    else
      id = 2;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let address = (document.getElementById("address") as HTMLInputElement).value + ", " + (document.getElementById("country") as HTMLInputElement).value
      + ", " + (document.getElementById("city") as HTMLInputElement).value;
    let order_infor = {
      name: name,
      phone: phone,
      address: address,
      user_id: id
    }
    const requestUrl = "https://rubyclosetapi.herokuapp.com/api/v1/orders";
    const qs = require("qs");
    axios.post(requestUrl, {
      list: carts,
      infor: order_infor
    })
      .then(res => {
        const resJSON = JSON.parse(JSON.stringify(res.data));
        if (resJSON.success) {
          localStorage.removeItem("cart");
          window.location.href = "/";
        } else {
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
      .catch(error => console.log(error.data))

  }
  return (

    <div className="page-section section mb-50 ">
      {
        carts.length > 0 ? (
          <div className="container single-product-content-container">
            <div className="row">
              <div className="col-12">
                {/* Checkout Form s*/}
                <form action="#" className="checkout-form">
                  <div className="col-md-12">
                    <AlertSuccess errors={errors} />
                  </div>
                  <div className="row row-40">
                    <div className="col-lg-7 mb-20">
                      {/* Billing Address */}
                      <div id="billing-form" className="mb-40">
                        <h4 className="checkout-title">{t("checkout.bill_address")}</h4>
                        <div className="row">
                          <div className="col-md-12 col-12 mb-20">
                            <label>{t("checkout.full_name")}</label>
                            <input id="fullname" type="text" placeholder={t("checkout.full_name")} required />
                          </div>
                          <div className="col-md-6 col-12 mb-20">
                            <label>{t("checkout.email")}</label>
                            <input id="email" type="email" placeholder={t("checkout.email")} required />
                          </div>
                          <div className="col-md-6 col-12 mb-20">
                            <label>{t("checkout.phone")}</label>
                            <input id="phone" type="text" placeholder={t("checkout.phone")} pattern="[0-9]{10}" required />
                          </div>
                          <div className="col-12 mb-20">
                            <label>{t("checkout.address")}</label>
                            <input id="address" type="text" placeholder={t("checkout.address")} required />
                          </div>
                          <div className="col-md-6 col-12 mb-20">
                            <label>{t("checkout.country")}</label>
                            <input id="country" type="text" placeholder={t("checkout.country")} required />
                          </div>
                          <div className="col-md-6 col-12 mb-20">
                            <label>{t("checkout.town/city")}</label>
                            <input id="city" type="text" placeholder={t("checkout.town/city")} required />
                          </div>
                          <div className="col-12 mb-20">
                            <div className="check-box">
                              <input type="checkbox" id="create_account" />
                              <label htmlFor="create_account">{t("checkout.create_account")}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row">
                        {/* Cart Total */}
                        <div className="col-12 mb-60">
                          <h4 className="checkout-title">{t("checkout.cart_total")}</h4>
                          <div className="checkout-cart-total">
                            <h4>{t("checkout.product") + " "} <span>{t("checkout.total")}</span></h4>
                            <ul>
                              {
                                carts.map(prd => (
                                  <li key={prd.product_id}>{prd.product_name}<span>{prd.price * prd.quantity}</span></li>
                                ))
                              }
                            </ul>
                            <h4>{t("checkout.grand_total")} <span>{total}</span></h4>
                          </div>
                        </div>
                        {/* Payment Method */}
                        <div className="col-12">
                          <h4 className="checkout-title">{t("checkout.payment")}</h4>
                          <div className="checkout-payment-method">
                            <div className="single-method">
                              <input type="radio" id="payment_check" name="payment-method" defaultValue="check" defaultChecked />
                              <label htmlFor="payment_check">{t("checkout.payment_on_delivery")}</label>
                            </div>
                            <div className="single-method">
                              <input type="radio" id="payment_bank" name="payment-method" defaultValue="bank" disabled />
                              <label htmlFor="payment_bank">{t("checkout.payment_on_paypal")}</label>
                            </div>
                          </div>
                          <button onClick={createOrder} className="place-order">{t("checkout.place_order")}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Khong co san pham nao</h2>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default Checkout;