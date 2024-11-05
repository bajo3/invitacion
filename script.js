// Aquí puedes definir las imágenes de comida que deseas usar
const foodImages = [
    'img/1.png', // Reemplaza con las URL de tus imágenes
    'img/2.png',
    'img/3.png',
    // Agrega más imágenes según sea necesario
];

// Función para crear y animar las imágenes de comida
function createFood() {
    const foodImage = document.createElement('img');
    foodImage.src = foodImages[Math.floor(Math.random() * foodImages.length)];
    foodImage.className = 'food';
    foodImage.style.left = Math.random() * 100 + 'vw'; // Posiciona la comida en un lugar aleatorio en la parte superior
    document.body.appendChild(foodImage);

    // Eliminar la imagen una vez que ha caído
    foodImage.onload = () => {
        setTimeout(() => {
            foodImage.remove();
        }, 4000); // Espera el tiempo de la animación
    };
}

// Crear la comida cada segundo
setInterval(createFood, 2000); // Ajusta el tiempo de caída según sea necesario

const questions = [
    { text: "¿Vamos a cenar el miércoles?", yes: 1, no: "noQuestion1" },
    { text: "¿Qué horario te viene bien? Elige uno de los siguientes:", options: ["20:00", "20:30", "21:00", "21:30", "22:00"], next: 2 },
    { text: "¿Te gusta la idea de ir a un lugar con comida que te deje feliz toda la semana?", yes: 3, no: "noQuestion2" },
    { text: "¿Estás de acuerdo en que un buen plato se disfruta mejor con una charla divertida?", yes: 4, no: "noQuestion3" },
    { text: "¿Una cena de amigos no debería tener límite de tiempo, cierto?", yes: 5, no: "noQuestion4" },
    { text: "Si tuviéramos una cena donde nos reímos tanto que el tiempo vuela, ¿no sería ideal?", yes: 6, no: "noQuestion5" },
    { text: "¿Prefieres una cena casual o hay que ponerse elegante solo para que parezca una salida seria?", yes: 7, no: "noQuestion6" },
    { text: "¿Un fernet estaría bien para esta cena de amigos?", yes: 8, no: "noQuestion7" },
    { text: "¿Tienes historias interesantes que contar en la cena? (¡Yo tengo unas cuantas!)", yes: 9, no: "noQuestion8" },
    { text: "Si esta cena va a ser inolvidable, ¿nos vemos mañana para hacerla realidad?", yes: "confirmed", no: "Sabía que no podías decir que no, ¡así que es un sí!" },

    // Preguntas alternativas para respuestas "No"
    { id: "noQuestion1", text: "Entiendo, pero podría ser una buena ocasión para ponernos al día, ¿no?", yes: 1, no: 1 },
    { id: "noQuestion2", text: "Quizás no sea tu lugar favorito, pero es la compañía la que cuenta, ¿cierto?", yes: 3, no: 3 },
    { id: "noQuestion3", text: "Bueno, a veces lo importante es pasarla bien, incluso si el tema no es divertido.", yes: 4, no: 4 },
    { id: "noQuestion4", text: "Podemos ajustar el tiempo a lo que te quede mejor, ¡no será largo si así lo prefieres!", yes: 5, no: 5 },
    { id: "noQuestion5", text: "¿Y si te prometo que las risas estarán aseguradas?", yes: 6, no: 6 },
    { id: "noQuestion6", text: "A veces lo casual es mejor. ¡Podemos relajarnos y pasar un buen rato!", yes: 7, no: 7 },
    { id: "noQuestion7", text: "Podemos omitir el brindis, ¡lo que cuenta es que estemos ahí!", yes: 8, no: 8 },
    { id: "noQuestion8", text: "No importa, ¡con buena compañía no hacen falta historias preparadas!", yes: 9, no: 9 }
];

let currentQuestion = 0;

const questionText = document.getElementById("questionText");
const buttonContainer = document.getElementById("buttonContainer");

function loadQuestion(index) {
    const question = typeof index === "string" ? questions.find(q => q.id === index) : questions[index];
    
    // Aplicamos la clase de animación para desvanecimiento
    questionText.classList.add("animate__fadeOut");
    
    setTimeout(() => {
        questionText.innerText = question.text;
        questionText.classList.remove("animate__fadeOut");
        questionText.classList.add("animate__fadeIn");

        buttonContainer.innerHTML = ""; // Limpiamos el contenedor de botones para la nueva pregunta

        if (question.options) {
            // Pregunta con opciones de horario
            question.options.forEach(option => {
                const optionBtn = document.createElement("button");
                optionBtn.classList.add("answer-btn", "animate__animated", "animate__fadeIn");
                optionBtn.innerText = option;
                optionBtn.onclick = () => {
                    currentQuestion = question.next;
                    loadQuestion(currentQuestion);
                };
                buttonContainer.appendChild(optionBtn);
            });
        } else {
            // Pregunta con Sí o No
            const yesBtn = document.createElement("button");
            yesBtn.classList.add("answer-btn", "animate__animated", "animate__fadeIn");
            yesBtn.innerText = "Sí";
            yesBtn.onclick = () => handleAnswer("yes", index);
            buttonContainer.appendChild(yesBtn);

            const noBtn = document.createElement("button");
            noBtn.classList.add("answer-btn", "animate__animated", "animate__fadeIn");
            noBtn.innerText = "No";
            noBtn.onclick = () => handleAnswer("no", index);
            buttonContainer.appendChild(noBtn);
        }
    }, 500); // Espera a que el fadeOut se complete antes de actualizar la pregunta
}

// Función para manejar las respuestas
function handleAnswer(answer, index) {
    const question = typeof index === "string" ? questions.find(q => q.id === index) : questions[index];
    
    if (answer === "yes") {
        if (question.yes === "confirmed") {
            questionText.innerText = "¡Perfecto, ya está confirmado! Nos vemos entonces.";
            buttonContainer.innerHTML = ""; // Oculta los botones
        } else {
            currentQuestion = question.yes;
            loadQuestion(currentQuestion);
        }
    } else {
        // Si elige "No", avanza a la pregunta alternativa designada
        currentQuestion = question.no;
        loadQuestion(currentQuestion);
    }
}

// Cargar la primera pregunta
loadQuestion(currentQuestion);
