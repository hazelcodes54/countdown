const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

// Get DOM elements
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// Set future date - 30 days from now
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 30);
futureDate.setHours(23, 59, 59, 999);

console.log('Countdown ends:', futureDate);

// Format and display the end date
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

// Update the giveaway text with formatted date
giveaway.textContent = `Ends on ${weekday}, ${date} ${month} ${year} at ${hours}:${minutes.toString().padStart(2, '0')}`;

// Get future time in milliseconds
const futureTime = futureDate.getTime();

// Add number formatting with leading zeros
function formatNumber(num) {
  return num < 10 ? `0${num}` : num;
}

// Add animation class to countdown numbers
function animateNumber(element) {
  element.style.transform = 'scale(1.1)';
  element.style.color = '#FFD700';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
    element.style.color = 'white';
  }, 300);
}

// Main countdown function
function getRemainingTime() {
  const today = new Date().getTime();
  const timeDifference = futureTime - today;

  // Check if countdown has ended
  if (timeDifference <= 0) {
    clearInterval(countdown);
    deadline.innerHTML = `
      <div class="expired-message">
        <i class="fas fa-hourglass-end" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 20px;"></i>
        <h4 class="expired">🎉 Giveaway Has Ended! 🎉</h4>
        <p style="color: #666; margin-top: 10px;">Thank you for participating!</p>
      </div>
    `;
    return;
  }

  // Time calculations
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Calculate remaining time units
  const days = Math.floor(timeDifference / oneDay);
  const hours = Math.floor((timeDifference % oneDay) / oneHour);
  const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
  const seconds = Math.floor((timeDifference % oneMinute) / 1000);

  // Array of time values
  const timeValues = [days, hours, minutes, seconds];

  // Update countdown display with animation
  items.forEach((item, index) => {
    const newValue = formatNumber(timeValues[index]);
    if (item.textContent !== newValue) {
      animateNumber(item);
      item.textContent = newValue;
    }
  });

  // Add urgency effects when time is running low
  if (timeDifference < 24 * 60 * 60 * 1000) { // Less than 24 hours
    deadline.classList.add('urgent');
    document.querySelector('.gift-container').style.border = '2px solid #ff6b6b';
  }

  if (timeDifference < 60 * 60 * 1000) { // Less than 1 hour
    deadline.classList.add('critical');
    items.forEach(item => {
      item.style.animation = 'flash 0.5s infinite alternate';
    });
  }
}

// Add CSS for urgency states
const style = document.createElement('style');
style.textContent = `
  .urgent {
    animation: shake 2s infinite;
  }
  
  .critical {
    animation: shake 0.5s infinite;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .expired-message {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    border-radius: 20px;
    color: white;
    width: 100%;
  }
`;
document.head.appendChild(style);

// Add click handler for CTA button
document.querySelector('.cta-button').addEventListener('click', function() {
  this.innerHTML = '<i class="fas fa-check"></i> Entry Submitted!';
  this.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
  
  // Show success animation
  const originalText = this.innerHTML;
  setTimeout(() => {
    this.innerHTML = '<i class="fas fa-trophy"></i> Enter Giveaway Now!';
    this.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
  }, 3000);
});

// Initialize countdown
getRemainingTime();

// Update countdown every second
const countdown = setInterval(getRemainingTime, 1000);

// Add page load animation
window.addEventListener('load', function() {
  document.querySelector('.gift-container').style.animation = 'slideIn 1s ease-out';
});

// Add floating particles effect
function createParticle() {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: #FFD700;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    left: ${Math.random() * 100}vw;
    top: 100vh;
    animation: float 6s linear infinite;
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => particle.remove(), 6000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float {
    to {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 2000);
