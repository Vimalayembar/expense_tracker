import { useEffect, useState } from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

/* =========================
   FIREBASE
========================= */

import Auth from "./pages/Auth";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "./firebase";

/* =========================
   PAGES
========================= */

import Dashboard
from "./pages/Dashboard";

import Transactions
from "./pages/Transactions";

import Analytics
from "./pages/Analytics";

import Settings
from "./pages/Settings";

import NeedsWants
from "./pages/NeedsWants";

import Reports
from "./pages/Reports";

function App() {

  /* =========================
     AUTH USER
  ========================= */

  const [
    currentUser,
    setCurrentUser,
  ] = useState(null);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setCurrentUser(user);
        }
      );

    return () => {
      unsubscribe();
    };

  }, []);

  /* =========================
     DARK MODE
  ========================= */

  const [
    darkMode,
    setDarkMode,
  ] = useState(() => {

    const savedTheme =
      localStorage.getItem(
        "darkMode"
      );

    return (
      savedTheme === "true"
    );
  });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

  }, [darkMode]);

  const toggleDarkMode = () => {

    setDarkMode(!darkMode);
  };

  /* =========================
     USER PROFILE
  ========================= */

  const [
    user,
    setUser,
  ] = useState(() => {

    const savedUser =
      localStorage.getItem(
        "user"
      );

    return savedUser
      ? JSON.parse(savedUser)
      : {

          name: "",
          email: "",

        };
  });

  useEffect(() => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

  }, [user]);

  const updateUser = (
    newUser
  ) => {

    setUser(newUser);
  };

  /* =========================
     PREFERENCES
  ========================= */

  const [
    preferences,
    setPreferences,
  ] = useState(() => {

    const savedPreferences =
      localStorage.getItem(
        "preferences"
      );

    return savedPreferences
      ? JSON.parse(
          savedPreferences
        )
      : {

          currency: "USD",

          monthlyBudget: "",

          savingsGoal: "",

          plannedSavings: "",

          /* CATEGORY BUDGETS */

          categoryBudgets: {

            Food: "",
            Transport: "",
            Entertainment: "",
            Utilities: "",
            Healthcare: "",
            Shopping: "",
            Dining: "",
            Travel: "",
            Education: "",
            Subscriptions: "",
            Groceries: "",
            Rent: "",
            Other: "",

          },

          /* CATEGORY TYPES */

          categoryTypes: {},

          /* NEEDS / WANTS */

          needsWantCategories: {},

          /* CUSTOM CATEGORIES */

          customCategories: [],

        };
  });

  useEffect(() => {

    localStorage.setItem(
      "preferences",
      JSON.stringify(
        preferences
      )
    );

  }, [preferences]);

  const updatePreferences = (
    newPreferences
  ) => {

    setPreferences(
      newPreferences
    );
  };

  /* =========================
     FIRESTORE TRANSACTIONS
  ========================= */

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  /* =========================
     REALTIME TRANSACTIONS
  ========================= */

  useEffect(() => {

    if (!currentUser) return;

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "users",
          currentUser.uid,
          "transactions"
        ),

        (snapshot) => {

          const loadedTransactions =
            snapshot.docs.map(
              (doc) => ({

                id: doc.id,

                ...doc.data(),

              })
            );

          setTransactions(
            loadedTransactions
          );
        }
      );

    return () =>
      unsubscribe();

  }, [currentUser]);

  /* =========================
     ADD TRANSACTION
  ========================= */

  const addTransaction =
    async (
      newTransaction
    ) => {

      try {

        await addDoc(

          collection(
            db,
            "users",
            currentUser.uid,
            "transactions"
          ),

          {

            ...newTransaction,

            amount:
              Number(
                newTransaction.amount
              ),

          }
        );

      } catch (error) {

        console.error(error);
      }
    };

  /* =========================
     DELETE TRANSACTION
  ========================= */

  const deleteTransaction =
    async (
      indexToDelete
    ) => {

      try {

        const transaction =
          transactions[
            indexToDelete
          ];

        await deleteDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "transactions",
            transaction.id
          )
        );

      } catch (error) {

        console.error(error);
      }
    };

  /* =========================
     UPDATE TRANSACTION
  ========================= */

  const updateTransaction =
    async (
      updatedTransaction
    ) => {

      try {

        await updateDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "transactions",
            updatedTransaction.id
          ),

          {

            title:
              updatedTransaction.title,

            amount:
              Number(
                updatedTransaction.amount
              ),

            category:
              updatedTransaction.category,

            type:
              updatedTransaction.type,

            date:
              updatedTransaction.date,

          }
        );

      } catch (error) {

        console.error(error);
      }
    };

  /* =========================
     AUTH PROTECTION
  ========================= */

  if (!currentUser) {

    return <Auth />;
  }

  /* =========================
     ROUTES
  ========================= */

  return (

    <Routes>

      {/* DASHBOARD */}

      <Route
        path="/"
        element={
          <Dashboard
            transactions={
              transactions
            }
            darkMode={
              darkMode
            }
            user={user}
            preferences={
              preferences
            }
          />
        }
      />

      {/* TRANSACTIONS */}

      <Route
        path="/transactions"
        element={
          <Transactions
            transactions={
              transactions
            }
            addTransaction={
              addTransaction
            }
            deleteTransaction={
              deleteTransaction
            }
            updateTransaction={
              updateTransaction
            }
            darkMode={
              darkMode
            }
            user={user}
            preferences={
              preferences
            }
          />
        }
      />

      {/* ANALYTICS */}

      <Route
        path="/analytics"
        element={
          <Analytics
            transactions={
              transactions
            }
            darkMode={
              darkMode
            }
            user={user}
            preferences={
              preferences
            }
          />
        }
      />

      {/* NEEDS & WANTS */}

      <Route
        path="/needs-wants"
        element={
          <NeedsWants
            darkMode={
              darkMode
            }
            user={user}
            preferences={
              preferences
            }
            updatePreferences={
              updatePreferences
            }
          />
        }
      />

      {/* REPORTS */}

      <Route
        path="/reports"
        element={
          <Reports
            transactions={
              transactions
            }
            darkMode={
              darkMode
            }
            user={user}
            preferences={
              preferences
            }
          />
        }
      />

      {/* SETTINGS */}

      <Route
        path="/settings"
        element={
          <Settings
            darkMode={
              darkMode
            }
            toggleDarkMode={
              toggleDarkMode
            }
            user={user}
            updateUser={
              updateUser
            }
            preferences={
              preferences
            }
            updatePreferences={
              updatePreferences
            }
          />
        }
      />

    </Routes>
  );
}

export default App;