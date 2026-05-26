import { useState } from "react";

function TransactionList({
  transactions,
  deleteTransaction,
  handleEdit,
}) {

  /* =========================
     SEARCH
  ========================= */

  const [searchTerm, setSearchTerm] =
    useState("");

  /* =========================
     FILTERS
  ========================= */

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    selectedType,
    setSelectedType,
  ] = useState("All");

  const [
    selectedMonth,
    setSelectedMonth,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  /* =========================
     UNIQUE CATEGORIES
  ========================= */

  const categories = [

    "All",

    ...new Set(
      transactions.map(
        (transaction) =>
          transaction.category
      )
    ),

  ];

  /* =========================
     FILTER + SORT
  ========================= */

  let filteredTransactions =
    transactions.filter(
      (transaction) => {

        /* SEARCH */

        const matchesSearch =

          transaction.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          transaction.category
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        /* CATEGORY */

        const matchesCategory =

          selectedCategory ===
            "All" ||

          transaction.category ===
            selectedCategory;

        /* TYPE */

        const matchesType =

          selectedType === "All" ||

          transaction.type ===
            selectedType;

        /* MONTH */

        const transactionMonth =
          new Date(
            transaction.date
          ).toLocaleString(
            "default",
            {
              month: "long",
            }
          );

        const matchesMonth =

          selectedMonth ===
            "All" ||

          transactionMonth ===
            selectedMonth;

        return (

          matchesSearch &&

          matchesCategory &&

          matchesType &&

          matchesMonth
        );
      }
    );

  /* =========================
     SORTING
  ========================= */

  filteredTransactions.sort(
    (a, b) => {

      if (
        sortBy === "Newest"
      ) {

        return (
          new Date(b.date) -
          new Date(a.date)
        );
      }

      if (
        sortBy === "Oldest"
      ) {

        return (
          new Date(a.date) -
          new Date(b.date)
        );
      }

      if (
        sortBy ===
        "Highest Amount"
      ) {

        return (
          Number(b.amount) -
          Number(a.amount)
        );
      }

      if (
        sortBy ===
        "Lowest Amount"
      ) {

        return (
          Number(a.amount) -
          Number(b.amount)
        );
      }

      return 0;
    }
  );

  return (

    <div className="transaction-list">

      {/* TOP */}

      <div className="transaction-top">

        <h2>
          Recent Transactions
        </h2>

        <input
          type="text"
          placeholder="Search transactions..."
          className="search-input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>

      {/* FILTERS */}

      <div className="filters-container">

        {/* CATEGORY */}

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
        >

          {categories.map(
            (category) => (

              <option
                key={category}
              >
                {category}
              </option>

            )
          )}

        </select>

        {/* TYPE */}

        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(
              e.target.value
            )
          }
        >

          <option>
            All
          </option>

          <option>
            Income
          </option>

          <option>
            Expense
          </option>

        </select>

        {/* MONTH */}

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              e.target.value
            )
          }
        >

          <option>
            All
          </option>

          <option>
            January
          </option>

          <option>
            February
          </option>

          <option>
            March
          </option>

          <option>
            April
          </option>

          <option>
            May
          </option>

          <option>
            June
          </option>

          <option>
            July
          </option>

          <option>
            August
          </option>

          <option>
            September
          </option>

          <option>
            October
          </option>

          <option>
            November
          </option>

          <option>
            December
          </option>

        </select>

        {/* SORT */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >

          <option>
            Newest
          </option>

          <option>
            Oldest
          </option>

          <option>
            Highest Amount
          </option>

          <option>
            Lowest Amount
          </option>

        </select>

      </div>

      {/* EMPTY */}

      {filteredTransactions.length ===
      0 ? (

        <p>
          No transactions found.
        </p>

      ) : (

        filteredTransactions.map(
          (transaction) => {

            /* ORIGINAL INDEX */

            const originalIndex =
              transactions.findIndex(
                (t) =>

                  t.title ===
                    transaction.title &&

                  t.amount ===
                    transaction.amount &&

                  t.date ===
                    transaction.date
              );

            return (

              <div
                key={originalIndex}
                className="transaction-card"
              >

                {/* LEFT */}

                <div>

                  <h3>
                    {transaction.title}
                  </h3>

                  <p>
                    {
                      transaction.category
                    }
                  </p>

                  <small>
                    {transaction.date}
                  </small>

                </div>

                {/* CENTER */}

                <div>

                  <p
                    className={
                      transaction.type ===
                      "Income"

                        ? "income-text"

                        : "expense-text"
                    }
                  >

                    {transaction.type}

                  </p>

                  <h3>
                    $
                    {transaction.amount}
                  </h3>

                </div>

                {/* RIGHT */}

                <div
                  className="transaction-actions"
                >

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        originalIndex
                      )
                    }
                  >

                    ✏️

                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTransaction(
                        originalIndex
                      )
                    }
                  >

                    🗑️

                  </button>

                </div>

              </div>

            );
          }
        )

      )}

    </div>
  );
}

export default TransactionList;