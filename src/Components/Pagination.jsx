// import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pagination.css";
function Pagination() {
  const [table, setTable] = useState();
  const [currentpage, setCurrentpage] = useState(1);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState("");
  const [passValue, setPassValue] = useState("");
  // const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    const data = fetch("https:/ /dummyjson.com/users?limit=0").then((res) => {
      res.json()
      console.log(res);
      setTable(res?.data);
      // setPassValue(currentItems);
    });
  }, []);

  const indexOfLastItem = currentpage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = table?.users?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);
  const totalPage = Math.ceil(table?.total / rows);
  console.log("table", table, totalPage);

  
  // getApicall = (page, row) =>{
  //     // https://dummyjson.com/users?page={page}&row={rowValue}
  // }

  // useEffect(() => {
  //     getApicall(1, 10)
  //   }, []);

  //   handlePageChange = (value) => {
  //     // setCurrentpage(value)
  //     getApicall(value, rows)
  //   }

  //   handleRowchange = () => {
  //     setRows(rowValue);
  //     getApicall(page, row);
  //   };

  // Method 2

  // useEffect(() => {
  //     getApicall(currentpage, rows)
  //   }, [currentpage, rows]);

  //   const handlPage = (pagenumber) => {
  //     setCurrentpage(pagenumber);
  //   };

  const handlPage = (pageNumber) => {
    setCurrentpage(pageNumber);
  };

  const handlnext = () => {
    setCurrentpage((prev) => Math.max(prev + 1, totalPage));
  };
  const handlpre = () => {
    setCurrentpage((prev) => Math.max(prev - 1, 1));
  };

  const handleSearch = (e) => {
    setSearch(e?.target?.value);
    // const FilterOutData = currentItems?.filter((curValue) => {
    //   console.log("curValue", curValue);
    //   return curValue?.firstName
    //     ?.toLowerCase()
    //     ?.includes(e?.target?.value?.toLowerCase());
    // });
    
    // setTable({ ...table, users: FilterOutData });
    // console.log(e.target.value);
    // console.log("FilterOutData", FilterOutData);
    // setCurrentpage(1); // Reset to first page when searching
  };

  // console.log(handlSearchbar());
  return (
    <>
      <input
        type="text"
        value={search}
        placeholder="Search name & Email"
        onChange={(e) => handleSearch(e)}
      />
      <table className="table" onClick={() => alert("click")}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Gender</td>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 &&
            currentItems?.map((value, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.email}</td>
                    <td>{value.gender}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlpre()} disabled={currentpage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            onClick={() => handlPage(index + 1)}
            className={currentpage === index + 1 ? "active" : ""}
          >
            {" "}
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlnext()}
          disabled={currentpage === totalPage}
        >
          next
        </button>
      </div>
    </>
  );
}

export default Pagination;
