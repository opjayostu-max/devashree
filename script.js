// ======================================================
// Devashree's Birthday Site — interactions
// ======================================================

/* ---------- CONFETTI ENGINE ---------- */
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

const CONFETTI_COLORS = ['#FF6F91', '#FFC93C', '#B8A6FF', '#7FE3C6', '#FFD9E8'];

function createConfetti(count = 140) {
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
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      life: 0,
      maxLife: 260 + Math.random() * 80,
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
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
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

function burstConfetti(count = 140) {
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
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        updateActiveDot(entry.target.id);
      }
    });
  },
  { threshold: 0.35 }
);
screens.forEach((s) => revealObserver.observe(s));

/* ---------- PROGRESS DOTS ---------- */
const dots = document.querySelectorAll('.dot');
function updateActiveDot(id) {
  dots.forEach((d) => d.classList.toggle('active', d.dataset.target === id));
}
dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    document.getElementById(dot.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- NEXT BUTTONS (scroll to next section) ---------- */
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
  burstConfetti(160);
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
const balloonColors = ['#FF6F91', '#FFC93C', '#B8A6FF', '#7FE3C6', '#FF9EB8'];
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
  b.addEventListener('click', () => popBalloon(b, i, word), { once: true });
  balloonField.appendChild(b);
});

function popBalloon(el, index, word) {
  el.classList.add('popped');
  poppedCount++;
  revealedWords[index] = true;
  balloonProgress.style.width = `${(poppedCount / totalBalloons) * 100}%`;

  // rebuild message in original word order using only revealed words
  balloonMessageEl.textContent = balloonWords
    .map((w, i) => (revealedWords[i] ? w : ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (poppedCount === totalBalloons) {
    burstConfetti(80);
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
  cakeHint.textContent = 'Wish made. Here comes the good part...';
  setTimeout(() => {
    burstConfetti(180);
    document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
  }, candles.length * 350 + 400);
});

/* ---------- REPLAY CONFETTI ---------- */
document.getElementById('replay-btn').addEventListener('click', () => {
  burstConfetti(200);
});
