import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let width = 0;
    let height = 0;
    let particles = [];

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function createParticle() {
      const angle = Math.random() * Math.PI * 2;

      return {
        x: Math.random() * width,
        y: Math.random() * height,

        radius: 0.6 + Math.random() * 1.4,
        opacity: 0.25 + Math.random() * 0.55,

        vx: Math.cos(angle) * (0.08 + Math.random() * 0.22),
        vy: Math.sin(angle) * (0.08 + Math.random() * 0.22),

        baseVx: Math.cos(angle) * (0.08 + Math.random() * 0.22),
        baseVy: Math.sin(angle) * (0.08 + Math.random() * 0.22),

        hue: Math.random() > 0.5 ? 190 : 255,
      };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 700;

      /*
       * More particles than before.
       */
      const particleCount = reducedMotion
        ? 50
        : isMobile
        ? 85
        : Math.min(190, Math.floor((width * height) / 8000));

      particles = Array.from(
        { length: particleCount },
        createParticle
      );
    }

    function handlePointerMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    }

    function handlePointerLeave() {
      mouse.active = false;
    }

    function drawParticle(particle) {
      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = `hsla(
        ${particle.hue},
        95%,
        82%,
        ${particle.opacity}
      )`;

      ctx.fill();
    }

    function drawConnections() {
      if (!mouse.active) return;

      const interactionRadius = 220;

      /*
       * Connect particles that are close to the cursor.
       */
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        const mouseDx = particle.x - mouse.x;
        const mouseDy = particle.y - mouse.y;
        const mouseDistance = Math.sqrt(
          mouseDx * mouseDx + mouseDy * mouseDy
        );

        if (mouseDistance > interactionRadius) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 85) {
            const alpha =
              0.12 *
              (1 - mouseDistance / interactionRadius) *
              (1 - distance / 85);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);

            ctx.strokeStyle = `hsla(
              ${particle.hue},
              90%,
              75%,
              ${alpha}
            )`;

            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }
    }

    function drawCursorGlow() {
      const glow = ctx.createRadialGradient(
  mouse.x,
  mouse.y,
  0,
  mouse.x,
  mouse.y,
  230
);
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        /*
         * Natural ambient movement.
         */
        particle.x += particle.vx;
        particle.y += particle.vy;

        /*
         * Wrap around the screen.
         */
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;

        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        /*
         * STRONGER mouse interaction.
         */
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          const interactionRadius = 220;

          if (
            distance < interactionRadius &&
            distance > 0
          ) {
            /*
             * Stronger force when closer to cursor.
             */
            const force =
              Math.pow(
                1 - distance / interactionRadius,
                2
              ) * 0.16;

            particle.vx +=
              (dx / distance) * force;

            particle.vy +=
              (dy / distance) * force;
          }
        }

        /*
         * Slowly return to natural movement.
         */
        particle.vx +=
          (particle.baseVx - particle.vx) * 0.035;

        particle.vy +=
          (particle.baseVy - particle.vy) * 0.035;

        /*
         * Smooth the movement.
         */
        particle.vx *= 0.97;
        particle.vy *= 0.97;

        drawParticle(particle);
      });

      drawConnections();


      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    resize();
    animate();

    window.addEventListener("resize", resize);

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
      aria-hidden="true"
    />
  );
}