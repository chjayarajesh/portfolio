document.addEventListener("DOMContentLoaded", function () {
    const themeBtn = document.querySelector('.theme');
    const body = document.body;
    const themeIcon = themeBtn.querySelector('span');
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('header nav');
    const navLinks = nav.querySelectorAll('a');

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

    // Highlight active nav link based on scroll
    const sections = ['about', 'skills', 'projects', 'contact'];
    window.addEventListener('scroll', function () {
        let scrollPos = window.scrollY || window.pageYOffset;
        let offset = 120; // Adjust for header height

        sections.forEach(id => {
            const section = document.getElementById(id);
            const navLink = nav.querySelector(`a[href="#${id}"]`);
            if (section) {
                const top = section.getBoundingClientRect().top + window.scrollY - offset;
                const bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    navLinks.forEach(link => link.classList.remove('active-section'));
                    if (navLink) navLink.classList.add('active-section');
                }
            }
        });
    });
});