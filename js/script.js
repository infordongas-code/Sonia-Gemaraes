document.addEventListener("DOMContentLoaded", () => {
    // Atualiza ano no rodapé
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Menu Mobile
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });

    // =========================================
    // LINHA DO TEMPO INTERATIVA
    // =========================================
    const timelineData = {
        "1957": {
            title: "1957 — Nascimento em Brotas (SP)",
            text: "Sonia Guimarães nasce em 26 de junho de 1957, no interior de São Paulo. Desde a infância demonstrou curiosidade intelectual e facilidade com números, incentivada pela família a valorizar os estudos."
        },
        "1979": {
            title: "1979 — Graduação em Física na UFSCar",
            text: "Conclui a licenciatura em Ciências Físicas pela Universidade Federal de São Carlos (UFSCar), destacando-se em um curso majoritariamente masculino e branco."
        },
        "1989": {
            title: "1989 — Primeira Mulher Negra Doutora em Física",
            text: "Obtém o título de Ph.D. em Materiais Eletrônicos pelo Instituto de Ciência e Tecnologia da Universidade de Manchester (UMIST), na Inglaterra, tornando-se a primeira mulher negra brasileira doutora em Física."
        },
        "1993": {
            title: "1993 — Professora no Instituto Tecnológico de Aeronáutica (ITA)",
            text: "Torna-se a primeira mulher negra a integrar o corpo docente do ITA, em São José dos Campos (SP). Naquele ano, o instituto ainda não permitia o ingresso de mulheres no vestibular de graduação."
        },
        "2023": {
            title: "2023 — Reconhecimento Nacional e Medalha Santos-Dumont",
            text: "Recebe a Medalha Mérito Santos-Dumont da Força Aérea Brasileira e consolida-se como uma das principais vozes pela inclusão de negros e mulheres nas áreas de STEM (Ciência, Tecnologia, Engenharia e Matemática)."
        }
    };

    const timelineBtns = document.querySelectorAll(".timeline-btn");
    const timelineDisplay = document.getElementById("timeline-display");

    function renderTimeline(year) {
        const item = timelineData[year];
        timelineDisplay.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        `;
    }

    timelineBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            timelineBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderTimeline(btn.dataset.year);
        });
    });

    // Inicia linha do tempo com 1957
    renderTimeline("1957");

    // =========================================
    // QUIZ INTERATIVO
    // =========================================
    const quizData = [
        {
            question: "Qual marco histórico Dra. Sonia Guimarães alcançou em 1989?",
            options: [
                "Tornou-se a primeira mulher negra brasileira doutora em Física",
                "Fundou a Agência Espacial Brasileira",
                "Foi a primeira astronauta do Brasil",
                "Criou o primeiro satélite brasileiro"
            ],
            correct: 0,
            explanation: "Em 1989, ela concluiu seu doutorado na Universidade de Manchester (Inglaterra), tornando-se a primeira mulher negra brasileira doutora em Física."
        },
        {
            question: "Em qual renomada instituição brasileira Sonia Guimarães atua como professora desde 1993?",
            options: [
                "Instituto Butantan",
                "Instituto Tecnológico de Aeronáutica (ITA)",
                "Observatório Nacional",
                "Fiocruz"
            ],
            correct: 1,
            explanation: "Ela ingressou no ITA em 1993, três anos antes mesmo da instituição aceitar mulheres como alunas de graduação."
        },
        {
            question: "Qual é a principal área de pesquisa científica da Dra. Sonia Guimarães?",
            options: [
                "Biologia Marinha",
                "Astrofísica de Buracos Negros",
                "Semicondutores e sensores de radiação infravermelha",
                "Química Orgânica"
            ],
            correct: 2,
            explanation: "Sua pesquisa concentra-se em Física do Estado Sólido, materiais semicondutores e sensores de radiação infravermelha."
        },
        {
            question: "Por que a trajetória de Sonia Guimarães é celebrada no Dia da Consciência Negra?",
            options: [
                "Porque simboliza a ocupação de espaços acadêmicos de excelência historicamente negados à população negra",
                "Porque ela escreveu o hino da Consciência Negra",
                "Porque ela descobriu o quilombo de Palmares",
                "Porque ela foi ministra da Cultura"
            ],
            correct: 0,
            explanation: "Sua trajetória rompe barreiras raciais e de gênero na ciência brasileira, inspirando novas gerações de cientistas negros."
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionCounter = document.getElementById("question-counter");
    const scoreDisplay = document.getElementById("score-display");
    const quizQuestion = document.getElementById("quiz-question");
    const quizOptions = document.getElementById("quiz-options");
    const quizFeedback = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("next-btn");

    function loadQuestion() {
        const current = quizData[currentQuestion];
        questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
        quizQuestion.textContent = current.question;
        quizOptions.innerHTML = "";
        quizFeedback.textContent = "";
        nextBtn.classList.add("hidden");

        current.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.classList.add("option-btn");
            button.textContent = option;
            button.addEventListener("click", () => selectAnswer(index, button));
            quizOptions.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex, selectedBtn) {
        const current = quizData[currentQuestion];
        const allButtons = quizOptions.querySelectorAll(".option-btn");

        allButtons.forEach(btn => btn.disabled = true);

        if (selectedIndex === current.correct) {
            selectedBtn.classList.add("correct");
            score++;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            quizFeedback.textContent = `✅ Correto! ${current.explanation}`;
        } else {
            selectedBtn.classList.add("wrong");
            allButtons[current.correct].classList.add("correct");
            quizFeedback.textContent = `❌ Não foi dessa vez. ${current.explanation}`;
        }

        nextBtn.textContent = currentQuestion < quizData.length - 1 ? "Próxima Pergunta" : "Ver Resultado Final";
        nextBtn.classList.remove("hidden");
    }

    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizQuestion.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
        quizOptions.innerHTML = "";
        quizFeedback.textContent = "Obrigado por celebrar a história da Dra. Sonia Guimarães e a importância da Consciência Negra na ciência!";
        nextBtn.textContent = "Refazer Quiz";
        nextBtn.onclick = () => {
            currentQuestion = 0;
            score = 0;
            scoreDisplay.textContent = "Pontuação: 0";
            nextBtn.onclick = null;
            location.reload();
        };
    }

    loadQuestion();
});
