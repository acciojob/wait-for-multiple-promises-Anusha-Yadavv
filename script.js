//your JS code here. If required.
// Function to create a Promise that resolves after a random time between min and max seconds
function createRandomPromise(min, max) {
  const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime * 1000);
  });
}

// Array to store the three Promises
const promisesArray = [
  createRandomPromise(1, 3),
  createRandomPromise(1, 3),
  createRandomPromise(1, 3)
];

// Add a row with "Loading..." to the table
const loadingRow = document.getElementById("output").insertRow();
const loadingCell = loadingRow.insertCell(0);
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";

// Use Promise.all to wait for all promises to resolve
Promise.all(promisesArray)
  .then(results => {
    // Remove the loading text
    document.getElementById("output").deleteRow(loadingRow.rowIndex);

    // Populate the table with the required values
    for (let i = 0; i < promisesArray.length; i++) {
      const row = document.getElementById("output").insertRow();
      const promiseCell = row.insertCell(0);
      const timeTakenCell = row.insertCell(1);

      promiseCell.textContent = `Promise ${i + 1}`;
      timeTakenCell.textContent = `${results[i].toFixed(3)}`;
    }

    // Calculate and add the Total row
    const totalRow = document.getElementById("output").insertRow();
    const totalPromiseCell = totalRow.insertCell(0);
    const totalTimeCell = totalRow.insertCell(1);

    totalPromiseCell.textContent = "Total";
    const totalTime = results.reduce((acc, time) => acc + time, 0);
    totalTimeCell.textContent = totalTime.toFixed(3);
  })
  .catch(error => console.error(error));
