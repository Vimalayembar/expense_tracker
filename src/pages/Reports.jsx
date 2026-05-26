import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import DownloadReport
from "../components/DownloadReport";

import "../styles/dashboard.css";

function Reports({

  darkMode,

  user,

  transactions,

  preferences,

}) {

  /* =========================
     CALCULATIONS
  ========================= */

  const income =
    transactions
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
    transactions
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

  const savings =
    Number(
      preferences.plannedSavings || 0
    );

  /* =========================
     BALANCE
  ========================= */

  const balance =
    income - expenses;

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

      {/* MAIN CONTENT */}

      <div className="main-content">

        <Navbar />

        <div className="reports-page">

          {/* HEADER */}

          <div className="reports-header">

            <h1>
              🧾 Reports Center
            </h1>

            <p>
              Generate AI-powered
              monthly financial reports.
            </p>

          </div>

          {/* SUMMARY */}

          <div
            className="cards-container"
            style={{
              marginBottom: "30px",
            }}
          >

            <div className="summary-card income-card">

              <h3>
                Income
              </h3>

              <p>
                ${income}
              </p>

            </div>

            <div className="summary-card expense-card">

              <h3>
                Expenses
              </h3>

              <p>
                ${expenses}
              </p>

            </div>

            <div className="summary-card balance-card">

              <h3>
                Balance
              </h3>

              <p>
                ${balance}
              </p>

            </div>

            <div className="summary-card savings-card">

              <h3>
                Planned Savings
              </h3>

              <p>
                ${savings}
              </p>

            </div>

          </div>

          {/* REPORT SECTION */}

          <div className="report-card">

            <h2>
              📄 Monthly AI Report
            </h2>

            <p>
              Generate smart monthly
              financial reports with
              AI insights and spending
              analysis.
            </p>

            <DownloadReport
              transactions={
                transactions
              }
              preferences={
                preferences
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;