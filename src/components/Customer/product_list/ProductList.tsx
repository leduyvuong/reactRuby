import React, { useEffect, useState } from "react";
import queryString from "query-string"
import "./ProductList.scss";
import banner from "./background3.jpg";
import img from "./default-image.jpg";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Pagination from "../../share/Pagination";

const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState({
    lists: [] as any[],
    totalProducts: 0,
    images: [] as any[]
  });
  const [filters, setFilters] = useState({
    page: 1,
    filter: "sort_name_asc"
  })

  const urlImage = "https://rubyclosetapi.herokuapp.com/";

  useEffect(() => {
    async function fetchCategories() {
      const filterString = queryString.stringify(filters);
      const requestUrl = `https://rubyclosetapi.herokuapp.com/api/v1/products?${filterString}`
      await axios.get(requestUrl)
        .then(res => {
          let resJson = JSON.parse(JSON.stringify(res.data));
          setProducts(resJson);
        });
    }
    fetchCategories();

  }, [filters])


  function sortFilter() {
    var selectBox = document.getElementById("sort-by") as HTMLSelectElement;
    var selectedValue = selectBox.value;
    setFilters({
      ...filters,
      filter: selectedValue
    })
  }

  function handleClickPage(page: number) {
    setFilters({
      ...filters,
      page: page
    })
  }

  return (

    <div className="shop-page-container mb-50">
      <div className="container ">
        <div className="row">
          <div className="col-lg-12 mb-sm-35 mb-xs-35">
            {/*=======  shop page banner  =======*/}
            <div className="shop-page-banner mb-35">
              <a href="shop-left-sidebar.html">
                <img width={870} height={331} src={banner} className="img-fluid" alt="" />
              </a>
            </div>
            {/*=======  End of shop page banner  =======*/}
            {/*=======  Shop header  =======*/}
            <div className="shop-header mb-35">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex align-items-center">
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 d-flex flex-column flex-sm-row justify-content-between align-items-left align-items-sm-center">
                  {/*=======  Sort by dropdown  =======*/}
                  <div className="sort-by-dropdown d-flex align-items-center mb-xs-10">
                    <p className="mr-10">{t("product_list.sort_by")} : </p>
                    <select name="sort-by" id="sort-by" onChange={() => sortFilter()} className="nice-select">
                      <option value="sort_name_desc">{t("product_list.sort_by_rating")}</option>
                      <option value="drink">{t("drink")}</option>
                      <option value="food">{t("food")}</option>
                      <option value="sort_name_asc">{t("product_list.sort_by_name_asc")}</option>
                      <option value="sort_name_desc">{t("product_list.sort_by_name_dec")}</option>
                      <option value="sort_price_asc">{t("product_list.sort_by_price_asc")}</option>
                      <option value="sort_price_desc">{t("product_list.sort_by_price_dec")}</option>
                    </select>
                  </div>
                  {/*=======  End of Sort by dropdown  =======*/}
                  <p className="result-show-message">Showing 1–{products.lists.length} of {products.totalProducts} results</p>
                </div>
              </div>
            </div>
            {/*=======  End of Shop header  =======*/}
            {/*=======  Grid list view  =======*/}
            <div className="shop-product-wrap list row no-gutters mb-35 single-product-content-container">
              {
                products.lists.map(prd => (
                  < div key={prd.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                    {/*=======  Grid view product  =======*/}
                    <div className="gf-product shop-grid-view-product">
                      <div className="image">
                        <a href={"/detail/" + prd.id}>
                          <span className="onsale">Sale!</span>
                          {
                            products.images[prd.id] == null ? (
                              <img src={img} className="img-fluid img-prd" alt="" />
                            ) : (
                              <img src={urlImage + products.images[prd.id]} className="img-fluid  img-prd" alt="" />
                            )
                          }

                        </a>
                        <div className="product-hover-icons">
                          <a href="#" data-tooltip="Add to cart"> <i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-categories" style={{ marginTop: 50 }}>

                          {prd.category_id == 1 ? <a href={`/detail/${prd.id}`}>{t("food")}</a> : <a href={`/detail/${prd.id}`}>{t("drink")}</a>}
                        </div>
                        <h3 className="product-title"><a href={`/detail/${prd.id}`}>{prd.product_name}</a></h3>
                        <div className="price-box">
                          <span className="discounted-price">{parseInt(prd.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                      </div>
                    </div>
                    {/*=======  End of Grid view product  =======*/}
                    {/*=======  Shop list view product  =======*/}
                    {/*=======  End of Shop list view product  =======*/}
                  </div>
                ))
              }
            </div>
            {/*=======  End of Grid list view  =======*/}
            {/*=======  Pagination container  =======*/}
            <Pagination total={products.totalProducts} handleClickPage={handleClickPage} limit={8} page={filters.page} />
            {/*=======  End of Pagination container  =======*/}
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProductList;