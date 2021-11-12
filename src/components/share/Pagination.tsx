import React, { useEffect, useState } from 'react';

interface PaginationProps {
  total: number,
  handleClickPage: (page: number) => void,
  limit: number,
  page: number
};

const Pagination: React.FC<PaginationProps> = props => {
  const total = props.total;

  let totalProducts = 0;
  if (total > props.limit)
    totalProducts = total % props.limit === 0 ? Math.floor(total / props.limit) : Math.floor(total / props.limit) + 1;
  const [paginationList, setPaginationList] = useState([] as number[]);
  let list = [] as number[];
  for (let i = 1; i <= totalProducts; i++) {
    list.push(i);
  }



  return (
    <div>
      <div className="pagination-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  pagination-content  =======*/}
              <div className="pagination-content text-center">
                <ul>
                  {
                    list.map(pageNumber => (
                      props.page === pageNumber ? (
                        <li key={pageNumber}><a className="active" onClick={() => props.handleClickPage(pageNumber)}>{pageNumber}</a></li>
                      ) : (
                        <li key={pageNumber}><a onClick={() => props.handleClickPage(pageNumber)}>{pageNumber}</a></li>
                      )

                    ))
                  }


                </ul>
              </div>
              {/*=======  End of pagination-content  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;