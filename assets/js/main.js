'use strict';

(() => {
  /**
   * Módulo 1: Renderizado seguro de la consola de diagnóstico (Sin usar innerHTML para evitar XSS)
   */
  const initTerminal = () => {
    const terminal = document.getElementById('terminal-output');
    if (!terminal) return;

    const loadTime = Math.max(12, Math.round(performance.now()));

    const logs = [
      { prefix: '$ ', text: 'git checkout -b ', highlight: 'hackatec-2026-prod', className: 'highlight' },
      { prefix: '✔ ', text: 'Subdominio aislado y certificado SSL activo', prefixClass: 'success' },
      { prefix: '✔ ', text: 'Cabeceras HTTP y protección .htaccess activas', prefixClass: 'success' },
      { prefix: '$ ', text: './run-diagnostics.sh --mode=secure' },
      { prefix: '  ├─ ', text: 'Tiempo de respuesta DOM: ', highlight: `${loadTime} ms`, className: 'success' },
      { prefix: '  ├─ ', text: 'Arquitectura: ', highlight: 'Modular (HTML/CSS/JS)', className: 'highlight' },
      { prefix: '  └─ ', text: 'Estado del servidor: ', highlight: 'ONLINE (200 OK)', className: 'success' },
      { prefix: '$ ', text: 'Esperando despliegue del prototipo...' }
    ];

    logs.forEach((entry, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'cmd-line';

        const prefixSpan = document.createElement('span');
        prefixSpan.className = entry.prefixClass || 'prompt';
        prefixSpan.textContent = entry.prefix;
        line.appendChild(prefixSpan);

        const textNode = document.createTextNode(entry.text);
        line.appendChild(textNode);

        if (entry.highlight) {
          const highlightSpan = document.createElement('span');
          highlightSpan.className = entry.className || '';
          highlightSpan.textContent = entry.highlight;
          line.appendChild(highlightSpan);
        }

        terminal.appendChild(line);
      }, index * 350);
    });
  };

  /**
   * Módulo 2: Red de nodos en Canvas optimizada
   */
  const initNetworkCanvas = () => {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];

    const setupParticles = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = window.innerWidth < 768 ? 25 : 50;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 2 + 1
      }));
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.45)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.18 - dist / 750})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderFrame);
    };

    window.addEventListener('resize', setupParticles, { passive: true });
    setupParticles();
    renderFrame();
  };

  // Inicialización cuando el DOM está listo
  document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
    initNetworkCanvas();
  });
})();