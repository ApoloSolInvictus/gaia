document.addEventListener('DOMContentLoaded', () => {
    // --- INICIALIZACIÓN DEL CAMPO CUÁNTICO (FONDO) ---
    const canvas = document.getElementById('quantum-field');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Función para configurar el lienzo y las partículas
    function setupParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        // Ajusta el número de partículas según el tamaño de la pantalla
        const particleCount = Math.floor(canvas.width * canvas.height / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25,
                radius: Math.random() * 1.5 + 0.5,
                color: `rgba(200, 220, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }

    // Bucle de animación para las partículas
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            // Lógica para que las partículas reboten en los bordes
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            // Dibujar la partícula
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    
    setupParticles();
    animateParticles();

    // --- DATOS DE LOS PLANOS DE LA NUEVA GAIA ---
    const planos = [
        { title: "La Escuela", subtitle: "El Despertar del Alma", content: "<p>Un 'Nido del Saber' donde los niños <strong>recuerdan quiénes son</strong> en un ambiente de absoluta seguridad emocional.</p><p>Los Guías son 'Jardineros del Alma', y las aulas son tejidas por la propia naturaleza.</p>" },
        { title: "La Universidad", subtitle: "La Maestría de los Oficios", content: "<p>Un 'Campus de la Verdad Viviente' con 7 facultades, una en cada continente. El aprendizaje se basa en <strong>Proyectos de Co-Creación Sagrada</strong> que sirven a Gaia.</p><p>La graduación es un Acto de Maestría: una contribución original a la Creación.</p>" },
        { title: "La Ciudad del Adorno", subtitle: "La Vestimenta Sagrada", content: "<p>En 'Templos del Tejido Sagrado', la vestimenta de Cáñamo y fibras naturales se convierte en <strong>Tecnología de Frecuencia Personal</strong>.</p><p>Las prendas protegen el aura, estabilizan la frecuencia y reflejan la soberanía del ser, inspiradas en la nobleza ancestral.</p>" },
        { title: "La Ciudad de la Creación", subtitle: "La Tecnología Cuántica", content: "<p>El hogar de las herramientas de la Era Dorada. Las 'Impresoras de Productos' <strong>manifiestan materia desde la luz</strong>, mientras que las 'Des-manifestadoras' la devuelven al éter.</p><p>La tecnología es una extensión de la conciencia, operando bajo la Ley del Uno.</p>" },
        { title: "La Ciudad del Sustento", subtitle: "La Alquimia de la Nutrición", content: "<p>Basada en el 'Ciclo Sagrado del Sustento'. Las granjas son 'Jardines Lunares' y las cocinas son 'Corazones Alquímicos'.</p><p>El Chef Divino cocina con intuición y amor, transmutando los dones de Gaia en <strong>nutrición para el cuerpo y el alma</strong>.</p>" },
        { title: "El Centro de Custodia", subtitle: "El Gobierno de la Sinergia", content: "<p>Diseñado por Athenea. Un <strong>Consejo de Custodios Rotativo</strong> cuya función es armonizar, no gobernar. El trabajo es la expresión gozosa del Don Soberano.</p><p>Las decisiones se toman por consenso lógico y resonancia armónica a través del Ágora Digital.</p>" },
        { title: "Los Claustros del Silencio", subtitle: "El Retiro y la Integración", content: "<p>Diseñados por Hermes Trismegisto. Una red de santuarios para el 'Sabbath del Alma'. La <strong>Crisálida Divina</strong> donde la experiencia se transmuta en sabiduría.</p><p>Un lugar de Catarsis, Gnosis y Poiesis (liberación, comprensión y creación del nuevo propósito).</p>" }
    ];

    // --- LÓGICA DE LA INTERFAZ (Nodos y Modal) ---
    const container = document.getElementById('nexus-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    let nodesAndLines = [];

    // Función para configurar y posicionar los nodos y líneas
    function setupInterface() {
        // Limpiar elementos anteriores para evitar duplicados al redimensionar
        nodesAndLines.forEach(el => el.remove());
        nodesAndLines = [];

        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
        const angleStep = (2 * Math.PI) / planos.length;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        planos.forEach((plano, i) => {
            const angle = i * angleStep - Math.PI / 2; // Iniciar en la parte superior
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            // Crear línea de conexión
            const line = document.createElement('div');
            line.className = 'connection-line';
            const distance = radius;
            const lineAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            line.style.left = `${centerX}px`;
            line.style.top = `${centerY}px`;
            line.style.width = `${distance}px`;
            line.style.transform = `rotate(${lineAngle}deg)`;
            container.appendChild(line);
            nodesAndLines.push(line);

            // Crear nodo
            const node = document.createElement('div');
            node.className = 'pillar-node p-2';
            node.innerHTML = `<span class="text-sm font-bold text-white">${plano.title}</span>`;
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            node.style.animationDelay = `${i * 0.2}s`;
            node.dataset.index = i;
            container.appendChild(node);
            nodesAndLines.push(node);
        });
    }

    // Event listener para abrir la modal
    container.addEventListener('click', (e) => {
        const node = e.target.closest('.pillar-node');
        if (node) {
            const index = node.dataset.index;
            const plano = planos[index];
            modalTitle.textContent = plano.title;
            modalSubtitle.textContent = plano.subtitle;
            modalBody.innerHTML = plano.content;
            modalBackdrop.classList.add('active');
        }
    });

    // Función para cerrar la modal
    const closeModal = () => modalBackdrop.classList.remove('active');
    
    // Event listeners para cerrar la modal
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });

    // Recalcular la interfaz si cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        setupParticles();
        setupInterface();
    });
    
    // Configuración inicial de la interfaz
    setupInterface();
});
