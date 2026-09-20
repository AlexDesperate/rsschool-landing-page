// Структура данных для динамического калькулятора в модальном окне
const servicesData = {
    ceramic: {
        title: "Нанесение керамики 9H",
        desc: "Профессиональное защитное покрытие премиум-класса. Придает кузову зеркальный блеск, мощнейший гидрофобный эффект (грязь и вода слетают сами) и защищает краску от химии, дорожных реагентов и выгорания на солнце.",
        prices: { sedan: 900, crossover: 1080, suv: 1260 }
    },
    chem: {
        title: "Детейлинг-химчистка салон",
        desc: "Полный разбор элементов салона. Использование деликатной химии, гипоаллергенных составов, торнадора и моющего пылесоса. Включает чистку багажника, потолка, всех щелей и финишную озонацию салона против запахов.",
        prices: { sedan: 540, crossover: 648, suv: 792 }
    },
    polishing: {
        title: "Восстановительная полировка кузова",
        desc: "Многоэтапная полировка пастами различной зернистости. Удаляет до 95% царапин, затертостей, следов от некачественных моек. Возвращает первозданный вид лаку без сильного истончения заводского слоя.",
        prices: { sedan: 648, crossover: 792, suv: 936 }
    },
    leather: {
        title: "Защита кожи и текстиля",
        desc: "Покрытие кожаных сидений крем-барьерами, а ткани - гидрофобными пропитками. Защищает салон от пролитого кофе, соков, окрашивания от джинсов и преждевременного истирания.",
        prices: { sedan: 288, crossover: 360, suv: 432 }
    },
    film: {
        title: "Оклейка полиуретановой пленкой",
        desc: "Премиальная защита от сколов и гравия. Антигравийная американская пленка толщиной 190 микрон с функцией самозатягивания царапин при нагреве. Полная консервация заводской краски.",
        prices: { sedan: 2519, crossover: 3059, suv: 3599 }
    }
};
document.addEventListener("DOMContentLoaded", () => {
    
    // ==================== 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ====================
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";
    
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            let newTheme = theme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    // ==================== 2. БУРГЕР-МЕНЮ ====================
    const burgerBtn = document.getElementById("burger-btn");
    const navMenu = document.getElementById("nav-menu");

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener("click", () => {
            burgerBtn.classList.toggle("open");
            navMenu.classList.toggle("open");
        });

        // Закрытие при клике по ссылке
        document.querySelectorAll(".nav__link").forEach(link => {
            link.addEventListener("click", () => {
                burgerBtn.classList.remove("open");
                navMenu.classList.remove("open");
            });
        });
    }

     // ==================== 3. СЛАЙДЕР / КАРУСЕЛЬ ====================
    const slider = document.getElementById("main-slider");
    if (slider) {
        const slides = slider.querySelectorAll(".slider__slide");
        const prevBtn = slider.querySelector(".slider__btn--prev");
        const nextBtn = slider.querySelector(".slider__btn--next");
        const dotsContainer = slider.querySelector(".slider__dots");
        let currentIdx = 0;
        let slideInterval;

        // Создаем индикаторы (dots)
        slides.forEach((_, idx) => {
            const dot = document.createElement("button");
            dot.classList.add("slider__dot");
            if (idx === 0) dot.classList.add("active");
            dot.setAttribute("aria-label", `Перейти к слайду ${idx + 1}`);
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".slider__dot");

        function changeSlide(idx) {
            slides[currentIdx].classList.remove("active");
            dots[currentIdx].classList.remove("active");
            
            currentIdx = (idx + slides.length) % slides.length;
            
            slides[currentIdx].classList.add("active");
            dots[currentIdx].classList.add("active");
        }

        function nextSlide() { changeSlide(currentIdx + 1); }
        function prevSlide() { changeSlide(currentIdx - 1); }

        nextBtn.addEventListener("click", () => { nextSlide(); resetAutoplay(); });
        prevBtn.addEventListener("click", () => { prevSlide(); resetAutoplay(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { changeSlide(idx); resetAutoplay(); });
        });

        function startAutoplay() { slideInterval = setInterval(nextSlide, 5000); }
        function resetAutoplay() { clearInterval(slideInterval); startAutoplay(); }

        startAutoplay();
    }

     // ==================== 4. ФИЛЬТРАЦИЯ КАТЕГОРИЙ И ДОП. КАРТОЧКИ ====================
    const filterContainer = document.getElementById("category-filters");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const cards = document.querySelectorAll(".service-card");

    if (filterContainer) {
        filterContainer.addEventListener("click", (e) => {
            if (!e.target.classList.contains("category-btn")) return;
            
            // Активный класс
            filterContainer.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            const selectedCat = e.target.getAttribute("data-category");

            cards.forEach(card => {
                const cardCat = card.getAttribute("data-category");
                // Если карточка скрыта кнопкой "Показать все", не трогаем её при фильтре "all" пока не нажмут раскрытие
                const isExtraCard = card.classList.contains("hidden") && !loadMoreBtn.classList.contains("hidden-state");

                if (selectedCat === "all") {
                    // Возвращаем дефолтное состояние (первые 3 видны, остальные скрыты)
                    if (card.hasAttribute("data-id") && (card.getAttribute("data-id") === "leather" || card.getAttribute("data-id") === "film")) {
                        card.style.display = "none";
                    } else {
                        card.style.display = "flex";
                    }
                } else if (selectedCat === cardCat) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // Кнопка "Показать все услуги" (Дополнительные карточки)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            cards.forEach(card => {
                card.classList.remove("hidden");
                card.style.display = "flex";
            });
            // Возвращаем "Все услуги" в активный фильтр, чтобы сбросить ограничения сеток
            if (filterContainer) {
                filterContainer.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
                filterContainer.querySelector('[data-category="all"]').classList.add("active");
            }
            loadMoreBtn.style.display = "none";
        });
    }