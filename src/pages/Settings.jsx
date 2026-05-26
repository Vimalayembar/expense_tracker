import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

function Settings({

  darkMode,
  toggleDarkMode,

  user,
  updateUser,

  preferences,
  updatePreferences,

}) {

  /* =========================
     DROPDOWNS
  ========================= */

  const [
    accountOpen,
    setAccountOpen,
  ] = useState(true);

  const [
    appearanceOpen,
    setAppearanceOpen,
  ] = useState(false);

  const [
    preferencesOpen,
    setPreferencesOpen,
  ] = useState(true);

  /* =========================
     USER FORM
  ========================= */

  const [
    name,
    setName,
  ] = useState(user.name || "");

  const [
    email,
    setEmail,
  ] = useState(user.email || "");

  /* =========================
     PREFERENCES FORM
  ========================= */

  const [
    currency,
    setCurrency,
  ] = useState(
    preferences.currency || "USD"
  );

  const [
    monthlyBudget,
    setMonthlyBudget,
  ] = useState(
    preferences.monthlyBudget || ""
  );

  const [
    savingsGoal,
    setSavingsGoal,
  ] = useState(
    preferences.savingsGoal || ""
  );

  const [
    plannedSavings,
    setPlannedSavings,
  ] = useState(
    preferences.plannedSavings || ""
  );

  const [
    categoryBudgets,
    setCategoryBudgets,
  ] = useState(
    preferences.categoryBudgets || {}
  );

  /* =========================
     SAVE USER
  ========================= */

  const handleSaveUser =
    () => {

      updateUser({
        name,
        email,
      });

      alert(
        "Profile Updated!"
      );

      setAccountOpen(false);
    };

  /* =========================
     SAVE PREFERENCES
  ========================= */

  const handleSavePreferences =
    () => {

      updatePreferences({

        ...preferences,

        currency,

        monthlyBudget,

        savingsGoal,

        plannedSavings,

        categoryBudgets,

      });

      alert(
        "Preferences Saved!"
      );

      setPreferencesOpen(false);
    };

  /* =========================
     CATEGORY INPUT
  ========================= */

  const handleBudgetChange =
    (
      category,
      value
    ) => {

      setCategoryBudgets({

        ...categoryBudgets,

        [category]: value,

      });
    };

  const categories = [

    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Dining",
    "Travel",
    "Education",
    "Subscriptions",
    "Groceries",
    "Rent",

  ];

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

        <div className="settings-page">

          <h1>
            ⚙️ Settings
          </h1>

          {/* ACCOUNT */}

          <div className="settings-card">

            <div
              className="settings-header"
              onClick={() =>
                setAccountOpen(
                  !accountOpen
                )
              }
            >

              <h2>
                👤 Account
              </h2>

              <span>

                {
                  accountOpen
                    ? "▲"
                    : "▼"
                }

              </span>

            </div>

            {accountOpen && (

              <div className="settings-content">

                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={
                    handleSaveUser
                  }
                >

                  Save Profile

                </button>

              </div>

            )}

          </div>

          {/* APPEARANCE */}

          <div className="settings-card">

            <div
              className="settings-header"
              onClick={() =>
                setAppearanceOpen(
                  !appearanceOpen
                )
              }
            >

              <h2>
                🎨 Appearance
              </h2>

              <span>

                {
                  appearanceOpen
                    ? "▲"
                    : "▼"
                }

              </span>

            </div>

            {appearanceOpen && (

              <div className="settings-content">

                <div className="theme-toggle-container">

                  <span className="theme-label">

                    {darkMode
                      ? "🌙 Dark Mode"
                      : "☀️ Light Mode"}

                  </span>

                  <div
                    className={
                      darkMode
                        ? "toggle-switch active"
                        : "toggle-switch"
                    }

                    onClick={toggleDarkMode}
                  >

                    <div className="toggle-circle"></div>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* FINANCIAL PREFERENCES */}

          <div className="settings-card">

            <div
              className="settings-header"
              onClick={() =>
                setPreferencesOpen(
                  !preferencesOpen
                )
              }
            >

              <h2>
                💰 Financial Preferences
              </h2>

              <span>

                {
                  preferencesOpen
                    ? "▲"
                    : "▼"
                }

              </span>

            </div>

            {preferencesOpen && (

              <div className="settings-content">

                {/* GOALS */}

                <div className="goals-grid">

                  <div className="goal-box">

                    <label>
                      Currency
                    </label>

                    <select
                      value={
                        currency
                      }

                      onChange={(e) =>
                        setCurrency(
                          e.target.value
                        )
                      }
                    >

                      <option>
                        USD
                      </option>

                      <option>
                        INR
                      </option>

                      <option>
                        EUR
                      </option>

                      <option>
                        GBP
                      </option>

                    </select>

                  </div>

                  <div className="goal-box">

                    <label>
                      Monthly Budget
                    </label>

                    <input
                      type="number"
                      value={
                        monthlyBudget
                      }

                      onChange={(e) =>
                        setMonthlyBudget(
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <div className="goal-box">

                    <label>
                      Savings Goal
                    </label>

                    <input
                      type="number"
                      value={
                        savingsGoal
                      }

                      onChange={(e) =>
                        setSavingsGoal(
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <div className="goal-box">

                    <label>
                      Planned Savings
                    </label>

                    <input
                      type="number"
                      value={
                        plannedSavings
                      }

                      onChange={(e) =>
                        setPlannedSavings(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

                {/* CATEGORY BUDGETS */}

                <h3 className="budget-title">

                  📊 Category Budgets

                </h3>

                <div className="budget-grid">

                  {categories.map(
                    (category) => (

                      <div
                        key={category}
                        className="budget-card"
                      >

                        <h4>
                          {category}
                        </h4>

                        <input
                          type="number"
                          placeholder="$0"

                          value={
                            categoryBudgets[
                              category
                            ] || ""
                          }

                          onChange={(e) =>
                            handleBudgetChange(
                              category,
                              e.target.value
                            )
                          }
                        />

                      </div>

                    )
                  )}

                </div>

                <button
                  className="save-preferences-btn"

                  onClick={
                    handleSavePreferences
                  }
                >

                  Save Preferences

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;