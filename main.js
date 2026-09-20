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