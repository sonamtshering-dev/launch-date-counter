var LAUNCH_DATE = new Date('2026-03-26T18:00:00');
var PROJECT_START = new Date('2026-01-01T00:00:00');
var NOTIFY_EMAIL = 'support@xenpaikart.in';

(function () {
  'use strict';

  window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('loader').classList.add('hidden');
      revealElements();
    }, 1200);
  });

  function revealElements() {
    var items = document.querySelectorAll('.fade-in');
    items.forEach(function (el) {
      var delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(function () { el.classList.add('visible'); }, delay);
    });
  }

  var daysEl = document.getElementById('days');
  var hoursEl = document.getElementById('hours');
  var minutesEl = document.getElementById('minutes');
  var secondsEl = document.getElementById('seconds');
  var countdownGrid = document.getElementById('countdownGrid');
  var liveMessage = document.getElementById('liveMessage');
  var progressFill = document.getElementById('progressFill');
  var progressGlow = document.getElementById('progressGlow');
  var progressPercent = document.getElementById('progressPercent');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function animateTick(el) {
    el.classList.add('tick');
    setTimeout(function () { el.classList.remove('tick'); }, 300);
  }

  var prevValues = { d: -1, h: -1, m: -1, s: -1 };

  function updateCountdown() {
    var now = new Date();
    var diff = LAUNCH_DATE - now;

    var total = LAUNCH_DATE - PROJECT_START;
    var elapsed = now - PROJECT_START;
    var pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    progressFill.style.width = pct + '%';
    progressGlow.style.width = pct + '%';
    progressPercent.textContent = Math.round(pct) + '%';

    if (diff <= 0) {
      countdownGrid.style.display = 'none';
      document.querySelector('.countdown-label').style.display = 'none';
      liveMessage.classList.add('active');
      progressFill.style.width = '100%';
      progressGlow.style.width = '100%';
      progressPercent.textContent = '100%';
      return;
    }

    var d = Math.floor(diff / (1000 * 60 * 60 * 24));
    var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var m = Math.floor((diff / (1000 * 60)) % 60);
    var s = Math.floor((diff / 1000) % 60);

    if (d !== prevValues.d) { daysEl.textContent = pad(d); animateTick(daysEl); prevValues.d = d; }
    if (h !== prevValues.h) { hoursEl.textContent = pad(h); animateTick(hoursEl); prevValues.h = h; }
    if (m !== prevValues.m) { minutesEl.textContent = pad(m); animateTick(minutesEl); prevValues.m = m; }
    if (s !== prevValues.s) { secondsEl.textContent = pad(s); animateTick(secondsEl); prevValues.s = s; }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  var emailInput = document.getElementById('emailInput');
  var notifyBtn = document.getElementById('notifyBtn');
  var feedback = document.getElementById('formFeedback');

  notifyBtn.addEventListener('click', function () {
    var email = emailInput.value.trim();
    feedback.className = 'form-feedback';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.classList.add('error');
      return;
    }

    var subject = encodeURIComponent('Xenpai Launch - Notify Me');
    var body = encodeURIComponent(
      'Hi Xenpai Team,\n\nPlease notify me when Xenpai launches!\n\nMy email: ' + email + '\n\nThanks!'
    );
    window.location.href = 'mailto:' + NOTIFY_EMAIL + '?subject=' + subject + '&body=' + body;

    feedback.textContent = 'Opening your email app...';
    feedback.classList.add('success');
    emailInput.value = '';
  });

  emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') notifyBtn.click();
  });

  var mouseGlow = document.getElementById('mouseGlow');
  var mouseActive = false;

  document.addEventListener('mousemove', function (e) {
    if (!mouseActive) {
      mouseGlow.style.display = 'block';
      mouseActive = true;
    }
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', function () {
    mouseGlow.style.display = 'none';
    mouseActive = false;
  });

  var orbs = document.querySelectorAll('.gradient-orb');

  document.addEventListener('mousemove', function (e) {
    var cx = (e.clientX / window.innerWidth - 0.5) * 2;
    var cy = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach(function (orb, i) {
      var depth = (i + 1) * 12;
      orb.style.transform = 'translate(' + (cx * depth) + 'px, ' + (cy * depth) + 'px)';
    });
  });

  var canvas = document.getElementById('particleCanvas');
  var ctx = canvas.getContext('2d');
  var particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = Math.random() > 0.5 ? 190 : 270;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.005;
  };

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += this.pulseSpeed;

    if (this.x < -10 || this.x > canvas.width + 10 ||
        this.y < -10 || this.y > canvas.height + 10) {
      this.reset();
    }
  };

  Particle.prototype.draw = function () {
    var glow = Math.sin(this.pulse) * 0.15 + 0.85;
    var alpha = this.opacity * glow;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + this.hue + ', 80%, 65%, ' + alpha + ')';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + this.hue + ', 80%, 65%, ' + (alpha * 0.15) + ')';
    ctx.fill();
  };

  function initParticles() {
    var count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawLines() {
    var maxDist = 120;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          var lineAlpha = (1 - dist / maxDist) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(100, 180, 255, ' + lineAlpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParticles, 250);
  });

})();