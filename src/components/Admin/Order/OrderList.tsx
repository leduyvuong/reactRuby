import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import queryString from "query-string"
import Pagination from "../../share/Pagination";
import { useParams } from "react-router";

const OrderList: React.FC = (props) => {

  const [orderList, setOrderList] = useState([] as any[]);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);

  interface ParamsOrder {
    type: string
  }
  const { type } = useParams<ParamsOrder>();

  const [filters, setFilters] = useState({
    page: 1,
    filter: type
  });

  function handleClickPage(page: number) {
    setFilters({
      ...filters,
      page: page
    })
  }

  function handeClickType(type: string, id: string) {
    const resUrl = "https://rubyclosetapi.herokuapp.com/api/v1/changeType?id=" + id + "&type=" + type;
    axios.post(resUrl)
      .then(res => console.log(res.data))

    window.location.reload();
  }

  useEffect(() => {
    const filterString = queryString.stringify(filters);
    const resUrl = `https://rubyclosetapi.herokuapp.com/api/v1/orders?${filterString}`
    axios.get(resUrl)
      .then(res => {
        const resJson = JSON.parse(JSON.stringify(res.data))
        setOrderList(resJson.orders);
        setTotal(resJson.total);
      })
    console.log(orderList);
  }, [filters])

  return (
    <div>
      <div className="table-user bg-light">
        <div className="col-md-12" >
          <p style={{ float: "right" }} className="result-show-message">Showing 1–{orderList.length} of {total} results</p>
        </div>
        <table className="table table-bordered table-striped table-inverse">
          <thead className="thead-inverse">
            <tr>
              <th>Người mua</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {
              orderList.map(ord => (
                <tr key={ord.id}>
                  <td scope="row">{ord.name + ord.id}</td>
                  <td>{ord.address}</td>
                  <td>{ord.phone}</td>
                  <td>{parseInt(ord.total_money).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                  <td>{
                    ord.status == "pending" ? (
                      <a onClick={() => handeClickType(ord.status, ord.id)} className="btn btn-secondary">Đang chờ duyệt</a>
                    ) : (

                      ord.status == "shipping" ? (
                        <a onClick={() => handeClickType(ord.status, ord.id)} className="btn btn-warning">Đang ship hàng</a>
                      ) : (
                        <a className="btn btn-success">Đã hoàn thành</a>
                      )
                    )
                  }</td>
                  <td>
                    <a href={"/admin/orderDetail/" + ord.id} style={{ "marginRight": 15 }} className="btn btn-primary">Chi tiết</a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination total={total} handleClickPage={handleClickPage} limit={8} page={filters.page} />
      </div>
    </div >
  );
}

export default OrderList;