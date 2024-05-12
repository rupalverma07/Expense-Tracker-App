
import React, { useState, useEffect } from "react";
import "./expense.css";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import Transactions from "../Recent Transaction/Transactions";
import ExpenseTrend from "../ExpenseTrend/ExpenseTrend";
import { useSnackbar } from "notistack";

// localStorage.setItem("expences", JSON.stringify(transactionItem));
// localStorage.setItem("balance", JSON.stringify(5000));
const balance =  localStorage.getItem("balance");
if(!balance){
  localStorage.setItem("balance", JSON.stringify(5000));
}
function getExpences() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  return storedExpenses;
}
function getWalletBalance() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  const walletBalance = JSON.parse(localStorage.getItem("balance"));
  // let totalAmount = 0;
  // if (storedExpenses) {
  //   storedExpenses.forEach((item) => (totalAmount += item.amount));
  // }
  // let newBalance = walletBalance - totalAmount;
  return walletBalance;
}
function getExpenseAmount() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  let totalAmount = 0;
  if (storedExpenses) {
    storedExpenses.forEach((item) => (totalAmount += item.amount));
  }

  return totalAmount;
}

function ExpenseHome() {
  const [walletBalance, setWalletBalance] = useState(getWalletBalance());
  const [expenses, setExpenses] = useState(getExpences() || []);
  const [expenseAmount, setExpenseAmount] = useState(getExpenseAmount() || 0);
  const [editMode, setEditMode] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [increaseFlag, setIncreaseFlag] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("balance", JSON.stringify(walletBalance));
  }, [expenses,increaseFlag]);

  const increaseWalletAmount = (amount) => {
    setWalletBalance(walletBalance + Number(amount));
    setIncreaseFlag(true)
  };
  const addExpense = (expense) => {
    
    if(walletBalance === 0){
      // alert("You have no sufficient balance")
      enqueueSnackbar("You have no sufficient balance", { variant: "error" });
      return;
    }
    if (editMode) {
      const edittedData = expenses.map((elem) => {
        if (elem.id === editExpenseId) {
          return {
            ...elem,
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
          };
        } else {
          return elem;
        }
      });
      setExpenses(edittedData);
    } else {
      const newExpences = [expense, ...expenses];
      console.log(newExpences, "new exp");
      setExpenses(newExpences);
      setWalletBalance(walletBalance - expense.amount);
      setExpenseAmount(expenseAmount + expense.amount);
    }
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    const deletedExpense = expenses.find((expense) => expense.id === id);
    setExpenses(updatedExpenses);
    setWalletBalance(walletBalance + deletedExpense.amount);
    setDeleteFlag(true);
    let deletedAmount = deletedExpense.amount;
    setExpenseAmount(expenseAmount - deletedAmount);
  };

  const editExpense = (id) => {
    // const editedExpense = expenses.find((expense) => expense.id === id);
    setEditMode(true);
    setEditExpenseId(id);
  };

  return (
    <>
      <div className="topCicle">
        <span className="legend" style={{ backgroundColor: "#CC2323" }}></span>
        <span className="legend" style={{ backgroundColor: "#F4BB4A" }}></span>
        <span className="legend" style={{ backgroundColor: "#48A14D" }}></span>
      </div>
      <div className="container">
        <h1>Expense Tracker</h1>
        <ExpenseCard
          wBalance={walletBalance}
          expences={expenseAmount}
          addExpense={addExpense}
          increaseWallet={increaseWalletAmount}
          data={expenses}
        />
 <div className="grid2">
          <Transactions
            data={expenses}
            deleteItem={deleteExpense}
            editItem={editExpense}
            addExpense={addExpense}
          />
                    <ExpenseTrend data={expenses} />
        </div>
      </div>
    </>
  );
}

export default ExpenseHome;
