import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

import "../styles/dashboard.css";

function Transactions({
  transactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  darkMode,
  user,
}) {

  /* =========================
     EDIT STATES
  ========================= */

  const [editingTransaction,
    setEditingTransaction] =
    useState(null);

  /* =========================
     HANDLE EDIT
  ========================= */

  const handleEdit = (
    index
  ) => {

    setEditingTransaction(
      transactions[index]
    );
  };

  /* =========================
     HANDLE UPDATE
  ========================= */

  const handleUpdate =
    async (
      updatedTransaction
    ) => {

      try {

        await updateTransaction(
          updatedTransaction
        );

        setEditingTransaction(
          null
        );

      } catch (error) {

        console.error(error);
      }
    };

  return (

    <div
      className={
        darkMode
          ? "dashboard-container dark"
          : "dashboard-container"
      }
    >

      {/* SIDEBAR */}

      <Sidebar user={user} />

      {/* MAIN */}

      <div className="main-content">

        <Navbar />

        {/* HEADER */}

        <div className="dashboard-heading">

          <h1>
            💳 Transactions
          </h1>

          <p>
            Add and manage your
            transactions.
          </p>

        </div>

        {/* FORM */}

        <TransactionForm

          addTransaction={
            addTransaction
          }

          editingTransaction={
            editingTransaction
          }

          handleUpdate={
            handleUpdate
          }

        />

        {/* LIST */}

        <TransactionList

          transactions={
            transactions
          }

          deleteTransaction={
            deleteTransaction
          }

          handleEdit={
            handleEdit
          }

        />

      </div>

    </div>
  );
}

export default Transactions;