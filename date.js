let startDate = new Date();

function updateCounter() {

  const currentDate = new Date();

  const elapsedTime = currentDate - startDate;

  const seconds = Math.floor(elapsedTime / 1000);

  console.log(` ${currentDate}`);
}

setInterval(updateCounter, 1000);