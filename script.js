const buttons = document.querySelectorAll(".grid-item");
const fields = document.querySelectorAll("input");
const submit = document.getElementById("submit");
const tipAmount = document.getElementById("tipAmount");
const totalAmount = document.getElementById("totalAmount");
const customBtn = document.getElementById("custom");
const customInput = document.getElementById("customInput");

let tip = 0;
const on = (btn) => {
  btn.classList.add("active");
};

const off = (btn) => {
  btn.classList.remove("active");
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((btn) => {
      off(btn);
    });
    if (btn.id === "custom") {
      customBtn.style.display = "none";
      customInput.style.display = "inline";
    } else {
      customBtn.style.display = "inline";
      customInput.style.display = "none";
    }

    on(btn);
    tip = Number(btn.id);
  });
});

const isErr = (input) => {
  // Check if the input value is less than or equal to 0
  if (input.value <= 0 || input.value === "") {
    // Check for both zero and empty string
    input.style.border = "2px solid red"; // Highlight invalid input
    return true; // Return true if there's an error
  }
  input.style.border = "none"; // Reset the border if the input is valid
  return false; // No error
};

submit.addEventListener("click", () => {
  totalAmount.innerHTML = "0.0$"; // Reset the total amount
  tipAmount.innerHTML = "0.0$"; // Reset the tip amount

  console.log(fields);
  // Validate the fields
  let hasError = false;
  if (isErr(fields[0])) {
    hasError = true;
  }
  if (isErr(fields[2])) {
    hasError = true;
  }

  // If there is any error, stop further execution
  if (hasError) return;

  const bill = parseFloat(fields[0].value); // Get the bill amount
  const numOfPeople = parseInt(fields[2].value); // Get the number of people
  // Validate tip (add a default value if not set)
  let tip = 0.15; // Example default tip percentage
  const selectedTip = document.querySelector(".active"); // Get the selected tip button
  console.log(selectedTip);
  if (selectedTip == customInput) {
    tip = selectedTip.value / 100;
  } else if (selectedTip) {
    // Extract the percentage from the button text
    tip = parseInt(selectedTip.textContent) / 100;
  }

  // Calculate price and tip per person
  const price = (bill * (tip + 1)) / numOfPeople;
  const tipPrice = (bill * tip) / numOfPeople;

  // Update the results
  totalAmount.innerHTML = `${price.toFixed(1)}$`;
  tipAmount.innerHTML = `${tipPrice.toFixed(1)}$`;
});
