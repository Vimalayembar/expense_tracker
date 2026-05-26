function SummaryCard({
  title,
  amount,
  currency,
}) {

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
     CARD COLORS
  ========================= */

  let cardClass = "";

  if (title === "Income") {
    cardClass = "income-card";
  }

  else if (title === "Expenses") {
    cardClass = "expense-card";
  }

  else if (title === "Savings") {
    cardClass = "savings-card";
  }

  else {
    cardClass = "balance-card";
  }

  return (
    <div
      className={`summary-card ${cardClass}`}
    >

      <h3>{title}</h3>

      <p>
        {
          currencySymbols[currency]
        }
        {amount}
      </p>

    </div>
  );
}

export default SummaryCard;