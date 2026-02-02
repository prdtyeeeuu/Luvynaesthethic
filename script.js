// Smooth scrolling for anchor links (excluding external links and payment page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Only apply smooth scrolling to internal anchors, not to payment.html
    if (!anchor.href.includes('payment.html')) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animatedElements = document.querySelectorAll('.feature-card, .step, .benefit, .price-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Button hover effects enhancement
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Variables to track scroll direction
    let lastScrollTop = 0;

    // Add scroll event listener for header effect and animations
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if(currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Add animation classes based on scroll direction
        if (currentScroll > lastScrollTop){
            // Scrolling down
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        } else {
            // Scrolling up
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Light switch functionality
    const turnOnBtn = document.getElementById('turnOnBtn');
    const turnOffBtn = document.getElementById('turnOffBtn');
    const lightSwitch = document.getElementById('lightSwitch');
    const ufoZoneLeft = document.getElementById('ufoZoneLeft');
    const ufoZoneRight = document.getElementById('ufoZoneRight');
    const ufoZoneTop = document.getElementById('ufoZoneTop');
    const ufoZoneBottom = document.getElementById('ufoZoneBottom');

    // Initialize with OFF state (no glow effect)
    if(lightSwitch) {
        lightSwitch.classList.remove('on-state');
    }

    if(ufoZoneLeft && ufoZoneRight && ufoZoneTop && ufoZoneBottom) {
        ufoZoneLeft.classList.remove('active');
        ufoZoneRight.classList.remove('active');
        ufoZoneTop.classList.remove('active');
        ufoZoneBottom.classList.remove('active');
    }

    // Function to create a UFO element
    function createUFO() {
        const ufo = document.createElement('div');
        ufo.className = 'ufo';

        // Random animation duration and delay for variety
        const duration = 8 + Math.random() * 7; // Between 8-15 seconds
        const delay = Math.random() * 5; // Up to 5 seconds delay

        ufo.style.animationDuration = `${duration}s`;
        ufo.style.animationDelay = `${delay}s`;

        return ufo;
    }

    // Function to position UFOs randomly within a zone
    function positionUFOsInZone(zone, count) {
        // Clear existing UFOs
        zone.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const ufo = createUFO();

            // Calculate safe random position within the zone
            // Account for UFO dimensions, animation movement, and add safe padding
            const ufoWidth = 30; // Width of UFO element
            const ufoHeight = 30; // Height of UFO element (including before/after elements)
            const animationMovement = 10; // Approximate movement during animation
            const safePadding = 20; // Increased safe margin from edges to prevent cropping

            // Ensure the zone has sufficient size to accommodate the UFO with padding and animation space
            const maxX = Math.max(0, zone.clientWidth - ufoWidth - (safePadding * 2) - (animationMovement * 2));
            const maxY = Math.max(0, zone.clientHeight - ufoHeight - (safePadding * 2) - (animationMovement * 2));

            // Generate random position within safe bounds
            const top = safePadding + animationMovement + Math.floor(Math.random() * maxY);
            const left = safePadding + animationMovement + Math.floor(Math.random() * maxX);

            ufo.style.top = `${top}px`;
            ufo.style.left = `${left}px`;

            zone.appendChild(ufo);
        }
    }

    if(turnOnBtn && turnOffBtn && lightSwitch) {
        turnOnBtn.addEventListener('click', function() {
            turnOnBtn.classList.add('active');
            turnOnBtn.disabled = true; // Disable the ON button
            turnOffBtn.classList.remove('active');
            lightSwitch.classList.add('on-state'); // Add glow effect

            // Show UFO zones and populate with UFOs
            if(ufoZoneLeft && ufoZoneRight && ufoZoneTop && ufoZoneBottom) {
                ufoZoneLeft.classList.add('active');
                ufoZoneRight.classList.add('active');
                ufoZoneTop.classList.add('active');
                ufoZoneBottom.classList.add('active');

                // Position 3 UFOs in each zone
                positionUFOsInZone(ufoZoneLeft, 3);
                positionUFOsInZone(ufoZoneRight, 3);
                positionUFOsInZone(ufoZoneTop, 3);
                positionUFOsInZone(ufoZoneBottom, 3);
            }
        });

        turnOffBtn.addEventListener('click', function() {
            turnOffBtn.classList.add('active');
            turnOnBtn.classList.remove('active');
            turnOnBtn.disabled = false; // Re-enable the ON button
            lightSwitch.classList.remove('on-state'); // Remove glow effect

            // Hide UFO zones
            if(ufoZoneLeft && ufoZoneRight && ufoZoneTop && ufoZoneBottom) {
                ufoZoneLeft.classList.remove('active');
                ufoZoneRight.classList.remove('active');
                ufoZoneTop.classList.remove('active');
                ufoZoneBottom.classList.remove('active');

                // Clear all UFOs
                ufoZoneLeft.innerHTML = '';
                ufoZoneRight.innerHTML = '';
                ufoZoneTop.innerHTML = '';
                ufoZoneBottom.innerHTML = '';
            }
        });
    }

});

// Simple form submission for contact (just for demonstration)
// Note: Contact form element not present in this implementation

// Authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const userDisplay = document.getElementById('userDisplay');
    const loginTypeSelector = document.querySelectorAll('.login-type-btn');
    const loginTypeInput = document.getElementById('loginType');

    // Sample user and admin credentials (in a real app, this would come from a server)
    const users = {
        'user': { username: 'user', password: 'user123', name: 'John Doe', type: 'user' },
        'admin': { username: 'admin', password: 'admin123', name: 'Admin User', type: 'admin' }
    };

    // Open login modal
    loginBtn?.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    // Close login modal
    closeModal?.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside the box
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Switch between user and admin login
    loginTypeSelector.forEach(btn => {
        btn.addEventListener('click', () => {
            loginTypeSelector.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loginTypeInput.value = btn.dataset.type;
        });
    });

    // Handle login form submission
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = loginTypeInput.value;

        // Check if credentials match
        if (users[userType] && users[userType].username === username && users[userType].password === password) {
            // Successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(users[userType]));

            // Update UI
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            userDisplay.textContent = `${users[userType].name} (${users[userType].type})`;
            userDisplay.style.display = 'inline';

            // Close modal
            loginModal.style.display = 'none';

            // Reset form
            loginForm.reset();

            alert(`Welcome, ${users[userType].name}! You have successfully logged in as ${users[userType].type}.`);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Handle logout
    logoutBtn?.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            // Clear stored user data
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');

            // Update UI
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            userDisplay.style.display = 'none';

            alert('You have been logged out successfully.');
        }
    });

    // Check if user is already logged in on page load
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            userDisplay.textContent = `${currentUser.name} (${currentUser.type})`;
            userDisplay.style.display = 'inline';
        }
    }
});