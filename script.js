document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // 1. Animated Background
    // ============================
    (function () {
        const canvas = document.getElementById('three-bg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w = window.innerWidth, h = window.innerHeight;
        let particles = [];
        const PARTICLE_COUNT = 70;

        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 2 + 1,
                    dx: (Math.random() - 0.5) * 0.7,
                    dy: (Math.random() - 0.5) * 0.7
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);
            ctx.save();
            ctx.globalAlpha = 0.7;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = particles[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
                ctx.fillStyle = "#6cff87";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#39ff14";
                ctx.fill();
            }
            ctx.restore();

            // Lines between close particles
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const p1 = particles[i], p2 = particles[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 100) {
                        ctx.save();
                        ctx.globalAlpha = 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = "#39ff14";
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        function animateParticles() {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                let p = particles[i];
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > w) p.dx *= -1;
                if (p.y < 0 || p.y > h) p.dy *= -1;
            }
            drawParticles();
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        resize();
        createParticles();
        animateParticles();
    })();


    const fade_sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
        (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target); // run only once
            }
        });
        },
        {
        threshold: 0.2, // triggers when 20% of element is visible
        }
    );

    fade_sections.forEach(section => {
        observer.observe(section);
    });



    const adminLink = document.getElementById("admin");
    const adminCard = document.querySelector(".admin-card");
    const closeBtn = document.getElementById("close");

    // Hide admin card by default
    adminCard.style.display = "none";

    // Show card when Admin link is clicked
    adminLink.addEventListener("click", function (e) {
        e.preventDefault(); // prevent jumping to #admin
        adminCard.style.display = "flex";
    });

    // Hide card when Close button is clicked
    closeBtn.addEventListener("click", function () {
        adminCard.style.display = "none";
    });

    // ============================
    // 2. Theme + Menu + Nav Logic
    // ============================
    const themeBtn = document.querySelector('.theme');
    const body = document.body;
    const themeIcon = themeBtn.querySelector('span');
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('header nav');
    const navLinks = nav.querySelectorAll('a');
    const admin = document.querySelector('.admin');
    
    // Theme toggle
    themeBtn.addEventListener('click', function () {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeIcon.textContent = "light_mode";
        } else {
            themeIcon.textContent = "dark_mode";
        }
    });

    // Mobile menu toggle
    menuBtn.addEventListener('click', function () {
        nav.classList.toggle('show');
    });

    // Hide nav on nav link click (mobile only)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 700) {
                nav.classList.remove('show');
            }
        });
    });
    document.querySelector('nav a[href="#about"]').classList.add('active-section');
    // Highlight active nav link based on scroll
    const sections = ['about', 'skills', 'projects', 'contact'];
    window.addEventListener('scroll', function () {
        let scrollPos = window.scrollY || window.pageYOffset;
        let offset = 120; // Adjust for header height
        let pageBottom = window.innerHeight + scrollPos >= document.body.offsetHeight - 2;

        let activeSet = false;

        sections.forEach(id => {
            const section = document.getElementById(id);
            const navLink = nav.querySelector(`a[href="#${id}"]`);
            if (section) {
                const top = section.getBoundingClientRect().top + window.scrollY - offset;
                const bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    navLinks.forEach(link => link.classList.remove('active-section'));
                    if (navLink) navLink.classList.add('active-section');
                    activeSet = true;
                }
            }
        });

        // If reached page bottom → highlight "contact"
        if (pageBottom) {
            navLinks.forEach(link => link.classList.remove('active-section'));
            const contactLink = nav.querySelector('a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active-section');
        }
    });
});
