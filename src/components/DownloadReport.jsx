import { useState }
from "react";

import jsPDF
from "jspdf";

import autoTable
from "jspdf-autotable";

function DownloadReport({

  transactions,

  preferences,

}) {

  const [
    selectedMonth,
    setSelectedMonth,
  ] = useState("All");

  /* =========================
     GENERATE PDF
  ========================= */

  const generatePDF =
    () => {

      /* =========================
         FILTER MONTH
      ========================= */

      const filteredTransactions =

        selectedMonth === "All"

          ? transactions

          : transactions.filter(
              (transaction) => {

                const date =
                  new Date(
                    transaction.date
                  );

                const month =
                  date.toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  );

                return (
                  month ===
                  selectedMonth
                );
              }
            );

      /* =========================
         CALCULATIONS
      ========================= */

      const income =
        filteredTransactions
          .filter(
            (t) =>
              t.type ===
              "Income"
          )
          .reduce(
            (acc, t) =>
              acc +
              Number(t.amount),
            0
          );

      const expenses =
        filteredTransactions
          .filter(
            (t) =>
              t.type ===
              "Expense"
          )
          .reduce(
            (acc, t) =>
              acc +
              Number(t.amount),
            0
          );

      const plannedSavings =
        Number(
          preferences.plannedSavings || 0
        );

      const savingsGoal =
        Number(
          preferences.savingsGoal || 0
        );

      /* =========================
         BALANCE
      ========================= */

      const balance =
        income - expenses;

      /* =========================
         CATEGORY TOTALS
      ========================= */

      const categoryTotals =
        {};

      filteredTransactions
        .filter(
          (t) =>
            t.type ===
            "Expense"
        )
        .forEach(
          (transaction) => {

            const category =
              transaction.category;

            const amount =
              Number(
                transaction.amount
              );

            if (
              categoryTotals[
                category
              ]
            ) {

              categoryTotals[
                category
              ] += amount;

            } else {

              categoryTotals[
                category
              ] = amount;
            }
          }
        );

      /* =========================
         HIGHEST CATEGORY
      ========================= */

      let highestCategory =
        "None";

      let highestAmount = 0;

      Object.entries(
        categoryTotals
      ).forEach(
        ([category, amount]) => {

          if (
            amount >
            highestAmount
          ) {

            highestAmount =
              amount;

            highestCategory =
              category;
          }
        }
      );

      /* =========================
         NEEDS VS WANTS
      ========================= */

      const needsWantCategories =
        preferences
          ?.needsWantCategories || {};

      let needsTotal = 0;

      let wantsTotal = 0;

      filteredTransactions
        .filter(
          (t) =>
            t.type ===
            "Expense"
        )
        .forEach(
          (transaction) => {

            const type =
              needsWantCategories[
                transaction.category
              ];

            const amount =
              Number(
                transaction.amount
              );

            if (
              type === "Need"
            ) {

              needsTotal += amount;

            } else {

              wantsTotal += amount;
            }
          }
        );

      /* =========================
         AI SUGGESTION
      ========================= */

      let aiSuggestion =
        "";

      if (
        wantsTotal >
        needsTotal
      ) {

        aiSuggestion =
          "Your wants spending is higher than needs. Reduce shopping or dining.";

      } else if (
        balance < 0
      ) {

        aiSuggestion =
          "Your balance is negative. Lower unnecessary expenses.";

      } else {

        aiSuggestion =
          "Great financial discipline this month.";
      }

      /* =========================
         PDF
      ========================= */

      const doc =
        new jsPDF();

      /* TITLE */

      doc.setFontSize(22);

      doc.text(
        "Expense Tracker AI Report",
        20,
        20
      );

      doc.setFontSize(14);

      doc.text(
        `${selectedMonth} Report`,
        20,
        30
      );

      /* SUMMARY */

      doc.setFontSize(13);

      doc.text(
        `Income: $${income}`,
        20,
        50
      );

      doc.text(
        `Expenses: $${expenses}`,
        20,
        60
      );

      doc.text(
        `Planned Savings: $${plannedSavings}`,
        20,
        70
      );

      doc.text(
        `Balance: $${balance}`,
        20,
        80
      );

      doc.text(
        `Savings Goal: $${savingsGoal}`,
        20,
        90
      );

      /* NEEDS VS WANTS */

      doc.setFontSize(16);

      doc.text(
        "Needs vs Wants",
        20,
        110
      );

      doc.setFontSize(12);

      doc.text(
        `Needs Spending: $${needsTotal}`,
        20,
        122
      );

      doc.text(
        `Wants Spending: $${wantsTotal}`,
        20,
        132
      );

      /* AI INSIGHTS */

      doc.setFontSize(16);

      doc.text(
        "AI Insights",
        20,
        152
      );

      doc.setFontSize(12);

      doc.text(
        `Highest Spending Category: ${highestCategory} ($${highestAmount})`,
        20,
        164
      );

      doc.text(
        aiSuggestion,
        20,
        176,
        {
          maxWidth: 170,
        }
      );

      /* =========================
         GROUPED TRANSACTIONS
      ========================= */

      const groupedTransactions =
        {};

      filteredTransactions

        .filter(
          (t) =>
            t.type ===
            "Expense"
        )

        .forEach(
          (transaction) => {

            const category =
              transaction.category;

            if (
              !groupedTransactions[
                category
              ]
            ) {

              groupedTransactions[
                category
              ] = [];
            }

            groupedTransactions[
              category
            ].push(
              transaction
            );
          }
        );

      /* =========================
         TABLE DATA
      ========================= */

      const tableData = [];

      Object.entries(
        groupedTransactions
      ).forEach(

        ([category, items]) => {

          /* CATEGORY HEADER */

          tableData.push([

            `${category}`,

            "",

            "",

          ]);

          /* TRANSACTIONS */

          items.forEach(
            (transaction) => {

              tableData.push([

                `   ${transaction.title}`,

                transaction.date,

                `$${transaction.amount}`,

              ]);
            }
          );
        }
      );

      /* =========================
         TABLE
      ========================= */

      autoTable(doc, {

        startY: 190,

        head: [[

          "Transaction",

          "Date",

          "Amount",

        ]],

        body: tableData,

      });

      /* =========================
         SAVE PDF
      ========================= */

      doc.save(
        `${selectedMonth}_Expense_Report.pdf`
      );
    };

  return (

    <div
      className="report-section"
    >

      <select
        className="month-filter"
        value={selectedMonth}
        onChange={(e) =>
          setSelectedMonth(
            e.target.value
          )
        }
      >

        <option value="All">
          All Months
        </option>

        <option value="January">
          January
        </option>

        <option value="February">
          February
        </option>

        <option value="March">
          March
        </option>

        <option value="April">
          April
        </option>

        <option value="May">
          May
        </option>

        <option value="June">
          June
        </option>

        <option value="July">
          July
        </option>

        <option value="August">
          August
        </option>

        <option value="September">
          September
        </option>

        <option value="October">
          October
        </option>

        <option value="November">
          November
        </option>

        <option value="December">
          December
        </option>

      </select>

      <button
        className="download-btn"
        onClick={generatePDF}
      >

        🧾 Download AI Report

      </button>

    </div>
  );
}

export default DownloadReport;