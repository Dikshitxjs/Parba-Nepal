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

      // Tab functionality
        document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Show corresponding content
                    const tabId = button.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        });




        // Select all flip cards
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    const inner = card.querySelector('.flip-card-inner');

    // For desktop: flip on hover
    card.addEventListener('mouseenter', () => {
        inner.classList.add('flipped');
    });
    card.addEventListener('mouseleave', () => {
        inner.classList.remove('flipped');
    });

    // For mobile: flip on click
    card.addEventListener('click', () => {
        inner.classList.toggle('flipped');
    });
});


document.querySelectorAll('.countdown').forEach(cd => {
  const targetDate = new Date(cd.dataset.date);

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      cd.innerHTML = `<span>Event Started!</span>`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    cd.innerHTML = `
      <div><span>${days}</span><small>Days</small></div>
      <div><span>${hours}</span><small>Hrs</small></div>
      <div><span>${minutes}</span><small>Min</small></div>
      <div><span>${seconds}</span><small>Sec</small></div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// =============== QUIZ FUNCTIONALITY ===============
document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    { question: "Which festival is called the festival of lights?", options: ["Dashain", "Tihar"], correct: 1 },
    { question: "Which festival celebrates victory of good over evil and includes swinging on large swings called 'ping'?", options: ["Dashain", "Holi"], correct: 0 },
    { question: "Which festival is famous for throwing colors and celebrating spring?", options: ["Holi", "Indra Jatra"], correct: 0 },
    { question: "Which festival is celebrated by Nepali women fasting for their husband’s long life?", options: ["Teej", "Dashain"], correct: 0 }
  ];

  const questionEl = document.querySelector(".quiz-question");
  const optionsEl = document.querySelector(".quiz-options");
  const resultEl = document.querySelector(".quiz-result");
  const nextBtn = document.querySelector(".next-btn");
  const progress = document.querySelector(".progress");

  let currentIndex = 0;

  function showQuestion(index) {
    const q = quizData[index];
    questionEl.innerHTML = `🎉 ${q.question}`;
    optionsEl.innerHTML = "";
    resultEl.textContent = "";
    nextBtn.style.display = "none";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "quiz-option";
      btn.addEventListener("click", () => handleAnswer(i, btn));
      optionsEl.appendChild(btn);
    });

    progress.style.width = `${(index / quizData.length) * 100}%`;
  }

  function handleAnswer(selectedIndex, btn) {
    const correctIndex = quizData[currentIndex].correct;

    if (selectedIndex === correctIndex) {
      btn.classList.add("correct-answer");
      resultEl.textContent = "✅ Correct!";
      optionsEl.querySelectorAll("button").forEach(b => b.disabled = true);
      nextBtn.style.display = "inline-block";
      resultEl.classList.add("celebrate"); // simple celebration animation
      setTimeout(() => resultEl.classList.remove("celebrate"), 1000);
    } else {
      btn.classList.add("wrong-answer");
      resultEl.textContent = "❌ Incorrect! Try again.";
      btn.disabled = true;
    }
  }

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < quizData.length) {
      showQuestion(currentIndex);
    } else {
      document.querySelector(".quiz-card").innerHTML = `
        <p style="font-weight:800; font-size:1.4rem; color:var(--primary-color)">
        🎊 Congratulations! You've completed the quiz! 🎊
        </p>`;
      progress.style.width = "100%";
    }
  });

  showQuestion(currentIndex);
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