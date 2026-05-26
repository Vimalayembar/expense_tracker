import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";

import "../styles/dashboard.css";

function Dashboard({
  transactions,
  darkMode,
  preferences,
  user,
}) {

  /* =========================
     INCOME
  ========================= */

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (acc, transaction) =>
        acc +
        Number(transaction.amount),
      0
    );

  /* =========================
     EXPENSES
  ========================= */

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (acc, transaction) =>
        acc +
        Number(transaction.amount),
      0
    );

  /* =========================
     SAVINGS
  ========================= */

  const savingsGoal =
    Number(
      preferences?.savingsGoal || 0
    );

  const plannedSavings =
    Number(
      preferences?.plannedSavings || 0
    );

  const savings =
    plannedSavings;

  /* =========================
     BALANCE
  ========================= */

  const balance =
    income - expenses;

  /* =========================
     CURRENCY SYMBOLS
  ========================= */

  const currencySymbols = {

    USD: "$",

    INR: "₹",

    EUR: "€",

    GBP: "£",

  };

  /* =========================
     CATEGORY WARNINGS
  ========================= */

  const categoryWarnings = [];

  const categoryBudgets =
    preferences?.categoryBudgets || {};

  Object.keys(categoryBudgets).forEach(
    (category) => {

      const budget =
        Number(
          categoryBudgets[
            category
          ]
        );

      if (!budget) return;

      const spent = transactions
        .filter(
          (transaction) =>
            transaction.type ===
              "Expense" &&
            transaction.category ===
              category
        )
        .reduce(
          (acc, transaction) =>
            acc +
            Number(
              transaction.amount
            ),
          0
        );

      if (spent > budget) {

        categoryWarnings.push({

          category,

          exceeded:
            spent - budget,

        });
      }
    }
  );

  /* =========================
     NEEDS VS WANTS
  ========================= */

  const needsWantCategories =
    preferences?.needsWantCategories ||
    {};

  const needsTotal =
    transactions
      .filter(
        (transaction) => {

          const type =
            needsWantCategories[
              transaction.category
            ];

          return (
            transaction.type ===
              "Expense" &&
            type === "Need"
          );
        }
      )
      .reduce(
        (acc, transaction) =>
          acc +
          Number(
            transaction.amount
          ),
        0
      );

  const wantsTotal =
    transactions
      .filter(
        (transaction) => {

          const type =
            needsWantCategories[
              transaction.category
            ];

          return (
            transaction.type ===
              "Expense" &&
            type === "Want"
          );
        }
      )
      .reduce(
        (acc, transaction) =>
          acc +
          Number(
            transaction.amount
          ),
        0
      );

  const totalSpending =
    needsTotal + wantsTotal;

  const needsPercentage =
    totalSpending > 0
      ? (
          (needsTotal /
            totalSpending) *
          100
        ).toFixed(1)
      : "0.0";

  const wantsPercentage =
    totalSpending > 0
      ? (
          (wantsTotal /
            totalSpending) *
          100
        ).toFixed(1)
      : "0.0";

  /* =========================
     AI INSIGHTS
  ========================= */

  let highestCategory = "";

  let highestAmount = 0;

  const expenseCategories = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type ===
        "Expense"
    )
    .forEach(
      (transaction) => {

        const category =
          transaction.category;

        if (
          expenseCategories[
            category
          ]
        ) {

          expenseCategories[
            category
          ] += Number(
            transaction.amount
          );

        } else {

          expenseCategories[
            category
          ] = Number(
            transaction.amount
          );
        }
      }
    );

  Object.keys(
    expenseCategories
  ).forEach((category) => {

    if (
      expenseCategories[
        category
      ] > highestAmount
    ) {

      highestAmount =
        expenseCategories[
          category
        ];

      highestCategory =
        category;
    }
  });

  const expensePercentage =
    income > 0
      ? (
          (expenses / income) *
          100
        ).toFixed(1)
      : "0.0";

  /* =========================
     JSX
  ========================= */

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

        {/* WELCOME */}

        <div className="dashboard-heading">

          <h1>

            Welcome back

            {user?.name
              ? `, ${user.name}`
              : ""}

            👋

          </h1>

          <p>
            Track your finances
            smarter today.
          </p>

        </div>

        {/* SUMMARY CARDS */}

        <div className="cards-container">

          <SummaryCard
            title="Balance"
            amount={balance}
            currency={
              preferences?.currency
            }
          />

          <SummaryCard
            title="Income"
            amount={income}
            currency={
              preferences?.currency
            }
          />

          <SummaryCard
            title="Expenses"
            amount={expenses}
            currency={
              preferences?.currency
            }
          />

          <SummaryCard
            title="Savings"
            amount={savings}
            currency={
              preferences?.currency
            }
          />

        </div>

        {/* SAVINGS STATUS */}

        {savingsGoal > 0 && (

          <div
            className={
              savings >= savingsGoal
                ? "success-warning"
                : "warning-card"
            }
          >

            {savings >= savingsGoal ? (

              <h3>

                🎉 Congratulations

                {user?.name
                  ? `, ${user.name}`
                  : ""}

                ! You achieved your
                savings goal.

              </h3>

            ) : (

              <h3>

                ⚠️ Your savings are
                below your goal of{" "}

                {
                  currencySymbols[
                    preferences?.currency
                  ]
                }

                {savingsGoal}

              </h3>

            )}

          </div>

        )}

        {/* CATEGORY WARNINGS */}

        {categoryWarnings.map(
          (warning, index) => (

            <div
              className="warning-card"
              key={index}
            >

              <h3>

                ⚠️{" "}
                {warning.category}
                exceeded budget by{" "}

                {
                  currencySymbols[
                    preferences?.currency
                  ]
                }

                {warning.exceeded}

              </h3>

            </div>

          )
        )}

        {/* BUDGET PROGRESS */}

        <div className="budget-progress-section">

          <h2>
            📊 Budget Progress
          </h2>

          <div className="budget-progress-grid">

            {Object.keys(categoryBudgets)
              .filter(
                (category) =>
                  Number(
                    categoryBudgets[
                      category
                    ]
                  ) > 0
              )
              .map((category) => {

                const budget =
                  Number(
                    categoryBudgets[
                      category
                    ]
                  );

                const spent =
                  transactions
                    .filter(
                      (transaction) =>
                        transaction.type ===
                          "Expense" &&
                        transaction.category ===
                          category
                    )
                    .reduce(
                      (
                        acc,
                        transaction
                      ) =>
                        acc +
                        Number(
                          transaction.amount
                        ),
                      0
                    );

                const percentage =
                  Math.min(
                    (
                      (spent / budget) *
                      100
                    ).toFixed(0),
                    100
                  );

                return (

                  <div
                    key={category}
                    className="budget-progress-card"
                  >

                    {/* TOP */}

                    <div className="budget-progress-header">

                      <h3>
                        {category}
                      </h3>

                      <p>

                        {
                          currencySymbols[
                            preferences?.currency
                          ]
                        }

                        {spent}

                        {" / "}

                        {
                          currencySymbols[
                            preferences?.currency
                          ]
                        }

                        {budget}

                      </p>

                    </div>

                    {/* BAR */}

                    <div className="progress-bar">

                      <div
                        className={`progress-fill ${
                          percentage >= 100

                            ? "danger-progress"

                            : percentage >= 75

                            ? "warning-progress"

                            : "safe-progress"
                        }`}
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      />

                    </div>

                    {/* PERCENT */}

                    <p className="progress-text">

                      {percentage}%

                      {percentage >= 100
                        ? " - Over Budget"
                        : percentage >= 75
                        ? " - Near Limit"
                        : " - Healthy"}

                    </p>

                  </div>

                );
              })}

          </div>

        </div>

        {/* SPENDING SPLIT */}

        <div className="spending-split">

          <h2>
            💸 Spending Split
          </h2>

          <div className="needs-wants-card">

            <div className="needs-box">

              <h3>
                Needs
              </h3>

              <p>
                {
                  needsPercentage
                }
                %
              </p>

            </div>

            <div className="wants-box">

              <h3>
                Wants
              </h3>

              <p>
                {
                  wantsPercentage
                }
                %
              </p>

            </div>

          </div>

        </div>

        {/* AI INSIGHTS */}

        <div className="insights-container">

          <h2>
            🤖 AI Insights
          </h2>

          <div className="insight-card">

            <p>

              📈 Highest spending
              category:

              {" "}

              <strong>
                {highestCategory}
              </strong>

              {" "}
              (
              {
                currencySymbols[
                  preferences?.currency
                ]
              }

              {highestAmount}
              )

            </p>

            <p>

              💸 Expenses are{" "}

              <strong>
                {
                  expensePercentage
                }
                %
              </strong>

              {" "}
              of your income

            </p>

            <p>

              {savings >=
              savingsGoal

                ? "🎯 Great job maintaining your savings!"

                : "⚠️ Try reducing unnecessary expenses."}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;