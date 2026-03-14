// BLOQUE 1: Control de navegación, Sonido, Recibo y WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    const principal = document.getElementById('menu-principal');
    const precios = document.getElementById('menu-precios');
    const tarjetas = document.getElementById('menu-tarjetas');
    const modalRecibo = document.getElementById('modal-recibo');
    const reciboProducto = document.getElementById('recibo-producto');
    const reciboPrecio = document.getElementById('recibo-precio');
    const btnConfirmar = document.getElementById('btn-confirmar-compra');
    const btnCancelar = document.getElementById('btn-cancelar-modal');
    const sound = document.getElementById('click-sound');

    let mensajeWhatsAppActual = "";

    const playSound = () => {
        if (sound) {
            sound.pause(); 
            sound.currentTime = 0; 
            sound.play().catch(() => {});
        }
    };

    const abrirRecibo = (elemento) => {
        const item = elemento.getAttribute('data-item');
        const precio = elemento.getAttribute('data-price');
        mensajeWhatsAppActual = elemento.getAttribute('data-msj');

        if (item && precio) {
            reciboProducto.textContent = item;
            reciboPrecio.textContent = precio;
            modalRecibo.classList.remove('hidden');
        }
    };

    // --- EVENTO DE CLIC GLOBAL (Mantenido y Corregido) ---
    document.addEventListener('click', (e) => {
        const targetCompra = e.target.closest('.price-card, .price-card-grid');
        
        if (targetCompra && targetCompra.hasAttribute('data-item')) {
            playSound();
            abrirRecibo(targetCompra);
            return;
        }

        const targetGeneral = e.target.closest('.menu-card, .category-btn, .back-button, .confirm-btn, .cancel-btn');
        if (targetGeneral) {
            playSound();
        }
    });

    // --- NAVEGACIÓN ---
    document.getElementById('card-diamantes').onclick = () => {
        setTimeout(() => {
            principal.classList.add('hidden');
            precios.classList.remove('hidden');
            window.scrollTo(0, 0); 
        }, 300);
    };

    document.getElementById('card-semanal').onclick = () => {
        setTimeout(() => {
            principal.classList.add('hidden');
            tarjetas.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 300);
    };

    document.getElementById('btn-volver').onclick = () => {
        precios.classList.add('hidden');
        principal.classList.remove('hidden');
    };

    document.getElementById('btn-volver-tarjetas').onclick = () => {
        tarjetas.classList.add('hidden');
        principal.classList.remove('hidden');
    };

    // --- LÓGICA DE CATEGORÍAS ---
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.id.replace('tab-', 'content-');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.toggle('hidden', content.id !== targetId);
            });
        });
    });

    btnConfirmar.onclick = () => {
        const numero = "59163790452"; 
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensajeWhatsAppActual)}`;
        window.open(url, '_blank');
        modalRecibo.classList.add('hidden');
    };

    btnCancelar.onclick = () => modalRecibo.classList.add('hidden');
});

// ----------------------------------------------------
// BLOQUE 2: GENERADOR DE FUGAS DE LUZ (Efecto Humo RESTAURADO)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const createLeak = () => {
        const leak = document.createElement('div');
        leak.classList.add('light-leak');

        // Configuración idéntica a tu original
        const size = Math.random() * 200 + 150 + 'px';
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const posX = side === 'left' ? '-100px' : 'calc(100vw - 100px)';
        const posY = Math.random() * 100 + 'vh';
        const duration = Math.random() * 7 + 8 + 's';

        leak.style.width = size; 
        leak.style.height = size;
        leak.style.left = posX; 
        leak.style.top = posY;
        leak.style.animationDuration = duration;

        container.appendChild(leak);

        // Eliminar y recrear para mantener flujo infinito
        setTimeout(() => { 
            leak.remove(); 
            createLeak(); 
        }, parseFloat(duration) * 1000);
    };

    // Iniciar las 8 partículas iniciales con desfase
    for (let i = 0; i < 8; i++) { 
        setTimeout(createLeak, i * 2000); 
    }
});
