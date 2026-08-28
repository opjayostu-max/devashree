// ======================================================
// Devashree's Birthday Page — interactions
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

const CONFETTI_COLORS = ['#FF5C7A', '#FFCB47', '#7FCBDB', '#9BCB6B'];

function createConfetti(count = 120) {
  const pieces = [];
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      size: 6 + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 0,
      maxLife: 250 + Math.random() * 80,
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
    ctx.strokeStyle = '#2B2118';
    ctx.lineWidth = 1;
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    // little hand-cut paper strip look
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.strokeRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter((p) => p.life < p.maxLife && p.y < canvas.height + 40);

  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function burstConfetti(count = 120) {
  confettiPieces = confettiPieces.concat(createConfetti(count));
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

/* ---------- SCROLL REVEAL ---------- */
const screens = document.querySelectorAll('.screen');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  },
  { threshold: 0.3 }
);
screens.forEach((s) => revealObserver.observe(s));

/* ---------- NEXT BUTTONS ---------- */
document.querySelectorAll('[data-next]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.next)?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- GIFT BOX OPEN ---------- */
const giftBtn = document.getElementById('gift-btn');
let giftOpened = false;
giftBtn.addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;
  giftBtn.classList.add('opened');
  burstConfetti(150);
  setTimeout(() => {
    document.getElementById('reveal').scrollIntoView({ behavior: 'smooth' });
  }, 550);
});

/* ---------- FLIP CARDS ---------- */
document.querySelectorAll('.flip-card').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

/* ---------- BALLOON POP GAME ---------- */
const balloonWords = ['You', 'are', 'so', 'loved,', 'Cutie', '—', 'have', 'the', 'best', 'day', 'ever!', '💛'];
const balloonColors = ['#FF5C7A', '#FFCB47', '#7FCBDB', '#9BCB6B'];
const balloonField = document.getElementById('balloon-field');
const balloonProgress = document.getElementById('balloon-progress');
const balloonMessageEl = document.getElementById('balloon-message');
const toCakeBtn = document.getElementById('to-cake-btn');

let poppedCount = 0;
const totalBalloons = balloonWords.length;
let revealedWords = new Array(totalBalloons).fill(false);

balloonWords.forEach((word, i) => {
  const b = document.createElement('button');
  b.className = 'balloon';
  b.style.background = balloonColors[i % balloonColors.length];
  b.style.animationDuration = `${3 + (i % 4) * 0.4}s`;
  b.setAttribute('aria-label', 'Pop balloon');
  b.textContent = '🎈';
  b.addEventListener('click', () => popBalloon(b, i), { once: true });
  balloonField.appendChild(b);
});

function popBalloon(el, index) {
  el.classList.add('popped');
  poppedCount++;
  revealedWords[index] = true;
  balloonProgress.style.width = `${(poppedCount / totalBalloons) * 100}%`;

  balloonMessageEl.textContent = balloonWords
    .map((w, i) => (revealedWords[i] ? w : ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (poppedCount === totalBalloons) {
    burstConfetti(70);
    toCakeBtn.classList.remove('hidden');
  }
}

/* ---------- CANDLES / CAKE ---------- */
const blowBtn = document.getElementById('blow-btn');
const candles = document.querySelectorAll('.candle');
const cakeHint = document.getElementById('cake-hint');
let candlesBlown = false;

blowBtn.addEventListener('click', () => {
  if (candlesBlown) return;
  candlesBlown = true;
  candles.forEach((c, i) => {
    setTimeout(() => c.classList.add('blown'), i * 350);
  });
  cakeHint.textContent = 'wish made. here comes the last bit...';
  setTimeout(() => {
    burstConfetti(160);
    document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
  }, candles.length * 350 + 400);
});

/* ---------- REPLAY CONFETTI ---------- */
document.getElementById('replay-btn').addEventListener('click', () => {
  burstConfetti(180);
});
