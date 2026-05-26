import { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ExpenseChart({ transactions }) {

  /* =========================
     STATES
  ========================= */

  const [selectedMonth, setSelectedMonth] =
    useState("All");

  const [chartType, setChartType] =
    useState("bar");

  /* =========================
     FILTER TRANSACTIONS
  ========================= */

  const filteredTransactions =
    selectedMonth === "All"
      ? transactions
      : transactions.filter(
          (transaction) => {

            if (!transaction.date)
              return false;

            const date =
              new Date(
                transaction.date
              );

            if (isNaN(date))
              return false;

            const month =
              date.toLocaleString(
                "default",
                {
                  month: "long",
                }
              );

            return (
              month === selectedMonth
            );
          }
        );

  /* =========================
     ONLY EXPENSES
  ========================= */

  const expenseTransactions =
    filteredTransactions.filter(
      (transaction) =>
        transaction.type === "Expense"
    );

  /* =========================
     CATEGORY TOTALS
  ========================= */

  const categoryData = {};

  expenseTransactions.forEach(
    (transaction) => {

      const category =
        transaction.category;

      if (categoryData[category]) {

        categoryData[category] +=
          transaction.amount;

      } else {

        categoryData[category] =
          transaction.amount;
      }
    }
  );

  /* =========================
     CHART DATA
  ========================= */

  const chartData =
    Object.keys(categoryData).map(
      (category) => ({

        category,

        amount:
          categoryData[category],

      })
    );

  /* =========================
     MONTHLY TREND DATA
  ========================= */

  const monthlyTotals = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .forEach((transaction) => {

      if (!transaction.date)
        return;

      const date =
        new Date(transaction.date);

      if (isNaN(date))
        return;

      const month =
        date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      if (monthlyTotals[month]) {

        monthlyTotals[month] +=
          transaction.amount;

      } else {

        monthlyTotals[month] =
          transaction.amount;
      }
    });

  /* =========================
     TREND DATA
  ========================= */

  const trendData =
    Object.keys(monthlyTotals).map(
      (month) => ({

        month,

        amount:
          monthlyTotals[month],

      })
    );

  /* =========================
     PIE COLORS
  ========================= */

  const COLORS = [

    "#2563eb",
    "#7c3aed",
    "#14b8a6",
    "#f97316",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
    "#e11d48",

  ];

  return (

    <div>

      {/* =========================
         CATEGORY ANALYTICS
      ========================= */}

      <div className="chart-container">

        <h2>
          Expense Categories
        </h2>

        {/* MONTH FILTER */}

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

        {/* =========================
           CHART TOGGLE
        ========================= */}

        <div className="chart-toggle">

          <button
            className={
              chartType === "bar"
                ? "active-chart-btn"
                : "chart-btn"
            }
            onClick={() =>
              setChartType("bar")
            }
          >
            📊 Bar Chart
          </button>

          <button
            className={
              chartType === "pie"
                ? "active-chart-btn"
                : "chart-btn"
            }
            onClick={() =>
              setChartType("pie")
            }
          >
            🥧 Pie Chart
          </button>

        </div>

        {/* =========================
           BAR CHART
        ========================= */}

        {chartType === "bar" ? (

          <ResponsiveContainer
            width="100%"
            height={500}
          >

            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 40,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#cbd5e1"
              />

              <XAxis
                dataKey="category"
                angle={-10}
                textAnchor="end"
                interval={0}
                tick={{
                  fill: "#1e293b",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              <YAxis
                tick={{
                  fill: "#1e293b",
                  fontSize: 13,
                  fontWeight: 600,
                }}
                tickFormatter={(value) => {

                  if (value >= 1000) {
                    return `${value / 1000}k`;
                  }

                  return value;
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.15)",
                }}
                formatter={(value) => [
                  `$${value}`,
                  "Amount",
                ]}
              />

              <Legend />

              <Bar
                dataKey="amount"
                fill="#2563eb"
                radius={[
                  12,
                  12,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        ) : (

          /* =========================
             PIE CHART
          ========================= */

          <ResponsiveContainer
            width="100%"
            height={500}
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                outerRadius={170}
                innerRadius={70}
                paddingAngle={3}
                label
              >

                {chartData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.15)",
                }}
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* =========================
         MONTHLY TREND
      ========================= */}

      <div
        className="chart-container"
        style={{
          marginTop: "30px",
        }}
      >

        <h2>
          Monthly Spending Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={450}
        >

          <LineChart
            data={trendData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#cbd5e1"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#1e293b",
                fontSize: 13,
                fontWeight: 600,
              }}
            />

            <YAxis
              tick={{
                fill: "#1e293b",
                fontSize: 13,
                fontWeight: 600,
              }}
              tickFormatter={(value) => {

                if (value >= 1000) {
                  return `${value / 1000}k`;
                }

                return value;
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow:
                  "0 4px 18px rgba(0,0,0,0.15)",
              }}
              formatter={(value) => [
                `$${value}`,
                "Expenses",
              ]}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                r: 6,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseChart;