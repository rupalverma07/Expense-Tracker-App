import React, { useState } from "react";
import "./expenseCard.css";
import { MdCurrencyRupee, MdHeight } from "react-icons/md";
import Model from "react-modal";
import ExpenseSummary from "../ExpenseSummary/ExpenseSummary";
import ExpenseModel from "../ExpenseModal/ExpenseModal";

function ExpenseCard({ wBalance, expences, addExpense, data, increaseWallet }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  return (
    <div className="gridContainer">
      <div className="col">
        <h2 className="balance" style={{ display: "flex" }}>
          Wallet Balance:
          <span className="amount" style={{ display: "flex" }}>
            <div>
              <MdCurrencyRupee />
            </div>

            {/* {"20B9"} */}
            {""}
            {wBalance}
          </span>
        </h2>
        <button className="income" onClick={() => setModalIsOpen(true)}>
          + Add Income
        </button>
        <ExpenseModel
          flag={modalIsOpen}
          title="Add Balance"
          modelSetter={setModalIsOpen}
          addExpense={increaseWallet}
          type="addAmount"
        />
      </div>
      <div className="col">
        <h2 className="balance">
          Expences:
          <span className="amount">
            <MdCurrencyRupee />
            {expences}
          </span>
        </h2>
        <button
          className="income"
          style={{
            background:
              "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)",
            border: "1px solid #FF9595",
          }}
          onClick={() => setAddModalIsOpen(true)}
        >
          + Add Expense
        </button>
        <ExpenseModel
          flag={addModalIsOpen}
          title="Add Expenses"
          modelSetter={setAddModalIsOpen}
          addExpense={addExpense}
          type="addExpense"
        />
      </div>
      <div  style={{ width: "30%", height: "200px" }}>
        {data.length > 0 ? (<ExpenseSummary data={data} />):(
        <div className="summary"><p className="noData">No Data Available</p></div>)}
        {/* <PieChartComp data={data} /> */}
        <div className="legendContainer">
          <div>
            <span
              className="legendPie"
              style={{ backgroundColor: "#A000FF" }}
            ></span>
            <span className="legendText">Food</span>
          </div>
          <div>
            <span
              className="legendPie"
              style={{ backgroundColor: "#FF9304" }}
            ></span>
            <span className="legendText">Entertainment</span>
          </div>
          <div>
            <span
              className="legendPie"
              style={{ backgroundColor: "#FDE006" }}
            ></span>
            <span className="legendText">Travel</span>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default ExpenseCard;
