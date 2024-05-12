import React, { useEffect, useState } from "react";
import Model from "react-modal";
import "../ExpenseCard/expenseCard.css";

function ExpenseModel({ title, flag, modelSetter, addExpense, type, expenseToEdit }) {
  
  const [titleInput, setTitleInput] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [increaseAmount, setIncreaseAmount] = useState("");
  const dropdownHandler = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeBalance = () => {
    addExpense(increaseAmount);
    setIncreaseAmount("")
  };
  const formateDate = (date) =>{
    console.log(date)
    const newDate = new Date(date)
    const dateArr = newDate.toString().split(" ") 
    console.log(newDate.toString().split(" "))
    const fomattedDate = `${dateArr[1]} ${dateArr[2]},${dateArr[3]}`
    return fomattedDate
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !amount || !category || !date) return;
    const expense = {
      id: new Date().getTime(),
      title: titleInput,
      amount: parseFloat(amount),
      category,
      date:formateDate(date),
    };
    addExpense(expense);
    setTitleInput("");
    setAmount("");
    setCategory("");
    setDate("");
  };
  useEffect(() => {
    if (expenseToEdit) {
      setTitleInput(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);
  return (
    <>
      {type === "addAmount" ? (
        <Model
          isOpen={flag}
          style={{
            overlay: {
              position: "fixed",
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              width: "570px",
              height: "184px",
              top: "196px",
              left: "371px",
              borderRadius: "15px",
            },
            content: {
              position: "absolute",
              top: "0px",
              left: "0px",
              right: "0px",
              bottom: "0px",
              border: "1px solid #ccc",
              background: "#EFEFEFD9",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "15px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <h2 className="mTitle">{title}</h2>
          <div className="">
            <input
              type="text"
              value={increaseAmount}
              onChange={(e) => setIncreaseAmount(e.target.value)}
              placeholder="Income Amount"
              className="mInput"
            />
            <button className="mAdd" onClick={handleChangeBalance}>
              Add Balance
            </button>
            <button className="mCancel" onClick={() => modelSetter(false)}>
              Cancel
            </button>
          </div>
        </Model>
      ) : (
        <Model
          isOpen={flag}
          style={{
            overlay: {
              position: "fixed",
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              width: "570px",
              height: "350px",
              top: "106px",
              left: "371px",
              borderRadius: "15px",
            },
            content: {
              position: "absolute",
              top: "0px",
              left: "0px",
              right: "0px",
              bottom: "0px",
              border: "1px solid #ccc",
              background: "#EFEFEFD9",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "15px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <h2 className="mTitle">{title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mContent">
              {/* <input type="text" placeholder="Income Amount" className="mInput" />
          <button className="mAdd">Add Balance</button>
          <button className="mCancel" onClick={() => setModalIsOpen(false)}>
            Cencel
          </button> */}

              <input
                type="text"
                placeholder="Title"
                className="mInput"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price"
                className="mInput"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <select
                className="mInput"
                value={category}
                onChange={dropdownHandler}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
              </select>
              {/* <input
              type="text"
              placeholder="Select Category"
              className="mInput"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            /> */}
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="mInput"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <button className="mAdd" style={{ width: "223px" }}>
                Add Expense
              </button>
              <button className="mCancel" onClick={() => modelSetter(false)}>
                Cencel
              </button>
            </div>
          </form>
        </Model>
      )}
    </>
  );
}

export default ExpenseModel;
