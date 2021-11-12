import axios from "axios";
import image1 from "./default-image.jpg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import "../../Customer/Checkout/checkout.scss";


const Order_Detail: React.FC = (props) => {

  interface ParamsOrder {
    id: string
  }
  const { id } = useParams<ParamsOrder>();
  const { t } = useTranslation();
  const [carts, setCarts] = useState([] as any[]);
  const [image, setImage] = useState([] as any[]);
  const [orderList, setOrderList] = useState([] as any[]);
  const [order, setOrder] = useState({
    id: "",
    name: "",
    total_money: 0,
    address: "",
    phone: "",
    user_id: 0,
  });



  useEffect(() => {
    const res = "https://rubyclosetapi.herokuapp.com/api/v1/orders/" + id
    axios.get(res)
      .then(res => {
        let resJson = JSON.parse(JSON.stringify(res.data));
        console.log(resJson)
        setImage(resJson.image);
        console.log(orderList[52])
        setCarts(resJson.detail);
        setOrder(resJson.order);
        setOrderList(resJson.orderList);

      })
  }, [])

  function removeCart(id: number) {
    const res = "https://rubyclosetapi.herokuapp.com/api/v1/order_details/" + id;
    axios.delete(res)
      .then(res => {

        console.log(res.data)
      })
    window.location.reload();

  }

  function handeClick(id: string) {
    const res = "https://rubyclosetapi.herokuapp.com/api/v1/orders/" + id;
    axios.delete(res)
      .then(res => {
        console.log(res.data)
      })
    window.location.href = "/admin/orderList"
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form action="#">
              {/*=======  cart table  =======*/}
              <div className="cart-table table-responsive mb-40">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="pro-thumbnail">{t("cart_detail.image")}</th>
                      <th className="pro-title">{t("cart_detail.product")}</th>
                      <th className="pro-price">{t("cart_detail.price")}</th>
                      <th className="pro-remove">{t("cart_detail.remove")}</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      carts.map(prd => (
                        <tr key={prd.product_id}>
                          <td className="pro-thumbnail"><a href={"/detail/" + prd.id}>
                            {
                              image[prd.id] !== null ? (
                                <img width={350} height={350} src={"https://rubyclosetapi.herokuapp.com/" + image[prd.id]} className="img-fluid" alt="Product" />
                              ) : (
                                <img width={350} height={350} src={image1} className="img-fluid" alt="Product" />
                              )
                            }
                          </a></td>
                          <td className="pro-title"><a href={"/detail/" + prd.id}>{prd.product_name}</a></td>
                          <td className="pro-price"><span>{parseInt(prd.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></td>

                          <td className="pro-remove"><a onClick={() => removeCart(orderList[prd.id])}><i className="fa fa-trash-o" /></a></td>
                        </tr>
                      ))

                    }
                  </tbody>
                </table>
              </div>
              {/*=======  End of cart table  =======*/}
            </form>
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="col-lg-12 mb-20">
                  {/* Billing Address */}
                  <form className="checkout-form">
                    <div id="billing-form" className="mb-40">
                      <h4 className="checkout-title">{t("checkout.bill_address")}</h4>
                      <div className="row">
                        <div className="col-md-12 col-12 mb-20">
                          <label>{t("checkout.full_name")}</label>
                          <input id="fullname" defaultValue={order.name} type="text" placeholder={t("checkout.full_name")} disabled />
                        </div>

                        <div className="col-md-12 col-12 mb-20">
                          <label>{t("checkout.phone")}</label>
                          <input id="phone" defaultValue={order.phone} type="text" placeholder={t("checkout.phone")} pattern="[0-9]{10}" disabled />
                        </div>
                        <div className="col-12 mb-20">
                          <label>{t("checkout.address")}</label>
                          <input id="address" defaultValue={order.address} type="text" placeholder={t("checkout.address")} disabled />
                        </div>
                      </div>
                    </div>
                  </form>

                </div>

              </div>
              <div className="col-lg-6 col-12 d-flex">
                {/*=======  Cart summery  =======*/}
                <div className="cart-summary">
                  <div className="cart-summary-wrap">
                    <h4>{t("cart_detail.cart_summary")}</h4>
                    <p>{t("cart_detail.sub")} <span>{order.total_money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></p>
                    <p>{t("cart_detail.ship")} <span>0 VND</span></p>
                    <h2>{t("cart_detail.grand_total")} <span>{order.total_money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></h2>
                  </div>
                  <div className="cart-summary-button">
                    <button className="checkout-btn"><a style={{ textDecoration: "none", color: "black" }} onClick={() => handeClick(order.id)} >Hủy đơn</a></button>

                  </div>
                </div>
                {/*=======  End of Cart summery  =======*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order_Detail;