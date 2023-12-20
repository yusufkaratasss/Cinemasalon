import * as kroki from '../giris/kroki.js';

const { getSelectedSeatIds, selectedSeatsId } = kroki;

const seatId2 = getSelectedSeatIds();
const selectedSeats = selectedSeatsId();

async function ticketPayment(seatId) {

  try {
    const response = await fetch('http://localhost:20000/ticketpayment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seatIds: seatId2,
      }),
    });
    location.reload();
  } catch (error) {
    console.error('Bir hata oluştu:', error);
    alert("Bilet ödeme işleminde bir hata oluştu. Lütfen tekrar deneyin.");
  }
}

window.ticketPayment = ticketPayment;

function createSeatSelect(seatNumber) {
  const selectElement = document.getElementById('seatSelect');

  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
  }

  selectedSeats.forEach(seat => {
    const optionElement = document.createElement('option');
    optionElement.value = seat.seatNumber;
    optionElement.textContent = seat.seatNumber;
    selectElement.appendChild(optionElement);
  });
}

createSeatSelect();
