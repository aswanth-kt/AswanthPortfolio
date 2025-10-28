// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      animateHeroLogo();
    }, 500);
  }, 1500);
});

// Animate hero logo after preloader
function animateHeroLogo() {
  const path1 = document.getElementById("heroPath1");
  const path2 = document.getElementById("heroPath2");

  if (path1 && path2) {
    path1.style.transition = "stroke-dashoffset 1.5s ease";
    path2.style.transition = "stroke-dashoffset 1s ease 0.5s";

    requestAnimationFrame(() => {
      path1.style.strokeDashoffset = "0";
      path2.style.strokeDashoffset = "0";
    });
  }
}

// Mobile navigation
const mobileToggle = document.getElementById("mobileToggle");
const nav = document.getElementById("nav");

mobileToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  mobileToggle.classList.toggle("active");
});

// Close mobile nav when clicking on links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    mobileToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerOffset = 80;
      const elementPosition = targetSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Scroll indicator click
const scrollIndicator = document.getElementById("scrollIndicator");
scrollIndicator.addEventListener("click", () => {
  document.querySelector("#skills").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// Hide scroll indicator after scrolling starts
let scrollTimer;
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }

  // Clear existing timer
  clearTimeout(scrollTimer);

  // Set timer to show indicator again after scrolling stops
  scrollTimer = setTimeout(() => {
    if (scrollY < 100) {
      scrollIndicator.style.opacity = "1";
    }
  }, 1000);
});

// Active navigation link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const observerOptions = {
  rootMargin: "-50% 0px -45% 0px",
  threshold: 0,
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.id;

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  navObserver.observe(section);
});

// Reveal animation on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe all elements with reveal class
document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Header background on scroll
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 12, 16, 0.95)";
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
  } else {
    header.style.background = "rgba(10, 12, 16, 0.9)";
    header.style.boxShadow = "none";
  }
});

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroCard = document.querySelector(".hero-card");

  if (heroCard && scrolled < window.innerHeight) {
    const rate = scrolled * 0.5;
    heroCard.style.transform = `translateY(${rate}px)`;
  }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect after preloader (optional)
setTimeout(() => {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
  }
}, 2000);

// Smooth reveal animation delays
const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 0.1}s`;
});

// Add mouse follower effect (optional)
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Performance optimization: Use requestAnimationFrame for smooth animations
function animate() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  requestAnimationFrame(animate);
}

// Start animation loop
animate();

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    nav.classList.remove("open");
    mobileToggle.classList.remove("active");
  }
});

// Performance: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll handling code here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
