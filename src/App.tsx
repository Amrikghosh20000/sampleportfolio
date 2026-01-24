import { useState, useEffect, useRef } from 'react'
import './App.css'
import video1 from './assets/VID-20250916-WA0003(1).mp4'
import video2 from './assets/VID-20251113-WA0028.mp4'
import video3 from './assets/VN20251014_093947.mp4'
import graphic1 from './assets/1000322791.jpg'
import graphic2 from './assets/1000325889 (2).jpg'
import graphic3 from './assets/1000383228 (1).jpg'
import graphic4 from './assets/IMG-20250730-WA0001.jpg'
import graphic5 from './assets/SAVE_20250518_194848.jpg'
import graphic6 from './assets/SAVE_20250518_194852.jpg'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const productRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        const videoItem = video.closest('.video-item')
        const macFrame = video.closest('.mac-frame')
        const videoHeader = video.closest('.video-item')?.querySelector('.video-project-header')
        
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Auto-play was prevented, user interaction required
          })
          video.classList.add('video-visible')
          if (videoItem) {
            videoItem.classList.add('video-visible')
          }
          if (macFrame) {
            macFrame.classList.add('mac-visible')
          }
          if (videoHeader) {
            videoHeader.classList.add('header-visible')
          }
        } else {
          video.pause()
          video.classList.remove('video-visible')
          if (videoItem) {
            videoItem.classList.remove('video-visible')
          }
          if (macFrame) {
            macFrame.classList.remove('mac-visible')
          }
          if (videoHeader) {
            videoHeader.classList.remove('header-visible')
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video)
      }
    })

    // Parallax scroll effect
    const handleScroll = () => {
      const macFrames = document.querySelectorAll('.mac-frame')
      macFrames.forEach((frame) => {
        const rect = frame.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementCenter = elementTop + rect.height / 2
        const scrollProgress = (windowHeight - elementCenter) / windowHeight
        
        if (scrollProgress > -0.5 && scrollProgress < 1.5) {
          const parallaxY = scrollProgress * 30
          const parallaxRotate = scrollProgress * 2
          ;(frame as HTMLElement).style.transform = `translateY(${parallaxY}px) rotateX(${parallaxRotate}deg) scale(1)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Product reveal observer
    const productObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    }

    const productObserverCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const product = entry.target as HTMLElement
        if (entry.isIntersecting) {
          product.classList.add('product-visible')
        }
      })
    }

    const productObserver = new IntersectionObserver(productObserverCallback, productObserverOptions)

    productRefs.current.forEach((product) => {
      if (product) {
        productObserver.observe(product)
      }
    })

    // Animation elements observer
    animationRefs.current.forEach((element) => {
      if (element) {
        productObserver.observe(element)
      }
    })

    // Number counting animation for progress section
    const numberCountObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressNumbers = entry.target.querySelectorAll('.progress-number')
          progressNumbers.forEach((number) => {
            const target = parseInt((number as HTMLElement).dataset.target || '0')
            let current = 0
            const increment = target / 100
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              ;(number as HTMLElement).textContent = Math.floor(current).toString() + (target === 98 ? '%' : target === 24 ? '/7' : '+')
            }, 20)
          })
        }
      })
    }, { threshold: 0.5 })

    const progressContainer = document.querySelector('.scroll-progress-container')
    if (progressContainer) {
      numberCountObserver.observe(progressContainer)
    }

    // Skills animation observer
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-progress')
          skillBars.forEach((bar) => {
            const width = (bar as HTMLElement).dataset.width || '0'
            setTimeout(() => {
              ;(bar as HTMLElement).style.width = width + '%'
            }, 100)
          })
        }
      })
    }, { threshold: 0.3 })

    const skillsSection = document.querySelector('.expertise')
    if (skillsSection) {
      skillsObserver.observe(skillsSection)
    }

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video)
        }
      })
      productRefs.current.forEach((product) => {
        if (product) {
          productObserver.unobserve(product)
        }
      })
      animationRefs.current.forEach((element) => {
        if (element) {
          productObserver.unobserve(element)
        }
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">MB</div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#videos" onClick={() => setMobileMenuOpen(false)}>Videos</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a></li>
            <li><a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-name">Moupriya Biswas</h1>
            <p className="hero-tagline">Crafting Digital Experiences with Passion & Precision</p>
            <p className="hero-description">
              Welcome to my creative space where innovation meets design
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">
              <div className="gradient-orb orb-1"></div>
              <div className="gradient-orb orb-2"></div>
              <div className="gradient-orb orb-3"></div>
              <div className="hero-pattern"></div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
      </div>
      </section>

      {/* Video Section - Apple Style */}
      <section id="videos" className="videos-section">
        <div className="container">
          <h2 className="section-title">Video Editing Portfolio</h2>
          <p className="section-subtitle">Crafted with precision, brought to life through motion</p>
          
          <div className="videos-container">
            <div className="video-item">
              <div className="video-project-header">
                <div className="video-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>Video Editing</span>
                </div>
                <h3 className="video-project-title">Creative Project #1</h3>
                <p className="video-project-description">Professional video editing with seamless transitions and dynamic effects</p>
              </div>
              <div className="mac-frame">
                <div className="mac-screen">
                  <div className="mac-screen-inner">
                    <video
                      ref={(el) => { if (el) videoRefs.current[0] = el }}
                      className="video-player"
                      playsInline
                      muted
                      loop
                      preload="metadata"
                      onLoadStart={() => console.log('Video 1 loading started')}
                      onCanPlay={() => console.log('Video 1 can play')}
                      onError={(e) => console.error('Video 1 error:', e)}
                    >
                      <source src={video1} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-editing-overlay">
                      <div className="editing-indicator">
                        <span className="pulse-dot"></span>
                        <span>Edited</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mac-base"></div>
                <div className="mac-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="video-item">
              <div className="video-project-header">
                <div className="video-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>Video Editing</span>
                </div>
                <h3 className="video-project-title">Creative Project #2</h3>
                <p className="video-project-description">Cinematic storytelling with color grading and motion graphics</p>
              </div>
              <div className="mac-frame">
                <div className="mac-screen">
                  <div className="mac-screen-inner">
                    <video
                      ref={(el) => { if (el) videoRefs.current[1] = el }}
                      className="video-player"
                      playsInline
                      muted
                      loop
                      preload="metadata"
                      onLoadStart={() => console.log('Video 2 loading started')}
                      onCanPlay={() => console.log('Video 2 can play')}
                      onError={(e) => console.error('Video 2 error:', e)}
                    >
                      <source src={video2} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-editing-overlay">
                      <div className="editing-indicator">
                        <span className="pulse-dot"></span>
                        <span>Edited</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mac-base"></div>
                <div className="mac-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="video-item">
              <div className="video-project-header">
                <div className="video-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>Video Editing</span>
                </div>
                <h3 className="video-project-title">Creative Project #3</h3>
                <p className="video-project-description">Professional post-production with advanced editing techniques</p>
              </div>
              <div className="mac-frame">
                <div className="mac-screen">
                  <div className="mac-screen-inner">
                    <video
                      ref={(el) => { if (el) videoRefs.current[2] = el }}
                      className="video-player"
                      playsInline
                      muted
                      loop
                      preload="metadata"
                      onLoadStart={() => console.log('Video 3 loading started')}
                      onCanPlay={() => console.log('Video 3 can play')}
                      onError={(e) => console.error('Video 3 error:', e)}
                    >
                      <source src={video3} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-editing-overlay">
                      <div className="editing-indicator">
                        <span className="pulse-dot"></span>
                        <span>Edited</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mac-base"></div>
                <div className="mac-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm Moupriya Biswas, a creative professional passionate about bringing ideas to life
                through innovative design and technology. With a keen eye for detail and a love for
                creating meaningful experiences, I strive to make every project unique and impactful.
              </p>
              <p>
                My journey is fueled by curiosity, continuous learning, and the desire to push
                boundaries in the digital realm. Whether it's design, development, or creative
                storytelling, I approach each challenge with enthusiasm and dedication.
        </p>
      </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Dedication</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Apple Style Product Reveals */}
      <section id="portfolio" className="portfolio">
        {/* Headphone Section - Apple Style */}
        <div ref={(el) => { if (el) productRefs.current[0] = el }} className="product-reveal product-headphones">
          <div className="container">
            <div className="product-header">
              <h2 className="product-title">Graphics Design</h2>
              <p className="product-subtitle">Visual storytelling through creative design</p>
            </div>
            
            <div className="headphone-showcase">
              <div className="headphone-container">
                <div className="headphone-left">
                  <div className="headphone-image-wrapper">
                    <img 
                      src={graphic1} 
                      alt="Graphics Design Project 1" 
                      className="headphone-screen"
                      onLoad={() => console.log('Image 1 loaded')}
                      onError={(e) => console.error('Image 1 error:', e)}
                    />
                  </div>
                </div>
                <div className="headphone-case">
                  <div className="headphone-case-inner">
                    <div className="headphone-case-screen">
                      <img 
                        src={graphic2} 
                        alt="Graphics Design Project 2" 
                        className="case-image"
                        onLoad={() => console.log('Image 2 loaded')}
                        onError={(e) => console.error('Image 2 error:', e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="headphone-right">
                  <div className="headphone-image-wrapper">
                    <img 
                      src={graphic3} 
                      alt="Graphics Design Project 3" 
                      className="headphone-screen"
                      onLoad={() => console.log('Image 3 loaded')}
                      onError={(e) => console.error('Image 3 error:', e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Section - Apple Style */}
        <div ref={(el) => { if (el) productRefs.current[1] = el }} className="product-reveal product-laptop">
          <div className="container">
            <div className="product-header">
              <h2 className="product-title">Creative Portfolio</h2>
              <p className="product-subtitle">Showcasing innovative design solutions</p>
            </div>
            
            <div className="laptop-showcase">
              <div className="laptop-container">
                <div className="laptop-screen">
                  <div className="laptop-screen-inner">
                    <img 
                      src={graphic4} 
                      alt="Graphics Design Project 4" 
                      className="laptop-content"
                      onLoad={() => console.log('Image 4 loaded')}
                      onError={(e) => console.error('Image 4 error:', e)}
                    />
                  </div>
                </div>
                <div className="laptop-base"></div>
                <div className="laptop-keyboard"></div>
                <div className="laptop-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Additional Graphics Grid */}
            <div className="portfolio-grid-mini">
              <div className="portfolio-mini-item">
                <img 
                  src={graphic5} 
                  alt="Graphics Design Project 5"
                  onLoad={() => console.log('Image 5 loaded')}
                  onError={(e) => console.error('Image 5 error:', e)}
                />
              </div>
              <div className="portfolio-mini-item">
                <img 
                  src={graphic6} 
                  alt="Graphics Design Project 6"
                  onLoad={() => console.log('Image 6 loaded')}
                  onError={(e) => console.error('Image 6 error:', e)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="gallery" className="expertise">
        <div className="container">
          <h2 className="section-title">Expertise & Skills</h2>
          <p className="section-subtitle">Mastering the art of digital creativity</p>
          
          {/* Skills Grid */}
          <div className="skills-showcase">
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon design-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9l-5.91 5.74L17.18 22 12 19.27 6.82 22l1.09-7.26L2 9l6.91-1.74L12 2z"/>
                  </svg>
                </div>
                <h3>Design Excellence</h3>
              </div>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Graphic Design</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="95"></div>
                  </div>
                  <span className="skill-percent">95%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">UI/UX Design</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="88"></div>
                  </div>
                  <span className="skill-percent">88%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Brand Identity</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="92"></div>
                  </div>
                  <span className="skill-percent">92%</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon video-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <h3>Video Production</h3>
              </div>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Video Editing</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90"></div>
                  </div>
                  <span className="skill-percent">90%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Motion Graphics</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Color Grading</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="87"></div>
                  </div>
                  <span className="skill-percent">87%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="tools-section">
            <h3 className="tools-title">Tools & Technologies</h3>
            <div className="tools-grid">
              <div className="tool-card adobe-card">
                <div className="tool-icon">
                  <div className="adobe-logo">Ps</div>
                </div>
                <h4>Adobe Photoshop</h4>
                <p>Advanced photo editing & design</p>
              </div>
              
              <div className="tool-card adobe-card">
                <div className="tool-icon">
                  <div className="adobe-logo">Ai</div>
                </div>
                <h4>Adobe Illustrator</h4>
                <p>Vector graphics & illustrations</p>
              </div>
              
              <div className="tool-card adobe-card">
                <div className="tool-icon">
                  <div className="adobe-logo">Pr</div>
                </div>
                <h4>Adobe Premiere</h4>
                <p>Professional video editing</p>
              </div>
              
              <div className="tool-card adobe-card">
                <div className="tool-icon">
                  <div className="adobe-logo">Ae</div>
                </div>
                <h4>After Effects</h4>
                <p>Motion graphics & VFX</p>
              </div>
              
              <div className="tool-card figma-card">
                <div className="tool-icon">
                  <div className="figma-logo">Fi</div>
                </div>
                <h4>Figma</h4>
                <p>UI/UX design & prototyping</p>
              </div>
              
              <div className="tool-card sketch-card">
                <div className="tool-icon">
                  <div className="sketch-logo">Sk</div>
                </div>
                <h4>Sketch</h4>
                <p>Interface design</p>
              </div>
            </div>
          </div>

          {/* Awards/Achievements */}
          <div className="achievements-section">
            <h3 className="achievements-title">Recognition & Achievements</h3>
            <div className="achievements-grid">
              <div className="achievement-item">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-content">
                  <h4>Best Design Award 2023</h4>
                  <p>Creative Excellence in Visual Design</p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">⭐</div>
                <div className="achievement-content">
                  <h4>Top Rated Professional</h4>
                  <p>5-Star Rating from 50+ Clients</p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">🎯</div>
                <div className="achievement-content">
                  <h4>100% Project Success</h4>
                  <p>On-time delivery & satisfaction</p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">📈</div>
                <div className="achievement-content">
                  <h4>200+ Projects Completed</h4>
                  <p>Across multiple industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-Style Animation Section */}
      <section className="apple-animation-section">
        {/* Floating Text Animation */}
        <div ref={(el) => { if (el) animationRefs.current[0] = el }} className="floating-text-container">
          <div className="container">
            <div className="floating-text-content">
              <h2 className="floating-title">Innovation</h2>
              <p className="floating-subtitle">Crafted with precision. Designed with passion.</p>
            </div>
          </div>
        </div>

        {/* Parallax Cards */}
        <div ref={(el) => { if (el) animationRefs.current[1] = el }} className="parallax-cards-container">
          <div className="container">
            <div className="parallax-cards">
              <div className="parallax-card card-1">
                <div className="card-content">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <h3>Design Excellence</h3>
                  <p>Every pixel matters in creating extraordinary experiences</p>
                </div>
              </div>

              <div className="parallax-card card-2">
                <div className="card-content">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6"/>
                      <path d="M1 12h6m6 0h6"/>
                    </svg>
                  </div>
                  <h3>Creative Vision</h3>
                  <p>Transforming ideas into visual masterpieces</p>
                </div>
              </div>

              <div className="parallax-card card-3">
                <div className="card-content">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <h3>Performance</h3>
                  <p>Speed and efficiency in every interaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Morphing Shapes */}
        <div ref={(el) => { if (el) animationRefs.current[2] = el }} className="morphing-shapes-container">
          <div className="container">
            <div className="morphing-content">
              <div className="shapes-wrapper">
                <div className="morphing-shape shape-1"></div>
                <div className="morphing-shape shape-2"></div>
                <div className="morphing-shape shape-3"></div>
              </div>
              <div className="morphing-text">
                <h2>Boundless Creativity</h2>
                <p>Where imagination meets implementation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress */}
        <div ref={(el) => { if (el) animationRefs.current[3] = el }} className="scroll-progress-container">
          <div className="container">
            <div className="progress-content">
              <div className="progress-numbers">
                <div className="progress-item">
                  <span className="progress-number" data-target="98">0</span>
                  <span className="progress-label">Satisfaction</span>
                </div>
                <div className="progress-item">
                  <span className="progress-number" data-target="150">0</span>
                  <span className="progress-label">Projects</span>
                </div>
                <div className="progress-item">
                  <span className="progress-number" data-target="24">0</span>
                  <span className="progress-label">Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's collaborate and create something amazing together</p>
          <div className="contact-content-centered">
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (This is a demo)'); }}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Moupriya Biswas. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
