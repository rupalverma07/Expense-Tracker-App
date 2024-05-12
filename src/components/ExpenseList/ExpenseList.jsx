import React, { useState } from "react";
import "./expenseList.css";
import foodIcon from "../../assets/Group 59.png";
import entertainmentIcon from "../../assets/Group 60.png";
import travelIcon from "../../assets/Group 61.png";
import editIcon from "../../assets/Group 75.png";
import deleteIcon from "../../assets/Group 76.png";
import { MdCurrencyRupee, MdHeight } from "react-icons/md";
import ExpenseModel from "../ExpenseModal/ExpenseModal";


function ExpenseList({ data, deleteItem, editItem, addExpense ,allData}) {
  const [editExpense, setEditExpense] = useState({});
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const deleteHandler = (id) => {
    deleteItem(id);
  };
  const editHandler = (id) => {
    editItem(id);
    setAddModalIsOpen(true);
    const editedExpense = allData.find((expense) => expense.id === id);
    setEditExpense(editedExpense);
   
  };
  return (
    <div className="listContainer">
      <div className="col1">
        <div style={{ marginRight: "10px" }}>
          {data.category === "Food" && (
            <img className="listIcon" src={foodIcon} />
          )}
          {data.category === "Entertainment" && (
            <img className="listIcon" src={entertainmentIcon} />
          )}
          {data.category === "Travel" && (
            <img className="listIcon" src={travelIcon} />
          )}
          {/* <img className="listIcon" src={titleIcon} /> */}
        </div>
        <div className="textContent">
          {" "}
          <h6 className="listTitle">{data.title}</h6>
          <p className="listDate">{data.date}</p>
        </div>
      </div>
      <div className="col2">
        <div className="listAmount">
          <MdCurrencyRupee />
        </div>
        <p className="listAmount">{data.amount}</p>
        <img
          src={editIcon}
          height="35"
          width="35"
          onClick={() => editHandler(data.id)}
        />
        <img
          src={deleteIcon}
          height="35"
          width="35"
          onClick={() => deleteHandler(data.id)}
        />
      </div>
      <ExpenseModel
        flag={addModalIsOpen}
        title="Edit Expenses"
        modelSetter={setAddModalIsOpen}
        type="addExpense"
        addExpense={addExpense}
        expenseToEdit={editExpense}
      />
    </div>
  );
}

export default ExpenseList;
