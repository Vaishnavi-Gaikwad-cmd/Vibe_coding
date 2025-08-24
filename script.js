// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const exploreBtn = document.getElementById('exploreBtn');
const mainContent = document.getElementById('mainContent');
const hero = document.getElementById('hero');
const leaderboardBtn = document.getElementById('leaderboardBtn');
const spillitBtn = document.getElementById('spillitBtn');
const loginBtn = document.getElementById('loginBtn');
const leaderboardModal = document.getElementById('leaderboardModal');
const spillitModal = document.getElementById('spillitModal');
const loginModal = document.getElementById('loginModal');
const closeLeaderboard = document.getElementById('closeLeaderboard');
const closeSpillit = document.getElementById('closeSpillit');
const closeLogin = document.getElementById('closeLogin');
const confettiContainer = document.getElementById('confettiContainer');
const joinCommunityBtn = document.getElementById('joinCommunityBtn');

// Dark Mode Toggle
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode);
    
    const icon = darkModeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    // Add transition effect
    darkModeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        darkModeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

// Initialize dark mode
document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
const icon = darkModeToggle.querySelector('i');
icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';

// Explore Button Animation
function showMainContent() {
    hero.style.transform = 'translateY(-100vh)';
    hero.style.opacity = '0';
    
    setTimeout(() => {
        hero.style.display = 'none';
        mainContent.classList.add('active');
        mainContent.style.display = 'block';
    }, 500);
}

// Modal Functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Confetti Animation
function createConfetti(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Vote Button Functionality
function handleVote(button, isUpvote) {
    const voteCount = button.parentElement.querySelector('.vote-count');
    const currentVotes = parseInt(voteCount.textContent);
    
    // Remove existing vote classes
    button.classList.remove('upvoted', 'downvoted');
    
    if (isUpvote) {
        button.classList.add('upvoted');
        voteCount.textContent = currentVotes + 1;
        createConfetti(button.offsetLeft + button.offsetWidth / 2, button.offsetTop);
    } else {
        button.classList.add('downvoted');
        voteCount.textContent = currentVotes - 1;
    }
}

// Club Filter Functionality
function filterClubs(category) {
    const clubCards = document.querySelectorAll('.club-card');
    const filterChips = document.querySelectorAll('.filter-chip');
    
    // Update active filter chip
    filterChips.forEach(chip => chip.classList.remove('active'));
    event.target.classList.add('active');
    
    clubCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Discussion Tab Functionality
function switchTab(tabName) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const discussionPosts = document.querySelectorAll('.discussion-post');
    
    // Update active tab
    tabBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide posts based on category
    discussionPosts.forEach(post => {
        if (post.dataset.category === tabName) {
            post.style.display = 'flex';
            post.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            post.style.display = 'none';
        }
    });
}

// Join Button Functionality
function handleJoinClub(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Joined';
    button.style.background = 'var(--success-gradient)';
    button.style.transform = 'scale(1.1)';
    
    createConfetti(button.offsetLeft + button.offsetWidth / 2, button.offsetTop);
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // Reset after 3 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'var(--accent-gradient)';
    }, 3000);
}

// Add to Calendar Functionality
function addToCalendar(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = 'var(--success-gradient)';
    
    createConfetti(button.offsetLeft + button.offsetWidth / 2, button.offsetTop);
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'var(--success-gradient)';
    }, 2000);
}

// SpillIt Post Functionality
function handleSpillitPost() {
    const textarea = document.getElementById('spillitText');
    const text = textarea.value.trim();
    
    if (text.length < 10) {
        alert('Please write at least 10 characters!');
        return;
    }
    
    const spillitPosts = document.querySelector('.spillit-posts');
    const newPost = document.createElement('div');
    newPost.className = 'spillit-post';
    newPost.innerHTML = `
        <p>"${text}"</p>
        <div class="post-actions">
            <button class="like-btn" onclick="handleLike(this)">
                <i class="fas fa-heart"></i>
                <span>0</span>
            </button>
            <span class="post-time">Just now</span>
        </div>
    `;
    
    spillitPosts.insertBefore(newPost, spillitPosts.firstChild);
    textarea.value = '';
    
    // Add animation
    newPost.style.animation = 'fadeIn 0.5s ease-in';
    
    // Close modal after posting
    setTimeout(() => {
        closeModal(spillitModal);
    }, 1000);
}

// Like Button Functionality
function handleLike(button) {
    const likeCount = button.querySelector('span');
    const currentLikes = parseInt(likeCount.textContent);
    
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        likeCount.textContent = currentLikes - 1;
    } else {
        button.classList.add('liked');
        likeCount.textContent = currentLikes + 1;
        createConfetti(button.offsetLeft + button.offsetWidth / 2, button.offsetTop);
    }
}

