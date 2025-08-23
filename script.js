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
function toggleTheme() {
  // Check if dark theme is currently active
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  
  // Toggle between themes
  if (isDark) {
    document.body.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
    // Save theme preference to localStorage
    localStorage.setItem('theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
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

// =============== QUIZ FUNCTIONALITY ===============
// Function to handle quiz answer selection
function handleQuizSelection(event) {
  // Get the clicked button
  const selectedOption = event.target;
  // Find the quiz result element
  const quizResult = selectedOption.closest('.quiz-card').querySelector('.quiz-result');
  
  // Check if the selected option is correct
  if (selectedOption.classList.contains('correct')) {
    quizResult.textContent = 'Correct! 🎉';
    quizResult.style.color = '#4caf50'; // Green color for correct answer
  } else {
    quizResult.textContent = 'Incorrect. Try again!';
    quizResult.style.color = '#f44336'; // Red color for incorrect answer
    
    // Highlight the correct answer
    quizOptions.forEach(option => {
      if (option.classList.contains('correct')) {
        option.style.backgroundColor = '#4caf50';
        option.style.color = 'white';
      }
    });
  }
  
  // Disable all quiz options after selection
  quizOptions.forEach(option => {
    option.style.pointerEvents = 'none';
  });
}

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
  
  // Quiz options
  quizOptions.forEach(option => {
    option.addEventListener('click', handleQuizSelection);
  });
  
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