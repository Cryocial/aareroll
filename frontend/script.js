const pool = [
  { name: "Unique", rarity: "0.1%", probability: 0.1, count: 0 },
  { name: "Golden", rarity: "0.15%", probability: 0.15, count: 0 },
  { name: "Divine", rarity: "0.2%", probability: 0.2, count: 0 },
  { name: "Celestial", rarity: "0.36%", probability: 0.36, count: 0 },
  { name: "Reaper", rarity: "0.8%", probability: 0.8, count: 0 },
  { name: "Godspeed", rarity: "1%", probability: 1, count: 0 },
  { name: "Sniper", rarity: "2.5%", probability: 2.5, count: 0 },
  { name: "Culling", rarity: "5", probability: 5, count: 0 },
  { name: "Adept", rarity: "9.99%", probability: 9.99, count: 0 },
  { name: "Nimble III", rarity: "2.5%", probability: 3.75, count: 0 },
  { name: "Range III", rarity: "2.5%", probability: 3.75, count: 0 },
  { name: "Superior III", rarity: "2.5%", probability: 4.5, count: 0 },
  { name: "Everything Else", rarity: "94.89%", probability: 67.9, count: 0 },
];

// Function to simulate a roll
function doubleTrait() {
  const random = Math.random() * 2000;
  if (random < 1) {
    return true;
  }
  return false;
}

//
//roll checker (if double, how many, etc)
//

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
    const isRainbowItem = ["Unique", "Divine", "Golden", "Celestial", "Reaper"].includes(item.name);
    const isGoldenItem = ["Godspeed", "Sniper", "Culling", "Adept"].includes(item.name);
    const isEpicItem = ["Superior III", "Nimble III", "Range III"].includes(item.name);
    const isPlainItem = ["Everything Else"].includes(item.name);

    row.innerHTML = `
      <td class="${isRainbowItem ? 'rainbow-text' : ''}${isGoldenItem ? 'golden-text' : ''}${isEpicItem ? 'epic-text' : ''}${isPlainItem ? 'plain-text' : ''}">${item.name}</td>
      <td>${item.count}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initialize the table with zero counts
updateTable();


document.getElementById("rollButton").addEventListener("click", rollItems);
