import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import queryString from "query-string"
import axios from 'axios';
import Pagination from '../../share/Pagination';


const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const [productList, setProductList] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    filter: ""
  });

  function handleClickPage(page: number) {
    setFilters({
      ...filters,
      page: page
    })
  }

  function handleClick(id: string) {
    const resUrl = "https://rubyclosetapi.herokuapp.com/api/v1/products/" + id;
    axios.delete(resUrl)
      .then(res => {
        console.log(res)
      })

    window.location.reload();
  }

  useEffect(() => {
    const filterString = queryString.stringify(filters);
    const requestUrl = `https://rubyclosetapi.herokuapp.com/api/v1/products?${filterString}`
    axios.get(requestUrl)
      .then(res => {
        const resJson = JSON.parse(JSON.stringify(res.data))
        setProductList(resJson.lists);
        console.log(productList.length);
        setTotal(resJson.totalProducts);
      })
      .catch(error => console.log(error))
  }, [filters])

  return (
    <div>
      <div className="table-user bg-light">
        <div className="col-md-12" >
          <p style={{ float: "right" }} className="result-show-message">Showing 1–{productList.length} of {total} results</p>
        </div>
        <table className="table table-bordered table-striped table-inverse">
          <thead className="thead-inverse">
            <tr>
              <th>{t("productadmin.product_name")}</th>
              <th>{t("productadmin.price")}</th>
              <th>{t("productadmin.descrip")}</th>
              <th>{t("productadmin.status")}</th>
              <th>{t("productadmin.action")}</th>
            </tr>
          </thead>
          <tbody>
            {
              productList.map(prd => (
                <tr key={prd.id}>
                  <td scope="row">{prd.product_name}</td>
                  <td>{prd.price}</td>
                  <td>{prd.description}</td>
                  <td>{prd.status}</td>
                  <td>
                    <a href={"/admin/product_detail/" + prd.id} style={{ "marginRight": 15 }} className="btn btn-primary">{t("useradmin.edit")}</a>
                    {
                      prd.status == 1 ? (
                        <a onClick={() => handleClick(prd.id)} className="btn btn-danger">{t("useradmin.unactive")}</a>
                      ) : (
                        <a onClick={() => handleClick(prd.id)} className="btn btn-success">{t("useradmin.active")}</a>
                      )
                    }

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination total={total} handleClickPage={handleClickPage} limit={8} page={filters.page} />
      </div>
    </div>
  );
}

export default ProductList;