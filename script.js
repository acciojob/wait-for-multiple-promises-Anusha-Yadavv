//your JS code here. If required.
// Function to create a Promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(name) {
  const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time: randomTime / 1000 }); // Resolve with an object containing promise name and time in seconds
    }, randomTime);
  });
}

// Add a loading row initially
document.getElementById('output').innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

// Create an array of 3 promises
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3'),
];

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove loading text
    document.getElementById('output').innerHTML = '';

    // Populate the table with the required values
    results.forEach((result) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${result.name}</td><td>${result.time.toFixed(3)}</td>`;
      document.getElementById('output').appendChild(row);
    });

    // Calculate and add the Total row
    const totalTime = results.reduce((total, result) => total + result.time, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    document.getElementById('output').appendChild(totalRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
