// ======================================================
// for cutie — interactions
// ======================================================

/* ---------- CONFETTI ---------- */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const CONFETTI_COLORS = ['#FF8FAE', '#FFD966', '#9FD8E8', '#C9B6E4', '#E85D4E'];

function createConfetti(count) {
  const pieces = [];
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      size: 5 + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speedY: 1.8 + Math.random() * 2.8,
      speedX: (Math.random() - 0.5) * 2.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 9,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      life: 0,
      maxLife: 240 + Math.random() * 70,
    });
  }
  return pieces;
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  });
  confettiPieces = confettiPieces.filter((p) => p.life < p.maxLife && p.y < canvas.height + 40);
  if (confettiPieces.length > 0) requestAnimationFrame(animateConfetti);
  else { confettiRunning = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

function burstConfetti(count = 120) {
  confettiPieces = confettiPieces.concat(createConfetti(count));
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(animateConfetti); }
}

/* ---------- SCROLL REVEAL ---------- */
const blocks = document.querySelectorAll('.block');
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
  { threshold: 0.2 }
);
blocks.forEach((b) => revealObserver.observe(b));

/* ---------- NEXT BUTTONS ---------- */
document.querySelectorAll('[data-next]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.next)?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- GIFT OPEN ---------- */
const giftBtn = document.getElementById('gift-btn');
let giftOpened = false;
giftBtn.addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;
  giftBtn.classList.add('opened');
  burstConfetti(140);
  setTimeout(() => {
    document.querySelector('.reveal-block')?.scrollIntoView({ behavior: 'smooth' });
  }, 500);
});

/* ---------- CORKBOARD FLIP ---------- */
document.querySelectorAll('[data-flip]').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

/* ---------- BALLOON POP GAME ---------- */
const balloonWords = ['You', 'are', 'so', 'loved,', 'Cutie', '—', 'have', 'the', 'best', 'day', 'ever!', '💛'];
const balloonColors = ['#FF8FAE', '#FFD966', '#9FD8E8', '#C9B6E4', '#F3A6B4'];
const balloonField = document.getElementById('balloon-field');
const balloonProgress = document.getElementById('balloon-progress');
const balloonMessageEl = document.getElementById('balloon-message');
const toCakeBtn = document.getElementById('to-cake-btn');

let poppedCount = 0;
const totalBalloons = balloonWords.length;
const revealedWords = new Array(totalBalloons).fill(false);

balloonWords.forEach((word, i) => {
  const b = document.createElement('button');
  b.className = 'balloon';
  b.style.background = balloonColors[i % balloonColors.length];
  b.setAttribute('aria-label', 'pop balloon');
  b.textContent = '🎈';
  b.addEventListener('click', () => popBalloon(i), { once: true });
  balloonField.appendChild(b);

  function popBalloon(index) {
    b.classList.add('popped');
    poppedCount++;
    revealedWords[index] = true;
    balloonProgress.style.width = `${(poppedCount / totalBalloons) * 100}%`;
    balloonMessageEl.textContent = balloonWords
      .map((w, idx) => (revealedWords[idx] ? w : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (poppedCount === totalBalloons) {
      burstConfetti(70);
      toCakeBtn.classList.remove('hidden');
    }
  }
});

/* ---------- CANDLES ---------- */
const blowBtn = document.getElementById('blow-btn');
const candles = document.querySelectorAll('.candle');
const cakeHint = document.getElementById('cake-hint');
let candlesBlown = false;

blowBtn.addEventListener('click', () => {
  if (candlesBlown) return;
  candlesBlown = true;
  candles.forEach((c, i) => setTimeout(() => c.classList.add('blown'), i * 320));
  cakeHint.textContent = 'wish made. here comes the good part...';
  setTimeout(() => {
    burstConfetti(160);
    document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' });
  }, candles.length * 320 + 400);
});

/* ---------- REPLAY ---------- */
document.getElementById('replay-btn').addEventListener('click', () => burstConfetti(180));