// Calendar Navigation
function navigateCalendar(direction) {
    const calendarHeader = document.querySelector('.calendar-header h3');
    const currentMonth = calendarHeader.textContent;
    const [month, year] = currentMonth.split(' ');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let currentIndex = months.indexOf(month);
    let currentYear = parseInt(year);
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % 12;
        if (currentIndex === 0) currentYear++;
    } else {
        currentIndex = currentIndex === 0 ? 11 : currentIndex - 1;
        if (currentIndex === 11) currentYear--;
    }
    
    calendarHeader.textContent = `${months[currentIndex]} ${currentYear}`;
    
    // Add animation
    calendarHeader.style.animation = 'fadeIn 0.3s ease-in';
    setTimeout(() => {
        calendarHeader.style.animation = '';
    }, 300);
}

// Login Functionality
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Simulate login process
    const loginBtn = document.getElementById('loginSubmit');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        createConfetti(loginBtn.offsetLeft + loginBtn.offsetWidth / 2, loginBtn.offsetTop);
        
        setTimeout(() => {
            closeModal(loginModal);
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Update login button to show user is logged in
            const navLoginBtn = document.getElementById('loginBtn');
            navLoginBtn.innerHTML = '<i class="fas fa-user-check"></i><span>Welcome!</span>';
            navLoginBtn.style.background = 'var(--success-gradient)';
        }, 1500);
    }, 2000);
}

// Join Community Functionality
function handleJoinCommunity() {
    const originalText = joinCommunityBtn.innerHTML;
    joinCommunityBtn.innerHTML = '<i class="fas fa-heart"></i><span>Welcome to the Family!</span>';
    joinCommunityBtn.style.background = 'rgba(255, 255, 255, 0.4)';
    
    createConfetti(joinCommunityBtn.offsetLeft + joinCommunityBtn.offsetWidth / 2, joinCommunityBtn.offsetTop);
    
    setTimeout(() => {
        joinCommunityBtn.innerHTML = originalText;
        joinCommunityBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    }, 3000);
}

// Event Listeners
darkModeToggle.addEventListener('click', toggleDarkMode);
exploreBtn.addEventListener('click', showMainContent);
leaderboardBtn.addEventListener('click', () => openModal(leaderboardModal));
spillitBtn.addEventListener('click', () => openModal(spillitModal));
loginBtn.addEventListener('click', () => openModal(loginModal));
closeLeaderboard.addEventListener('click', () => closeModal(leaderboardModal));
closeSpillit.addEventListener('click', () => closeModal(spillitModal));
closeLogin.addEventListener('click', () => closeModal(loginModal));
joinCommunityBtn.addEventListener('click', handleJoinCommunity);

// Login form submission
document.getElementById('loginSubmit').addEventListener('click', handleLogin);

// Google login button
document.querySelector('.google-login-btn').addEventListener('click', () => {
    alert('Google login integration would be implemented here!');
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset functionality would be implemented here!');
});

// Show signup link
document.getElementById('showSignup').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sign up functionality would be implemented here!');
});

// Close modals when clicking outside
[leaderboardModal, spillitModal, loginModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Filter chips event listeners
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
        filterClubs(e.target.dataset.filter);
    });
});

// Tab buttons event listeners
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        switchTab(e.target.dataset.tab);
    });
});

// Join buttons event listeners
document.querySelectorAll('.join-btn').forEach(btn => {
    btn.addEventListener('click', () => handleJoinClub(btn));
});

// Add to calendar buttons event listeners
document.querySelectorAll('.add-calendar-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCalendar(btn));
});

// Vote buttons event listeners
document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const isUpvote = btn.classList.contains('upvote');
        handleVote(btn, isUpvote);
    });
});

// Calendar navigation event listeners
document.querySelectorAll('.calendar-nav').forEach(btn => {
    btn.addEventListener('click', () => {
        const direction = btn.classList.contains('next') ? 'next' : 'prev';
        navigateCalendar(direction);
    });
});

// SpillIt post button
document.getElementById('postSpillit').addEventListener('click', handleSpillitPost);

// Like buttons event listeners (for existing posts)
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => handleLike(btn));
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (leaderboardModal.classList.contains('active')) {
            closeModal(leaderboardModal);
        }
        if (spillitModal.classList.contains('active')) {
            closeModal(spillitModal);
        }
        if (loginModal.classList.contains('active')) {
            closeModal(loginModal);
        }
    }
    
    // Ctrl/Cmd + K for dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// Observe feature cards for animation
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Observe community highlight for animation
const communityHighlight = document.querySelector('.community-highlight');
if (communityHighlight) {
    observer.observe(communityHighlight);
}

// Initialize tooltips and other UI enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add hover effects to floating cards
    document.querySelectorAll('.floating-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1) rotate(45deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Handle scroll-based animations here
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 10);
});

// Add some fun easter eggs
let clickCount = 0;
document.querySelector('.hero-title').addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        createConfetti(window.innerWidth / 2, window.innerHeight / 2);
        clickCount = 0;
    }
});

// Export functions for potential external use
window.CampusConnect = {
    toggleDarkMode,
    showMainContent,
    openModal,
    closeModal,
    createConfetti,
    handleVote,
    filterClubs,
    switchTab,
    handleJoinClub,
    addToCalendar,
    handleSpillitPost,
    handleLike,
    handleLogin,
    handleJoinCommunity
};
