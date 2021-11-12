import product01 from "./images/product01.webp";
import "./index.scss";

function Product(props: any) {
  return (
    <div className="gf-product tab-slider-sub-product col-lg-3">
      <div className="image">
        <a href="single-product.html">
          <img width={350} height={350} src={product01} className="img-fluid" alt="" />
        </a>
        <div className="product-hover-icons">
          <a className="active" href="/#" data-tooltip="Add to cart"> <span className="far fa-cart-plus" /></a>
          <a href="/#" data-tooltip="View"> <span className="fas fa-eye" /> </a>
        </div>
      </div>
      <div className="product-content">
        <div className="product-categories">
          <a href="shop-left-sidebar.html">Fast Foods</a>,
          <a href="shop-left-sidebar.html">Vegetables</a>
        </div>
        <h3 className="product-title"><a className="text-dark" href="single-product.html">Sed tempor ehicula non commodo</a></h3>
        <div className="price-box">
          <span className="discounted-price">$80.00</span>
        </div>
      </div>
    </div>
  );
}
export default Product;