
import image1 from "./default-image.jpg";
import "./cart.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AlertSuccess from "../../share/AlertSuccess";

const Cart: React.FC = () => {
  let check = 0;
  const [carts, setCarts] = useState([] as any[]);
  const [checkProduct, setCheckProduct] = useState([] as any[]);
  const { t } = useTranslation();

  function findIndexPrd(id: number) {
    let index: number = -1;
    for (let i = 0; carts.length; i++) {
      if (carts[i].product_id === id) {
        index = i;
        break;
      }
    }
    return index;
  }


  function handleClick() {
    const reqUrl = "https://rubyclosetapi.herokuapp.com/api/v1/checkProduct"
    axios.post(reqUrl, {
      list: carts
    })
      .then(res => {
        const resJSON = JSON.parse(JSON.stringify(res.data));
        if (!resJSON.success) {
          setCheckProduct(resJSON.stringProduct)
          console.log(checkProduct);
        } else {
          window.location.href = "/checkout"
        }
      })
  }

  useEffect(() => {

    setCarts(JSON.parse(localStorage.getItem("cart") || "[]"));
    console.log(carts);
  }, [check])

  let subTotal = 0;
  carts.map(prd => {
    subTotal += (prd.price * prd.quantity);
  })

  function removeCart(id: number) {
    let index = findIndexPrd(id);
    if (index != -1) {
      carts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(carts));
      window.location.reload();
    }

  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(carts));
    check++;
  }

  return (

    <div className="page-section section mb-50">
      {
        carts.length > 0 ? (
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
                          <th className="pro-quantity">{t("cart_detail.quantity")}</th>
                          <th className="pro-subtotal">{t("cart_detail.total")}</th>
                          <th className="pro-remove">{t("cart_detail.remove")}</th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          carts.map(prd => (
                            <tr key={prd.product_id}>
                              <td className="pro-thumbnail"><a href={"/detail/" + prd.product_id}>
                                {
                                  prd.image !== "https://rubyclosetapi.herokuapp.com/undefined" ? (
                                    <img width={350} height={350} src={prd.image} className="img-fluid" alt="Product" />
                                  ) : (
                                    <img width={350} height={350} src={image1} className="img-fluid" alt="Product" />
                                  )
                                }
                              </a></td>
                              <td className="pro-title"><a href={"/detail/" + prd.product_id}>{prd.product_name}</a></td>
                              <td className="pro-price"><span>{prd.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></td>
                              <td className="pro-quantity">
                                <div className="pro-qty">
                                  <input id={"quantity" + prd.product_id} type="text" defaultValue={prd.quantity} disabled />

                                </div>
                              </td>
                              <td className="pro-subtotal">
                                <span>{(prd.price * prd.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                <span hidden className="subTotalH">{prd.price * prd.quantity}</span>
                              </td>
                              <td className="pro-remove"><a onClick={() => removeCart(prd.product_id)}><i className="fa fa-trash-o" /></a></td>
                            </tr>
                          ))

                        }
                      </tbody>
                    </table>
                    <AlertSuccess errors={checkProduct} />
                  </div>
                  {/*=======  End of cart table  =======*/}
                </form>
                <div className="row">
                  <div className="col-lg-6 col-12">

                    {/*=======  End of Discount Coupon  =======*/}
                  </div>
                  <div className="col-lg-6 col-12 d-flex">
                    {/*=======  Cart summery  =======*/}
                    <div className="cart-summary">
                      <div className="cart-summary-wrap">
                        <h4>{t("cart_detail.cart_summary")}</h4>
                        <p>{t("cart_detail.sub")} <span>{subTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></p>
                        <p>{t("cart_detail.ship")} <span>0 VND</span></p>
                        <h2>{t("cart_detail.grand_total")} <span>{subTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></h2>
                      </div>
                      <div className="cart-summary-button">
                        <button className="checkout-btn"><a style={{ textDecoration: "none", color: "black" }} onClick={handleClick}>Checkout</a></button>

                      </div>
                    </div>
                    {/*=======  End of Cart summery  =======*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Không có sản phẩm nào</h2>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default Cart;