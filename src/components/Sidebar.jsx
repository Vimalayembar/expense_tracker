import { Link }
from "react-router-dom";

import {
  signOut,
} from "firebase/auth";

import { auth }
from "../firebase";

function Sidebar({
  user = {},
}) {

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

      } catch (error) {

        console.error(
          "Logout Error:",
          error
        );
      }
    };

  /* =========================
     USER INITIALS
  ========================= */

  const initials =
    user?.name

      ? user.name
          .trim()
          .split(" ")
          .filter(
            (word) =>
              word.length > 0
          )
          .map(
            (word) =>
              word
                .charAt(0)
                .toUpperCase()
          )
          .join("")

      : "U";

  return (

    <div className="sidebar">

      {/* PROFILE */}

      <div className="sidebar-profile">

        <div className="avatar-circle">

          {initials}

        </div>

        <h3>

          {user?.name || "User"}

        </h3>

        <p>

          {user?.email ||
            "example@email.com"}

        </p>

      </div>

      {/* NAVIGATION */}

      <ul>

        <li>

          <Link to="/">
            Dashboard
          </Link>

        </li>

        <li>

          <Link to="/transactions">
            Transactions
          </Link>

        </li>

        <li>

          <Link to="/analytics">
            Analytics
          </Link>

        </li>

        <li>

          <Link to="/needs-wants">
            Needs & Wants
          </Link>

        </li>

        <li>
          <Link to="/reports">
            Reports
          </Link>   
        </li>

        <li>

          <Link to="/settings">
            Settings
          </Link>

        </li>

        {/* LOGOUT */}

        <li
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;