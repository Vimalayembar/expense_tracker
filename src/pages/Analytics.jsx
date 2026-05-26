import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

function Analytics({
  transactions,
  darkMode,
  user,
}) {

  /* =========================
     CHART TYPE
  ========================= */

  const [chartType, setChartType] =
    useState("bar");

  /* =========================
     CATEGORY TOTALS
  ========================= */

  const categoryTotals =
    transactions.reduce(
      (acc, transaction) => {

        if (
          transaction.type ===
          "Expense"
        ) {

          const amount =
            Number(
              transaction.amount
            );

          if (
            acc[
              transaction.category
            ]
          ) {

            acc[
              transaction.category
            ] += amount;

          } else {

            acc[
              transaction.category
            ] = amount;
          }
        }

        return acc;

      },
      {}
    );

  /* =========================
     CATEGORY CHART DATA
  ========================= */

  const chartData =
    Object.entries(
      categoryTotals
    ).map(
      ([category, amount]) => ({

        category,

        amount,

      })
    );

  /* =========================
     MONTHLY TRENDS
  ========================= */

  const monthlyDataMap = {};

  transactions.forEach(
    (transaction) => {

      const date =
        new Date(
          transaction.date
        );

      const month =
        date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      if (
        !monthlyDataMap[month]
      ) {

        monthlyDataMap[month] = {

          month,

          income: 0,

          expenses: 0,

        };
      }

      if (
        transaction.type ===
        "Income"
      ) {

        monthlyDataMap[
          month
        ].income += Number(
          transaction.amount
        );

      } else {

        monthlyDataMap[
          month
        ].expenses += Number(
          transaction.amount
        );
      }
    }
  );

  const monthlyTrendData =
    Object.values(
      monthlyDataMap
    );

  /* =========================
     PIE COLORS
  ========================= */

  const COLORS = [

    "#2563eb",
    "#7c3aed",
    "#16a34a",
    "#dc2626",
    "#f59e0b",
    "#0ea5e9",
    "#ec4899",
    "#14b8a6",
    "#8b5cf6",
    "#6366f1",

  ];

  return (

    <div
      className={
        darkMode
          ? "dashboard-container dark"
          : "dashboard-container"
      }
    >

      <Sidebar user={user} />

      <div className="main-content">

        <Navbar />

        <div className="reports-page">

          {/* HEADER */}

          <div className="reports-header">

            <h1>
              📊 Analytics
            </h1>

            <p>
              Visualize your spending
              trends beautifully.
            </p>

          </div>

          {/* MONTHLY TRENDS */}

          <div className="chart-wrapper">

            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              📈 Monthly Trends
            </h2>

            <ResponsiveContainer
              width="100%"
              height={400}
            >

              <LineChart
                data={
                  monthlyTrendData
                }
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  opacity={0.2}
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"

                  dataKey="income"

                  stroke="#16a34a"

                  strokeWidth={4}

                  dot={{
                    r: 6,
                  }}
                />

                <Line
                  type="monotone"

                  dataKey="expenses"

                  stroke="#dc2626"

                  strokeWidth={4}

                  dot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* TOGGLE */}

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

          {/* CATEGORY CHART */}

          <div className="chart-wrapper">

            {chartType === "bar" ? (

              <ResponsiveContainer
                width="100%"
                height={500}
              >

                <BarChart
                  data={chartData}

                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 20,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    opacity={0.2}
                  />

                  <XAxis
                    dataKey="category"

                    interval={0}

                    angle={-15}

                    textAnchor="end"

                    height={60}

                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="amount"

                    fill="#5856ca"

                    radius={[
                      12,
                      12,
                      0,
                      0,
                    ]}

                    barSize={55}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <ResponsiveContainer
                width="100%"
                height={500}
              >

                <PieChart>

                  <Pie
                    data={chartData}

                    dataKey="amount"

                    nameKey="category"

                    outerRadius={180}

                    label
                  >

                    {chartData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}

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

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;