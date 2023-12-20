function closePopup() {
  document.getElementById('popup').style.display = 'none';
  location.reload();
}

const selectedSeatIds = [];

const selectedSeats = [];

console.log("çalıştım");

function openPopup(seats) {
  const popupContent = document.getElementById('popup-content');

  if (popupContent) {
    if (selectedSeats.length > 0) {
      const existingContent = selectedSeats.map(seat => `${seat.seatNumber} - Tam:120 TL Öğrenci: 100 TL`).join('<br>');
      const newContent = `${seats}<br><br>${existingContent}`;
      popupContent.innerHTML = newContent;
      document.getElementById('popup').style.display = 'block';
    }
  }
}

let seatId;
let seatNumber;

document.addEventListener('DOMContentLoaded', async function () {
  const cinemahall = document.querySelector('.sinema-salonu');

  try {
    const response = await fetch('http://localhost:20000/seats');
    const salonData = await response.json();

    const gruplar = Array.from({ length: 14 }, () => document.createElement('div'));

    gruplar.forEach((grup, index) => {
      grup.classList.add(`grup-${index + 1}`);
      grup.classList.add(`grup2-${index + 2}`);
      grup.classList.add(`grup3-${index + 3}`);
      grup.classList.add(`grup4-${index + 4}`);
      grup.classList.add(`grup5-${index + 5}`);
      grup.classList.add(`grup6-${index + 6}`);
      grup.classList.add(`grup7-${index + 7}`);
      grup.classList.add(`grup8-${index + 8}`);
      grup.classList.add(`grup9-${index + 9}`);
      grup.classList.add(`grup10-${index + 10}`);
      grup.classList.add(`grup11-${index + 11}`);
      grup.classList.add(`grup12-${index + 12}`);
      grup.classList.add(`grup13-${index + 13}`);
      grup.classList.add(`grup14-${index + 14}`);
      
      salonData[0].seats.slice(index * 10, (index + 1) * 10).forEach((seat) => {
        const koltuk = document.createElement('button');
        koltuk.classList.add('koltuk');

        if (seat.selected) {
          koltuk.classList.add('secili', 'dolu');
        } 

        koltuk.textContent = seat.seatNumber;
        
        koltuk.addEventListener('click', function (event) {
          event.preventDefault();
          seatId = seat._id;
          seatNumber = seat.seatNumber;

          if (this.classList.contains('dolu')) {
            alert("Bu koltuk dolu, lütfen başka bir koltuk seçin");
            return;
          }

          if (selectedSeats.length >= 5) {
            alert("En fazla 5 koltuk seçebilirsiniz!");
            return;
          }

          this.classList.toggle('secili');

          if (this.classList.contains('secili')) {
            selectedSeats.push(seatNumber);
            selectedSeatIds.push(seatId);
          } else {
            const index = selectedSeatIds.indexOf(seatId);
            if (index > -1) {
              selectedSeatIds.splice(index, 1);
              selectedSeats.splice(index, 1);
            }
          }

          getSelectedSeatIds(seatId);
          getSelectedSeats(seatNumber);

          if (selectedSeats.length === 0) {
            closePopup();
          } else {
            openPopup(`Seçtiğiniz koltuklar: ${selectedSeats.map(seat => seat.seatNumber).join(', ')}`);
          }
        });
        grup.appendChild(koltuk);
      });

      cinemahall.appendChild(grup);
    });
    
  } catch (error) {
    console.error('Bir hata oluştu:', error);
  }
});

function getSelectedSeatIds(seatId) {
  alert("Seçilen koltuk ID'leri:"+ seatId);
  return seatId;
}

function getSelectedSeats(seatNumber) {
  alert("Seçilen koltuklar:"+ seatNumber);
  return seatNumber;
}

  // SATIN ALMA
  
  async function ticketbuy() {
    try {
      const response = await fetch('http://localhost:20000/ticketbuy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seatIds: selectedSeatIds,
        }),
      });
      window.location.href = 'buytickets.html';
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      alert("Bilet satın alma işleminde bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  window.ticketbuy = ticketbuy;

  function startCountdown(durationInSeconds) {
    document.addEventListener('DOMContentLoaded', function () {
      const countdownElement = document.getElementById('countdown');
  
      if (!countdownElement) {
        console.error('countdown element not found');
        return;
      }
  
      let remainingTime = durationInSeconds;
  
      function updateCountdown() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        countdownElement.textContent = `Kalan Süre: ${formattedTime}`;
  
        if (remainingTime <= -1) {
          clearInterval(countdownInterval);
          alert('Süre doldu! Sayfa yeniden yüklenecek');
          location.reload();
        }
  
        remainingTime--;
      }
  
      updateCountdown();
  
      const countdownInterval = setInterval(updateCountdown, 1000);
    });
  }
  

startCountdown(300);

export { getSelectedSeatIds, getSelectedSeats };