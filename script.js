 function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const headerOffset = 60;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Toggle FAQ
        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('.icon-rotate');
            
            // Закрыть все другие открытые FAQ
            document.querySelectorAll('.faq-answer.active').forEach(item => {
                if (item !== answer) {
                    item.classList.remove('active');
                    item.previousElementSibling.querySelector('.icon-rotate').classList.remove('active');
                }
            });

            // Переключить текущий FAQ
            answer.classList.toggle('active');
            icon.classList.toggle('active');
        }

        // Подсветка активной кнопки навигации при скролле
        window.addEventListener('scroll', function() {
            const sections = ['reviews', 'comparison', 'guide', 'faq'];
            const navButtons = document.querySelectorAll('.nav-btn');
            
            let current = '';
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop - 200;
                    if (window.pageYOffset >= sectionTop) {
                        current = sectionId;
                    }
                }
            });

            navButtons.forEach((btn, index) => {
                btn.classList.remove('active');
                if (sections[index] === current) {
                    btn.classList.add('active');
                }
            });
        });

        // Анимация появления карточек при скролле
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Применить анимацию к карточкам сервисов
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.service-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        });

const steps = document.querySelectorAll(".step");
let currentStep = 0;
let userFilters = [];

const services = [
    {
        name: "Razdef bot",
        price: "от 70 руб за 1 фото, цена-качество",
        link: "https://t.me/raxzdefr1_bot?start=954291600",
        tags: ["cheap","quality","fast","single","medium","mass","sbp","card","crypto","stars"]
    },
    {
        name: "Undress бот",
        price: "от 79 руб, цена-качество",
        link: "https://t.me/Undress_someone_bot?start=954291600",
        tags: ["cheap","single","sbp","card","crypto","stars"]
    },
    {
        name: "Stable nude",
        price: "от 40 руб за 1 фото",
        link: "https://stablenude.com/p/sn/gigaweb",
        tags: ["quality","mass","sbp","card","crypto","stars"]
    },
    {
        name: "Drug Ai",
        price: "от 79 руб за 1 фото",
        link: "https://t.me/drugAibot?start=954291600",
        tags: ["cheap","fast","sbp","card","crypto","stars"]
    },
    {
        name: "Braundress",
        price: "от 30 руб за 1 фото",
        link: "https://braundress.me/entry?start=WtYllLPM",
        tags: ["mass","asia","card","crypto"]
    },
    {
        name: "Neyro AI",
        price: "от 50 руб за 1 фото",
        link: "https://t.me/NeyroAI_bot?start=954291600_50",
        tags: ["quality","mass","sbp","card"]
    },
    {
        name: "NuMaster Photo",
        price: "от 50 руб за 1 фото",
        link: "https://t.me/NuMasterPhoto3_bot?start=954291600_50",
        tags: ["medium","sbp","card"]
    },
    {
        name: "Фоторедактор",
        price: "от 25 руб за 1 фото",
        link: "https://t.me/fotoredaktbot",
        tags: ["cheap","single","sbp","card","crypto"]
    },
	{
        name: "Tiffany",
        price: "от 50 руб за 1 фото",
        link: "https://t.me/nutiffanyy_bot?start=ref_954291600",
        tags: ["cheap","single","sbp","card","crypto"]
    },
    {
        name: "Сканер одежды",
        price: "от 79 руб за 1 фото",
        link: "https://t.me/Skaner_odegdi_bot?start=954291600",
        tags: ["cheap","sbp","card","crypto","stars"]
    }
];

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const parent = btn.closest(".step");

        parent.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        userFilters.push(btn.dataset.filter);

        setTimeout(() => {
            steps[currentStep].classList.add("hidden");
            currentStep++;

            if (steps[currentStep]) {
                steps[currentStep].classList.remove("hidden");
            } else {
                showResults();
            }
        }, 200);
    });
});

function showResults() {

    document.getElementById("results").classList.remove("hidden");

    let filtered = services.filter(service => {
        return userFilters.every(f => f === "any" || service.tags.includes(f));
    });

    const mainBot = services.find(s => s.name === "Razdef bot");

    if (!filtered.includes(mainBot)) {
        filtered.unshift(mainBot);
    }

    // минимум 2
    if (filtered.length < 3) {
        for (let s of services) {
            if (!filtered.includes(s)) {
                filtered.push(s);
            }
            if (filtered.length >= 3) break;
        }
    }

    filtered = filtered.slice(0, 6);

    const container = document.getElementById("results-list");
    container.innerHTML = "";

    filtered.forEach(s => {
        container.innerHTML += `
            <div class="border p-4 rounded-lg text-left">
                <h4 class="font-semibold">${s.name}</h4>
                <p class="text-gray-600 mb-3">${s.price}</p>
                <a href="${s.link}" target="_blank" rel="nofollow noopener noreferrer"
                   class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
                   Перейти
                </a>
            </div>
        `;
    });
}

function restartQuiz() {
    currentStep = 0;
    userFilters = [];
    document.getElementById("results").classList.add("hidden");
    steps.forEach((s, i) => {
        s.classList.toggle("hidden", i !== 0);
        s.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    });
    document.getElementById("comparison").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||
[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)
[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")
ym(86167499, "init", {
id:86167499,
clickmap:true,
trackLinks:true,
accurateTrackBounce:true
});