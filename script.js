// script.js
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
          el.style.opacity = 1;
        });
        document.querySelectorAll('.slide-up').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        });
        document.querySelectorAll('.scale-in').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'scale(1)';
        });
        document.querySelectorAll('.zoom-in').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'scale(1) rotate(0deg)';
        });
        document.querySelectorAll('.bounce-in').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'scale(1)';
        });
        document.querySelectorAll('.flip-in').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'perspective(400px) rotateY(0deg)';
        });
        document.querySelectorAll('.slide-in-left').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'translateX(0)';
        });
      }, 500);
    });
    function toggleMenu() {
      const mobileNav = document.getElementById('mobileNav');
      mobileNav.classList.toggle('active');
    }
    function showPopup(descriptionContent) {
      const popup = document.getElementById('descriptionPopup');
      const popupDescription = document.getElementById('popupDescription');
      popupDescription.innerHTML = descriptionContent;
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closePopup() {
      const popup = document.getElementById('descriptionPopup');
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    function showResumePopup() {
      const resumePopup = document.getElementById('resumePopup');
      resumePopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeResumePopup() {
      const resumePopup = document.getElementById('resumePopup');
      const resumeImage = document.getElementById('resumeImage');
      resumePopup.style.display = 'none';
      resumeImage.classList.remove('zoomed');
      document.body.style.overflow = 'auto';
    }
    document.getElementById('resumeImage').addEventListener('click', function () {
      this.classList.toggle('zoomed');
    });
    function openProject(url) {
      window.open(url, '_blank');
    }
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));
    document.addEventListener('DOMContentLoaded', () => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        sectionObserver.observe(card);
        card.addEventListener('mouseenter', () => {
          card.style.transition = 'all 0.3s ease, transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transition = 'all 0.3s ease';
        });
      });
    });
   // Scroll Reveal
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 80;
        if (elementTop < windowHeight - revealPoint) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

   const form = document.getElementById('contact-form');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let isValid = true;
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            if (name.value.trim() === '') {
                name.parentElement.classList.add('error');
                isValid = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.parentElement.classList.add('error');
                isValid = false;
            }
            if (!subject.value) {
                subject.parentElement.classList.add('error');
                isValid = false;
            }
            if (message.value.trim() === '') {
                message.parentElement.classList.add('error');
                isValid = false;
            }

            if (!isValid) return;

            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('email', email.value);
            formData.append('subject', subject.value);
            formData.append('message', message.value);

            try {
                const response = await fetch('https://formspree.io/f/xvgqzalg', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    document.querySelector('.success-message').classList.add('active');
                    form.reset();
                    setTimeout(() => {
                        document.querySelector('.success-message').classList.remove('active');
                    }, 5000);
                } else {
                    alert("Something went wrong, please try again later.");
                }
            } catch (error) {
                alert("Failed to send message.");
                console.error(error);
            }
        });
    function startTypingAnimation() {
      const typingText = document.querySelector('.typing-text');
      const words = [' Ravi', ' Student', ' Freelancer'];
      let wordIndex = 0;
      let charIndex = 0;
      let currentWord = '';
      let isDeleting = false;
      let isPaused = false;
      function type() {
        if (isPaused) return;
        if (wordIndex >= words.length) {
          wordIndex = 0;
        }
        currentWord = words[wordIndex];
        if (!isDeleting) {
          typingText.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
          if (charIndex === currentWord.length) {
            isDeleting = true;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
              type();
            }, 2000);
            return;
          }
        } else {
          typingText.textContent = currentWord.substring(0, charIndex);
          charIndex--;
          if (charIndex < 0) {
            isDeleting = false;
            wordIndex++;
            setTimeout(type, 500);
            return;
          }
        }
        setTimeout(type, isDeleting ? 100 : 150);
      }
      type();
    }
    window.addEventListener('load', () => {
      startTypingAnimation();
    });
            document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if (entry.target.classList.contains('stat-number')) {
                            const target = parseInt(entry.target.getAttribute('data-target'));
                            const increment = target / 100;
                            let current = 0;
                            const timer = setInterval(() => {
                                current += increment;
                                entry.target.textContent = Math.floor(current);
                                if (current >= target) {
                                    entry.target.textContent = target;
                                    clearInterval(timer);
                                    observer.unobserve(entry.target);
                                }
                            }, 20);
                        }
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in, .stat-number').forEach(el => observer.observe(el));
        });
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('scrolled', window.scrollY > 0);
        });

        // Scroll reveal animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');

            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const revealTop = reveals[i].getBoundingClientRect().top;
                const revealPoint = 150;

                if (revealTop < windowHeight - revealPoint) {
                    reveals[i].classList.add('active');
                } else {
                    reveals[i].classList.remove('active');
                }
            }
        }
// Initialize skills section animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // IntersectionObserver for skill cards and progress bars
    const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle skill card fade-in
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('visible');
                }
                // Handle progress bar animation
                if (entry.target.classList.contains('progress-bar')) {
                    const width = entry.target.getAttribute('data-width') || '0%';
                    entry.target.style.width = width;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation delays to skill cards and observe them
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        if (bar.getAttribute('data-width')) {
            observer.observe(bar);
        }
    });
});

        window.addEventListener('scroll', reveal);
        reveal(); // Initialize
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
                const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.experience-card').forEach(card => {
            observer.observe(card);
        });

        // Create minimal particles
        function createParticles() {
            const container = document.querySelector('.experience-section');
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(99,102,241,0.3);
                    width: ${Math.random() * 6 + 2}px;
                    height: ${Math.random() * 6 + 2}px;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: ${Math.random() * 0.3 + 0.1};
                    animation: float ${Math.random() * 8 + 8}s linear infinite;
                `;
                container.appendChild(particle);
            }
        }

        createParticles();