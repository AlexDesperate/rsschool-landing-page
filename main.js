// База данных услуг в виде массива объектов
const servicesArray = [
    {
        id: "ceramic",
        category: "body",
        title: "Нанесение керамики 9H",
        desc: "Профессиональное защитное покрытие премиум-класса. Придает кузову зеркальный блеск, мощнейший гидрофобный эффект (грязь и вода слетают сами) и защищает краску от химии, дорожных реагентов и выгорания на солнце.",
        image: "assets/images/services/ceramic.jpg",
        prices: { sedan: 900, crossover: 1080, suv: 1260 }
    },
    {
        id: "chem",
        category: "interior",
        title: "Детейлинг-химчистка",
        desc: "Полный разбор элементов салона. Использование деликатной химии, гипоаллергенных составов, торнадора и моющего пылесоса. Включает чистку багажника, потолка, всех щелей и финишную озонацию салона против запахов.",
        image: "assets/images/services/chem.jpg",
        prices: { sedan: 540, crossover: 648, suv: 792 }
    },
    {
        id: "polishing",
        category: "body",
        title: "Восстановительная полировка кузова",
        desc: "Многоэтапная полировка пастами различной зернистости. Удаляет до 95% царапин, затертостей, следов от некачественных моек. Возвращает первозданный вид лаку без сильного истончения заводского слоя.",
        image: "assets/images/services/polishing.jpg",
        prices: { sedan: 648, crossover: 792, suv: 936 }
    },
    {
        id: "leather",
        category: "interior",
        title: "Защита кожи и текстиля",
        desc: "Покрытие кожаных сидений крем-барьерами, а ткани - гидрофобными пропитками. Защищает салон от пролитого кофе, соков, окрашивания от джинсов и преждевременного истирания.",
        image: "assets/images/services/leather.jpg",
        prices: { sedan: 288, crossover: 360, suv: 432 }
    },
    {
        id: "film",
        category: "body",
        title: "Оклейка полиуретановой пленкой",
        desc: "Премиальная защита от сколов и гравия. Anti-scratch американская пленка толщиной 190 микрон с функцией самозатягивания царапин при нагреве. Полная консервация заводской краски.",
        image: "assets/images/services/film.jpg",
        prices: { sedan: 2519, crossover: 3059, suv: 3599 }
    },
    {
        id: "antirain",
        category: "body",
        title: "Антидождь на стекла",
        desc: "Улучшение видимости в плохую погоду и гидрофобное покрытие полусферы стекол. Снижает износ дворников и обеспечивает безопасность в сильный ливень.",
        image: "assets/images/services/antirain.jpg",
        prices: { sedan: 120, crossover: 140, suv: 160 }
    },
    {
        id: "ozonation",
        category: "interior",
        title: "Озонация салона",
        desc: "Полное уничтожение неприятных запахов, бактерий, плесени и вирусов газом. Глубокая дезинфекция и стерильный воздух в салоне автомобиля.",
        image: "assets/images/services/ozonation.jpg",
        prices: { sedan: 80, crossover: 80, suv: 100 }
    },
    {
        id: "headlights",
        category: "body",
        title: "Полировка фар и оптики",
        desc: "Восстановление идеальной прозрачности фар головного света механической полировкой и последующее бронирование защитным полиуретаном.",
        image: "assets/images/services/headlights.jpg",
        prices: { sedan: 150, crossover: 150, suv: 180 }
    }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // ==================== 1. ПЕРЕКЛЮЧЕНИЕ И СОХРАНЕНИЕ ТЕМЫ ====================
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

    // ==================== 2. МОБИЛЬНОЕ БУРГЕР-МЕНЮ ====================
    const burgerBtn = document.getElementById("burger-btn");
    const navMenu = document.getElementById("nav-menu");

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener("click", () => {
            burgerBtn.classList.toggle("open");
            const isOpen = navMenu.classList.toggle("open");
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        document.querySelectorAll(".nav__link").forEach(link => {
            link.addEventListener("click", () => {
                burgerBtn.classList.remove("open");
                navMenu.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // ==================== 3. АВТОНОМНЫЙ СЛАЙДЕР ====================
    const slider = document.getElementById("main-slider");
    if (slider) {
        const slides = slider.querySelectorAll(".slider__slide");
        const prevBtn = slider.querySelector(".slider__btn--prev");
        const nextBtn = slider.querySelector(".slider__btn--next");
        const dotsContainer = slider.querySelector(".slider__dots");
        let currentIdx = 0;
        let slideInterval;

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

        if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAutoplay(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAutoplay(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { changeSlide(idx); resetAutoplay(); });
        });

        function startAutoplay() { slideInterval = setInterval(nextSlide, 5000); }
        function resetAutoplay() { clearInterval(slideInterval); startAutoplay(); }

        startAutoplay();
    }

    // ==================== 4. КАТАЛОГ, ФИЛЬТРЫ И МОДАЛКА ====================
    const servicesContainer = document.getElementById("services-container");
    
    if (servicesContainer) {
        // Динамический рендер карточек
        function renderServicesCards() {
            servicesContainer.innerHTML = "";
            servicesArray.forEach((service, index) => {
                const isHidden = index >= 4 ? "hidden" : "";
                let badge = "";
                if (service.id === "ceramic" || service.id === "chem") badge = '<span class="service-card__badge">Популярно</span>';
                if (service.id === "film") badge = '<span class="service-card__badge">Премиум</span>';

                const cardHTML = `
                    <div class="service-card ${isHidden}" data-id="${service.id}" data-category="${service.category}">
                        ${badge}
                        <div class="service-card__content">
                            <h3>${service.title}</h3>
                            <p>${service.desc}</p>
                            <div class="service-card__footer">
                                <span class="price-from">от ${service.prices.sedan} BYN</span>
                                <button class="btn btn--sm open-modal-btn">Подробнее</button>
                            </div>
                        </div>
                    </div>
                `;
                servicesContainer.insertAdjacentHTML("beforeend", cardHTML);
            });
        }

        renderServicesCards();

        // Фильтрация и кнопка "Показать еще"
        const filterContainer = document.getElementById("category-filters");
        const loadMoreBtn = document.getElementById("load-more-btn");
        let isExpanded = false;

        if (filterContainer) {
            filterContainer.addEventListener("click", (e) => {
                if (!e.target.classList.contains("category-btn")) return;
                
                filterContainer.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");

                const selectedCat = e.target.getAttribute("data-category");
                const cards = document.querySelectorAll(".service-card");

                cards.forEach((card, index) => {
                    const cardCat = card.getAttribute("data-category");
                    
                    if (selectedCat === "all") {
                        if (index >= 4 && !isExpanded) {
                            card.classList.add("hidden");
                            card.style.display = "none";
                        } else {
                            card.classList.remove("hidden");
                            card.style.display = "flex";
                        }
                    } else {
                        if (selectedCat === cardCat) {
                            card.style.display = "flex";
                        } else {
                            card.style.display = "none";
                        }
                    }
                });

                if (loadMoreBtn) {
                    loadMoreBtn.style.display = (selectedCat !== "all" || isExpanded) ? "none" : "inline-block";
                }
            });
        }

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", () => {
                isExpanded = true;
                const cards = document.querySelectorAll(".service-card");
                cards.forEach(card => {
                    card.classList.remove("hidden");
                    card.style.display = "flex";
                });
                loadMoreBtn.style.display = "none";
            });
        }

        // Модальное окно и динамический калькулятор стоимости
        const modal = document.getElementById("info-modal");
        const modalContent = document.getElementById("modal-dynamic-content");

        if (modal && modalContent) {
            servicesContainer.addEventListener("click", (e) => {
                const btn = e.target.closest(".open-modal-btn");
                if (!btn) return;

                const card = btn.closest(".service-card");
                if (!card) return;

                const serviceId = card.getAttribute("data-id");
                const data = servicesArray.find(service => service.id === serviceId);
                if (!data) return;

                modalContent.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>${data.desc}</p>
                    <div class="calc-group">
                        <label for="car-class">Выберите класс вашего автомобиля:</label>
                        <select id="car-class" class="calc-select">
                            <option value="sedan">Седан / Хэтчбек</option>
                            <option value="crossover">Кроссовер / Компактный SUV</option>
                            <option value="suv">Внедорожник / Премиум Седан</option>
                        </select>
                    </div>
                    <div class="modal-price-box">
                        Итоговая стоимость: <span id="dynamic-price">${data.prices.sedan.toLocaleString()}</span> BYN
                    </div>
                    <button class="btn cta-btn" style="width: 100%; margin-top: 20px;">Записаться на обслуживание</button>
                `;

                const selectClass = modalContent.querySelector("#car-class");
                const priceSpan = modalContent.querySelector("#dynamic-price");

                if (selectClass && priceSpan) {
                    selectClass.addEventListener("change", (event) => {
                        const chosenClass = event.target.value;
                        const newPrice = data.prices[chosenClass];
                        if (newPrice !== undefined) {
                            priceSpan.textContent = newPrice.toLocaleString();
                        }
                    });
                }

                modal.classList.add("open");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            });

            modal.addEventListener("click", (e) => {
                if (e.target.hasAttribute("data-close") || e.target === modal) {
                    modal.classList.remove("open");
                    modal.setAttribute("aria-hidden", "true");
                    document.body.style.overflow = "";
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && modal.classList.contains("open")) {
                    modal.classList.remove("open");
                    modal.setAttribute("aria-hidden", "true");
                    document.body.style.overflow = "";
                }
            });
        }
    }
});
