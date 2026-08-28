const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let pieces = [];
let running = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['#FF6F91', '#FFC93C', '#B8A6FF', '#7FE3C6', '#FFD9E8'];

function makeConfetti(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      size: 5 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedY: 1.8 + Math.random() * 2.8,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      life: 0,
      maxLife: 240 + Math.random() * 60,
    });
  }
  return arr;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.life < p.maxLife && p.y < canvas.height + 40);
  if (pieces.length > 0) requestAnimationFrame(animate);
  else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

function burst(count = 150) {
  pieces = pieces.concat(makeConfetti(count));
  if (!running) { running = true; requestAnimationFrame(animate); }
}

// celebrate on page load
window.addEventListener('load', () => burst(120));

// celebrate again on button click
document.getElementById('celebrate-btn').addEventListener('click', () => burst(150));
