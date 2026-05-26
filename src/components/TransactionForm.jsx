import { useEffect, useState } from "react";

function TransactionForm({
  addTransaction,
  editingTransaction,
  handleUpdate,
}) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [type, setType] =
    useState("Expense");

  const [date, setDate] =
    useState("");

  /* =========================
     CATEGORIES
  ========================= */

  const defaultCategories = [

    "Food",
    "Entertainment",
    "Utilities",
    "Health",
    "Education",
    "Transportation",
    "Rent",
    "Groceries",
    "Dining",
    "Fitness",
    "Shopping",
    "Travel",
    "Other",

  ];

  const customCategories =
    JSON.parse(
      localStorage.getItem(
        "preferences"
      )
    )?.customCategories || [];

  const categories = [

    ...defaultCategories,

    ...customCategories,

  ];

  /* =========================
     LOAD EDIT DATA
  ========================= */

  useEffect(() => {

    if (editingTransaction) {

      setTitle(
        editingTransaction.title
      );

      setAmount(
        editingTransaction.amount
      );

      setCategory(
        editingTransaction.category
      );

      setType(
        editingTransaction.type
      );

      setDate(
        editingTransaction.date
      );
    }

  }, [editingTransaction]);

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {

    setTitle("");

    setAmount("");

    setCategory("Food");

    setType("Expense");

    setDate("");
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const transaction = {

        title,

        amount:
          Number(amount),

        category,

        type,

        date,

      };

      /* =========================
         UPDATE
      ========================= */

      if (editingTransaction) {

        await handleUpdate({

          ...editingTransaction,

          ...transaction,

        });

      }

      /* =========================
         ADD
      ========================= */

      else {

        await addTransaction(
          transaction
        );
      }

      resetForm();
    };

  return (

    <div className="transaction-form">

      <form onSubmit={handleSubmit}>

        {/* TITLE */}

        <input
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          required
        />

        {/* AMOUNT */}

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          required
        />

        {/* CATEGORY */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >

          {categories.map(
            (cat) => (

              <option
                key={cat}
              >
                {cat}
              </option>

            )
          )}

        </select>

        {/* TYPE */}

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
        >

          <option>
            Expense
          </option>

          <option>
            Income
          </option>

        </select>

        {/* DATE */}

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
          required
        />

        {/* BUTTON */}

        <button type="submit">

          {editingTransaction

            ? "Update Transaction"

            : "Add Transaction"}

        </button>

      </form>

    </div>
  );
}

export default TransactionForm;