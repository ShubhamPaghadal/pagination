import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pagination.css";

function Pagination() {
  const [tableData, setTableData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      console.log("res", res);
      setTableData(res?.data);
    });
  }, []);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentPageData = tableData?.slice(indexOfFirst, indexOfLast);
  console.log("currentPageData", currentPageData);

  const totalPage = Math.ceil(tableData?.length / rowsPerPage);
  console.log("totalPage", totalPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlprevPage = (pre) => {
    setCurrentPage((pre) => pre - 1, 1);
  };

  const handlnextPage = (pre) => {
    setCurrentPage((pre) => pre + 1, currentPage);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>userId</th>
            <th>title</th>
            <th>completed</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData?.length > 0 &&
            currentPageData.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.userId}</td>
                  <td>{value.title}</td>
                  <td>{value.completed ? "Yes" : "No"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlprevPage()} disabled={currentPage === 1}>
          prev
        </button>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? "active" : null}
            >
              {pageNumber}
            </button>
          )
        )}
        <button onClick={() => handlnextPage()} disabled={currentPage === 20}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
