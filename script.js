// 포미서비스 AI SNS 마케팅 서비스 랜딩 페이지 JavaScript

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 요소들 선택
    const ctaButtons = document.querySelectorAll('.cta-button');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .pricing-card, .testimonial-card, .process-step');
    
    // 스크롤 진행률 표시기 생성
    createScrollIndicator();
    
    // 인터섹션 옵저버 초기화
    initializeIntersectionObserver();
    
    // 부드러운 스크롤 애니메이션
    initializeSmoothScroll();
    
    // CTA 버튼 이벤트 리스너
    initializeCTAButtons();
    
    // 스크롤 이벤트 최적화
    initializeScrollEvents();
    
    // 폼 유효성 검사 (향후 확장용)
    initializeFormValidation();
    
    // 모바일 터치 이벤트
    initializeMobileEvents();
});

// 스크롤 진행률 표시기 생성
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollIndicator);
    
    // 스크롤 진행률 업데이트
    window.addEventListener('scroll', throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    }, 10));
}

// 인터섹션 옵저버 초기화
function initializeIntersectionObserver() {
    // 섹션 애니메이션을 위한 옵저버
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    // 카드 애니메이션을 위한 옵저버
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // 순차적 애니메이션
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-20px'
    });
    
    // 섹션들에 초기 스타일 적용 및 관찰 시작
    document.querySelectorAll('section').forEach(section => {
        section.style.cssText = `
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        sectionObserver.observe(section);
    });
    
    // 애니메이션 요소들에 초기 스타일 적용 및 관찰 시작
    document.querySelectorAll('.service-card, .feature-card, .pricing-card, .testimonial-card, .process-step').forEach(element => {
        element.style.cssText = `
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        cardObserver.observe(element);
    });
}

// 부드러운 스크롤 초기화
function initializeSmoothScroll() {
    // 앵커 링크 클릭 시 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// CTA 버튼 초기화
function initializeCTAButtons() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 버튼 클릭 애니메이션
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 상담 신청 모달 또는 이메일 클라이언트 열기
            handleCTAClick();
        });
        
        // 호버 효과 강화
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 48px rgba(242, 72, 34, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 32px rgba(242, 72, 34, 0.3)';
        });
    });
}

// CTA 클릭 처리
function handleCTAClick() {
    // 간단한 팝업 알림 표시
    showNotification('contact@formeai.org 이메일로 상담 신청해주세요', 'info');
}

// 스크롤 이벤트 최적화
function initializeScrollEvents() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 패럴랙스 효과 (성능 고려하여 제한적 적용)
        if (window.innerWidth > 1024) {
            const heroSection = document.getElementById('hero');
            if (heroSection && scrollTop < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`;
            }
        }
        
        lastScrollTop = scrollTop;
    }, 16)); // 60fps로 제한
}

// 폼 유효성 검사 초기화 (향후 확장용)
function initializeFormValidation() {
    // 향후 연락처 폼이 추가될 경우를 위한 기본 구조
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('모든 필수 항목을 올바르게 입력해주세요.', 'error');
            }
        });
    });
}

// 폼 유효성 검사 함수
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
        
        // 이메일 유효성 검사
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('border-red-500');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// 모바일 터치 이벤트 초기화
function initializeMobileEvents() {
    // 터치 디바이스 감지
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // 모바일에서 호버 효과를 터치로 변경
        document.querySelectorAll('.service-card, .feature-card, .testimonial-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
        
        // 모바일 전용 CSS 클래스 추가
        document.body.classList.add('touch-device');
    }
}

// 알림 표시 함수
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let backgroundColor;
    if (type === 'info') {
        backgroundColor = 'var(--primary)';
    } else if (type === 'success') {
        backgroundColor = 'var(--primary)';
    } else {
        backgroundColor = 'var(--accent)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 320px;
        font-size: 15px;
        line-height: 1.4;
        text-align: center;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 애니메이션으로 표시
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 스로틀링 함수 (성능 최적화)
function throttle(func, wait) {
    let lastTime = 0;
    return function executedFunction(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            func.apply(this, args);
            lastTime = now;
        }
    };
}

// 디바운싱 함수 (성능 최적화)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 뷰포트 크기 변경 감지
window.addEventListener('resize', debounce(() => {
    // 모바일 뷰포트 높이 조정 (iOS Safari 주소창 문제 해결)
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // 반응형 클래스 업데이트
    updateResponsiveClasses();
}, 250));

// 반응형 클래스 업데이트
function updateResponsiveClasses() {
    const width = window.innerWidth;
    const body = document.body;
    
    // 기존 반응형 클래스 제거
    body.classList.remove('mobile', 'tablet', 'desktop');
    
    // 새로운 반응형 클래스 추가
    if (width < 768) {
        body.classList.add('mobile');
    } else if (width < 1024) {
        body.classList.add('tablet');
    } else {
        body.classList.add('desktop');
    }
}

// 초기 반응형 클래스 설정
updateResponsiveClasses();

// 페이지 로드 완료 후 실행
window.addEventListener('load', function() {
    // 로딩 애니메이션 제거 (있는 경우)
    document.querySelectorAll('.loading').forEach(element => {
        element.classList.remove('loading');
    });
    
    // 히어로 섹션 애니메이션 시작
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.animation = 'fadeInUp 1s ease-out forwards';
        }, 300);
    }
});

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // 프로덕션에서는 에러 로깅 서비스로 전송
});

// 개발 모드에서 디버그 정보 출력
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 포미서비스 랜딩 페이지 로드 완료');
    console.log('📱 현재 디바이스:', window.innerWidth < 768 ? '모바일' : window.innerWidth < 1024 ? '태블릿' : '데스크톱');
}