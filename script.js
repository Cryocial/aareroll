const pool = [
  { id: "unique", name: "Unique", rarity: "0.1%", probability: 0.1, count: 0, image: "pictures/trait_unique.png" },
  { id: "golden", name: "Golden", rarity: "0.15%", probability: 0.15, count: 0, image: "pictures/trait_golden.png" },
  { id: "divine", name: "Divine", rarity: "0.2%", probability: 0.2, count: 0, image: "pictures/trait_divine.png" },
  { id: "celestial", name: "Celestial", rarity: "0.36%", probability: 0.36, count: 0, image: "pictures/trait_celestial.png" },
  { id: "reaper", name: "Reaper", rarity: "0.8%", probability: 0.8, count: 0, image: "pictures/trait_reaper.png" },
  { id: "godspeed", name: "Godspeed", rarity: "1%", probability: 1, count: 0, image: "pictures/trait_godspeed.png" },
  { id: "sniper", name: "Sniper", rarity: "2.5%", probability: 2.5, count: 0, image: "pictures/trait_sniper.png" },
  { id: "culling", name: "Culling", rarity: "5%", probability: 5, count: 0, image: "pictures/trait_culling.png" },
  { id: "adept", name: "Adept", rarity: "9.99%", probability: 9.99, count: 0, image: "pictures/trait_adept.png" },
  { id: "nimble", name: "Nimble III", rarity: "2.5%", probability: 3.75, count: 0, image: "pictures/trait_nimble.png" },
  { id: "range", name: "Range III", rarity: "2.5%", probability: 3.75, count: 0, image: "pictures/trait_range.png" },
  { id: "superior", name: "Superior III", rarity: "2.5%", probability: 4.5, count: 0, image: "pictures/trait_superior.png" },
  { id: "everythingElse", name: "Everything Else", rarity: "94.89%", probability: 67.9, count: 0, image: "" },
];

// Function to simulate a roll
function doubleTrait() {
  const random = Math.random() * 2000;
  if (random < 1) {
    return true;
  }
  return false;
}


//////////////////////////////////////////////////////////////////////////


//reroll counter
let rerollCounter = 0; // Initialize reroll count
let rollHistory = [];


// Function to update the reroll count display
function updateRerollCount() {
  document.getElementById('count').textContent = rerollCounter;
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function updateCurrentRoll(result) {
  document.getElementById('current-roll-text').textContent = result;

  // Update roll history if it's a 10x or higher roll
  rollHistory.unshift(result); // Add to the beginning of the history array
  updateRollHistory();
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Function to update the roll history list
function updateRollHistory() {
  const historyList = document.getElementById("roll-history");
  historyList.innerHTML = ""; // Clear the existing list

  rollHistory.forEach((result, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Roll #${index + 1}: ${result}`;
    historyList.appendChild(listItem);
  });
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function rollItems(times) {

  // Check if double trait is triggered
  for (let i = 0; i < times; i++) {

    const isDouble = doubleTrait();
    const rolls = isDouble ? 2 : 1;

    // Roll the required number of times (1 or 2 if double trait)
    for (let j = 0; j < rolls; j++) {
      const random = Math.random() * 100; // Generate a number between 0 and 100
      let cumulative = 0;

      for (const item of pool) {
        cumulative += item.probability;
        if (random < cumulative) {
          item.count++;
          break;
        }
      }
    }
  }

  // Update the table after all rolls
  updateTable();
}
// Function to update the table
function updateTable() {
  const tableBody = document.getElementById("rollTable");
  tableBody.innerHTML = ""; // Clear the existing rows

  pool.forEach(item => {
    const row = document.createElement("tr");

    // Add image to the row
    const imageCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.image; // Set the image source to the item's image path
    img.alt = item.name;
    img.width = 50; // Adjust the width of the image as needed
    img.height = 50; // Adjust the height of the image as needed
    imageCell.appendChild(img);

    // Determine styling class
    const isRainbowItem = ["Unique", "Divine", "Golden", "Celestial", "Reaper"].includes(item.name);
    const isGoldenItem = ["Godspeed", "Sniper", "Culling", "Adept"].includes(item.name);
    const isEpicItem = ["Superior III", "Nimble III", "Range III"].includes(item.name);
    const isPlainItem = ["Everything Else"].includes(item.name);

    let classNames = [];
    if (isRainbowItem) classNames.push("rainbow-text");
    if (isGoldenItem) classNames.push("golden-text");
    if (isEpicItem) classNames.push("epic-text");
    if (isPlainItem) classNames.push("plain-text");

    // Create text cell with styling
    const textCell = document.createElement("td");
    textCell.textContent = item.name;
    textCell.className = classNames.join(" ");

    // Create count cell
    const countCell = document.createElement("td");
    countCell.textContent = item.count;

    // Append all cells to the row
    row.appendChild(imageCell);
    row.appendChild(textCell);
    row.appendChild(countCell);

    tableBody.appendChild(row);
  });
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Event listeners to trigger reroll actions and update count
document.getElementById('reroll-1').addEventListener('click', () => {
  rerollCounter += 1;
  updateRerollCount();
  rollItems(1); // Call rollItems when the button is clicked
});

document.getElementById('reroll-10').addEventListener('click', () => {
  rerollCounter += 10;
  updateRerollCount();
  rollItems(10);
});

document.getElementById('reroll-100').addEventListener('click', () => {
  rerollCounter += 100;
  updateRerollCount();
  rollItems(100);
});

document.getElementById('reroll-1000').addEventListener('click', () => {
  rerollCounter += 1000;
  updateRerollCount();
  rollItems(1000);
});
// Initialize the table with zero counts
updateTable();


document.getElementById("rollButton").addEventListener("click", rollItems);
