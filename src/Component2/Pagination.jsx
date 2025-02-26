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

  //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    </>
  );
}

export default Pagination;
