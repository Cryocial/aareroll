const pool = [
  { name: "Unique", rarity: "0.1%", probability: 0.1, count: 0 },
  { name: "Golden", rarity: "0.15%", probability: 0.15, count: 0 },
  { name: "Divine", rarity: "0.2%", probability: 0.2, count: 0 },
  { name: "Celestial", rarity: "0.36%", probability: 0.36, count: 0 },
  { name: "Reaper", rarity: "0.8%", probability: 0.8, count: 0 },
  { name: "Godspeed", rarity: "1%", probability: 1, count: 0 },
  { name: "Sniper", rarity: "2.5%", probability: 2.5, count: 0 },
  { name: "Everything Else", rarity: "94.89%", probability: 94.89, count: 0 },
];

// Function to simulate a roll
function simulateRoll() {
  const random = Math.random() * 100; // Generate a number between 0 and 100
  let cumulative = 0;

  for (const item of pool) {
    cumulative += item.probability;
    if (random < cumulative) {
      item.count += 1; // Increment count for the rolled item
      updateTable();
      return item; // Return the rolled item
    }
  }
}

// Function to update the table
function updateTable() {
  const tableBody = document.getElementById("rollTable");
  tableBody.innerHTML = ""; // Clear the existing rows

  pool.forEach(item => {
    const row = document.createElement("tr");
    const isRainbowItem = ["Unique", "Divine", "Golden", "Celestial", "Reaper"].includes(item.name);
    const isGoldenItem = ["Godspeed", "Sniper"].includes(item.name);
    const isPlainItem = ["Everything Else"].includes(item.name);

    row.innerHTML = `
      <td class="${isRainbowItem ? 'rainbow-text' : ''}${isGoldenItem ? 'golden-text' : ''}${isPlainItem ? 'plain-text' : ''}">${item.name}</td>
      <td>${item.count}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initialize the table with zero counts
updateTable();
