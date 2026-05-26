import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

function NeedsWants({
  darkMode,
  user,
  preferences,
  updatePreferences,
}) {

  /* =========================
     NEED / WANT DATA
  ========================= */

  const needsWantCategories =
    preferences?.needsWantCategories ||
    {};

  /* =========================
     DEFAULT CATEGORIES
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

  /* =========================
     CUSTOM CATEGORIES
  ========================= */

  const customCategories =
    preferences?.customCategories ||
    [];

  /* =========================
     ALL CATEGORIES
  ========================= */

  const categories = [

    ...defaultCategories,

    ...customCategories,

  ];

  /* =========================
     MOVE CATEGORY
  ========================= */

  const handleCategoryMove =
    (category) => {

      const currentType =
        needsWantCategories[
          category
        ];

      const newType =
        currentType === "Need"
          ? "Want"
          : "Need";

      updatePreferences({

        ...preferences,

        needsWantCategories: {

          ...needsWantCategories,

          [category]: newType,

        },

      });
    };

  /* =========================
     ADD CATEGORY
  ========================= */

  const handleAddCategory = () => {

    const input =
      document.getElementById(
        "addCategoryInput"
      );

    const value =
      input.value.trim();

    if (!value) return;

    if (
      categories.includes(value)
    ) {

      alert(
        "Category already exists"
      );

      return;
    }

    updatePreferences({

      ...preferences,

      customCategories: [

        ...customCategories,

        value,

      ],

      needsWantCategories: {

        ...needsWantCategories,

        [value]: "Want",

      },

    });

    input.value = "";
  };

  /* =========================
     DELETE CATEGORY
  ========================= */

  const handleDeleteCategory =
    () => {

      const select =
        document.getElementById(
          "deleteCategorySelect"
        );

      const selectedCategory =
        select.value;

      if (
        !selectedCategory
      ) return;

      const updatedCustomCategories =
        customCategories.filter(
          (category) =>
            category !==
            selectedCategory
        );

      const updatedNeedsWant =
        {
          ...needsWantCategories,
        };

      delete updatedNeedsWant[
        selectedCategory
      ];

      updatePreferences({

        ...preferences,

        customCategories:
          updatedCustomCategories,

        needsWantCategories:
          updatedNeedsWant,

      });
    };

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

        <div className="needs-page">

          {/* HEADER */}

          <h1>
            💸 Needs & Wants
          </h1>

          <p
            style={{
              marginBottom: "25px",
              color: "#64748b",
            }}
          >
            Click categories to move
            between Needs and Wants.
          </p>

          {/* TOP CONTROLS */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >

            {/* ADD */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                flex: 1,
              }}
            >

              <input
                type="text"
                placeholder="Add Category"
                className="search-input"
                id="addCategoryInput"
              />

              <button
                className="edit-btn"
                onClick={
                  handleAddCategory
                }
              >

                Add

              </button>

            </div>

            {/* DELETE */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                flex: 1,
              }}
            >

              <select
                className="search-input"
                id="deleteCategorySelect"
              >

                <option value="">
                  Delete Category
                </option>

                {customCategories.map(
                  (category) => (

                    <option
                      key={category}
                      value={category}
                    >

                      {category}

                    </option>

                  )
                )}

              </select>

              <button
                className="delete-btn"
                onClick={
                  handleDeleteCategory
                }
              >

                Delete

              </button>

            </div>

          </div>

          {/* NEEDS & WANTS */}

          <div
            className="needs-wants-layout"
          >

            {/* NEEDS */}

            <div
              className="needs-column"
            >

              <h2>
                Needs
              </h2>

              {categories
                .filter(
                  (category) =>
                    needsWantCategories[
                      category
                    ] === "Need"
                )
                .map((category) => (

                  <div
                    key={category}

                    className="category-pill need-pill"

                    onClick={() =>
                      handleCategoryMove(
                        category
                      )
                    }
                  >

                    {category}

                  </div>

                ))}

            </div>

            {/* WANTS */}

            <div
              className="wants-column"
            >

              <h2>
                Wants
              </h2>

              {categories
                .filter(
                  (category) =>
                    needsWantCategories[
                      category
                    ] !== "Need"
                )
                .map((category) => (

                  <div
                    key={category}

                    className="category-pill want-pill"

                    onClick={() =>
                      handleCategoryMove(
                        category
                      )
                    }
                  >

                    {category}

                  </div>

                ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NeedsWants;