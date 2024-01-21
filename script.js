//your JS code here. If required.
function createRandomPromise(name) {
  const randomTime = Math.floor(Math.random() * 2000) + 1000; // Adjusted range to 1-2 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time: randomTime / 1000 });
    }, randomTime);
  });
}
// Get the tbody element
const tbody = document.getElementById('output');

// Create and append the loading row
const loadingRow = document.createElement('tr');
loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
tbody.appendChild(loadingRow);

// Create an array of 3 promises
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3'),
];

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    tbody.removeChild(loadingRow);

    // Populate the table with the required values
    results.forEach((result) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${result.name}</td><td>${result.time.toFixed(3)}</td>`;
      tbody.appendChild(row);
    });

    // Calculate and add the Total row
    const totalTime = results.reduce((total, result) => total + result.time, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    tbody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });