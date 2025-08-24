// script.js - JavaScript for Parba Nepal website

// =============== DOM ELEMENTS =============== 
// Get references to important elements in the HTML document
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const quizOptions = document.querySelectorAll('.quiz-option');
const registrationForm = document.querySelector('.registration-form');


// =============== THEME TOGGLE FUNCTIONALITY ===============
// Function to toggle between light and dark themes
themeToggleBtn.addEventListener('click', toggleTheme);
function toggleTheme() {
  // Check if dark theme is currently active
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  
  // Toggle between themes
  if (isDark) {
    document.body.setAttribute('data-theme', 'light');
    console.log("is light");
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
    // Save theme preference to localStorage
    localStorage.setItem('theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    console.log("is dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    // Save theme preference to localStorage
    localStorage.setItem('theme', 'dark');
  }
}

// =============== MOBILE MENU FUNCTIONALITY ===============
// Function to open the mobile menu
function openMobileMenu() {
  mobileMenu.classList.add('active');
  // Prevent body from scrolling when menu is open
  document.body.style.overflow = 'hidden';
}

// Function to close the mobile menu
function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  // Re-enable body scrolling
  document.body.style.overflow = 'auto';
}



document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');
    
    if (video) {
        // Slow down the video for cinematic effect (60% of normal speed)
        video.playbackRate = 0.5;
        
        // Set video properties for seamless cinematic experience
        video.muted = true;
        video.loop = true;
        
        // Start playing the video
        video.play().catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    }
});



// =============== QUIZ FUNCTIONALITY ===============

document.addEventListener("DOMContentLoaded", () => {
  const quizCards = document.querySelectorAll(".quiz-card");

  quizCards.forEach(card => {
    const options = card.querySelectorAll(".quiz-option");
    const result = card.querySelector(".quiz-result");

    options.forEach(option => {
      option.addEventListener("click", () => {
        // Stop if already answered
        if (card.classList.contains("answered")) return;

        // Correct option
        if (option.classList.contains("correct")) {
          result.textContent = "✅ Correct!";
          result.style.color = "#4caf50";

          option.classList.add("correct-answer");

          // Lock card
          card.classList.add("answered");
          options.forEach(btn => btn.disabled = true);

        } else {
          // Wrong option
          result.textContent = "❌ Incorrect. Try again!";
          result.style.color = "#f44336";

          option.classList.add("wrong-answer");

          // Reset wrong styling after delay
          setTimeout(() => {
            option.classList.remove("wrong-answer");
            result.textContent = "";
          }, 1500);
        }
      });
    });
  });
});

// this a faq section
document.addEventListener("DOMContentLoaded", () => {
  // 1. Select all FAQ items (each question + answer box)
  const faqItems = document.querySelectorAll(".faq-item");

  // 2. Loop through each FAQ item
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question"); // The clickable part
    const answer = item.querySelector(".faq-answer");     // The hidden answer
    const toggle = item.querySelector(".faq-toggle");     // The + or − sign

    // 3. Add a click event on the question
    question.addEventListener("click", () => {
      // Check if the clicked FAQ is already open
      const isOpen = item.classList.contains("active");

      // 🔽 IMPORTANT BLOCK: Close all items first 🔽
      faqItems.forEach(i => {
        i.classList.remove("active");                        // remove "active" (closes it visually)
        i.querySelector(".faq-answer").style.maxHeight = null; // collapse the answer (height = 0)
        i.querySelector(".faq-toggle").textContent = "+";      // reset symbol back to +
      });

      // 4. If the clicked FAQ was not open, open it now
      if (!isOpen) {
        item.classList.add("active");                        // mark this FAQ as active
        answer.style.maxHeight = answer.scrollHeight + "px"; // expand answer to full height
        toggle.textContent = "−";                            // change + to −
      }
    });
  });
});




// =============== FORM HANDLING ===============
// Function to handle form submission
function handleFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Show a success message (in a real application, you would send data to a server)
  alert('Thank you for registering! We will contact you soon.');
  // Reset the form fields
  event.target.reset();
}

// =============== SMOOTH SCROLLING ===============
// Function to enable smooth scrolling for navigation links
function initSmoothScrolling() {
  // Get all navigation links that point to sections on the same page
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  // Add click event to each navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent default anchor behavior
      e.preventDefault();
      
      // Get the target section from the href attribute
      const targetId = this.getAttribute('href');
      // Skip if it's just a "#" link
      if (targetId === '#') return;
      
      // Find the target section element
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Scroll to the target section smoothly
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if it's open
        closeMobileMenu();
      }
    });
  });
}

// =============== INITIALIZE APPLICATION ===============
// Function to initialize the application when the DOM is fully loaded
function initApp() {
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && osPrefersDark)) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // =============== EVENT LISTENERS ===============
  // Add event listeners to interactive elements
  
  // Theme toggle button
  themeToggleBtn.addEventListener('click', toggleTheme);
  
  // Mobile menu buttons
  mobileMenuBtn.addEventListener('click', openMobileMenu);
  closeMenuBtn.addEventListener('click', closeMobileMenu);
  
  // // Quiz options
  // quizOptions.forEach(option => {
  //   option.addEventListener('click', handleQuizSelection);
  // });
  
  // Registration form
  if (registrationForm) {
    registrationForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        e.target !== mobileMenuBtn) {
      closeMobileMenu();
    }
  });
}






// =============== START THE APPLICATION ===============
// Initialize the app when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initApp);



// Typing effect functionality
function initTypingEffect() {
    // List of words to cycle through
    const words = ["festivals", "culture", "traditions", "events"];
    
    // Get the HTML element where text will be typed
    const typingElement = document.getElementById('typing-element');
    const cursor = document.querySelector('.cursor');
    
    // Return if elements don't exist
    if (!typingElement || !cursor) return;
    
    // Settings for the typing effect
    const typeSpeed = 100;    // milliseconds per character when typing
    const eraseSpeed = 80;    // milliseconds per character when erasing
    const pauseTime = 1500;   // milliseconds to pause between words
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;
    
    function type() {
        // Clear any existing timeout
        clearTimeout(typingTimeout);
        
        // Get the current word
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine timing for next step
        let typeDelay = isDeleting ? eraseSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typeDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500;
        }
        
        // Call function again after delay
        typingTimeout = setTimeout(type, typeDelay);
    }
    
    // Start the typing effect
    type();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypingEffect);

// Reinitialize if theme changes (to handle any potential style recalculation)
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'data-theme') {
            // Small delay to ensure theme transition completes
            setTimeout(initTypingEffect, 100);
        }
    });
});

// Observe the html element for theme changes
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});