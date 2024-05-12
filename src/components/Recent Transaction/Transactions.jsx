import React, { useEffect, useState } from "react";
import "./transaction.css";
import leftBtn from "../../assets/Vector 9.png";
import rightBtn from "../../assets/Vector 9 (1).png";
import ExpenseList from "../ExpenseList/ExpenseList";

function Transactions({ data, deleteItem, editItem, addExpense }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 3));
  const dataPerPage = 3;
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data && data.slice(indexOfFirstData, indexOfLastData);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // console.log(TranscList);
  useEffect(() => {
    setTotalPages(data.length / 3);
  }, [data]);
  return (
    <div className="transcGrid">
      <h2>Recent Transactions</h2>
      <div className="card">
        {currentData.length > 0 ?(currentData.map((item) => (
            <ExpenseList
              data={item}
              deleteItem={deleteItem}
              editItem={editItem}
              addExpense={addExpense}
              allData={data}
            />
          ))):(<div className="summary"><p className="noData" style={{color:"#000"}}>No Data Available</p></div>)}
        <div className="pagination">
          <button
            className="pageBtn"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <img src={leftBtn} />
          </button>
          <span className="pageNo">{currentPage}</span>
          <button
            className="pageBtn"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <img src={rightBtn} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
