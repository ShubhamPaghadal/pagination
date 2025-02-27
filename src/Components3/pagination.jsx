import axios from "axios";
import React, { useEffect, useState } from "react";

function Pagination() {
  const [tableData, setTableData] = useState();
  const [totalpage, setTotalpage] = useState(1);
  const [rowsOfPage, seTrowsOfPage] = useState(10);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setTableData(data));

    // axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
    //   console.log("res", res);
    //   setTableData(res.data);
    // });
  }, []);

  const itmOfLastItem = totalpage * rowsOfPage;

  console.log("itmOfLastItem", itmOfLastItem);

  const itmOfFirstItem = itmOfLastItem - rowsOfPage;
  const currentItems = tableData?.slice(itmOfFirstItem, itmOfLastItem);

  const handlChange = (newPages) => {
    setTotalpage(newPages);
  };

  return (
    <>
      {currentItems?.length > 0 &&
        currentItems?.map((item, ind) => {
          return (
            <h1 key={ind}>
              {" "}
              {ind} : --
              {item.title}
            </h1>
          );
        })}

      <button>Prev </button>
      {Array.from({ length: itmOfLastItem }, (_, i) => i + 1).map(
        (newPages) => {
          return (
            <>
              <button
                key={newPages}
                onClick={() => handlChange(newPages)}
                className={currentItems === newPages ? "active" : null}
              >
                {newPages}
              </button>
            </>
          );
        }
      )}

      <button>next </button>
    </>
  );
}

export default Pagination;
