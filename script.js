/* =========================================================
   Daxta — Script principal
   ========================================================= */

/* ---------- Datos estáticos ---------- */

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio', icon: '⊙' },
  { id: 'nosotros', label: 'Sobre Nosotros', icon: '◈' },
  { id: 'servicios', label: 'Servicios', icon: '◇' },
  { id: 'proceso', label: 'Cómo Funciona', icon: '◎' },
  { id: 'publico', label: 'Público Objetivo', icon: '◉' },
  { id: 'diferenciadores', label: 'Diferenciadores', icon: '◆' },
  { id: 'futuro', label: 'Visión Futura', icon: '◐' },
  { id: 'contacto', label: 'Contacto', icon: '◻' },
];

const SERVICES = [
  {
    icon: '📋',
    title: 'Encuestas y Formularios',
    desc: 'Diseñamos y aplicamos instrumentos de recolección de datos adaptados a la población juvenil de Tabio, garantizando respuestas representativas y confiables.',
  },
  {
    icon: '🔍',
    title: 'Análisis de Datos',
    desc: 'Procesamos, limpiamos y analizamos la información recolectada para identificar patrones, tendencias y necesidades relevantes dentro de la comunidad.',
  },
  {
    icon: '📊',
    title: 'Visualización e Informes',
    desc: 'Transformamos los datos en gráficos, tablas, estadísticas y dashboards interactivos que facilitan la comprensión y comunicación de resultados.',
  },
  {
    icon: '🎯',
    title: 'Estudios de Comunidad',
    desc: 'Elaboramos estudios completos sobre comportamientos, intereses y opiniones de los jóvenes para apoyar la toma de decisiones estratégicas.',
  },
  {
    icon: '🏫',
    title: 'Consultoría Educativa',
    desc: 'Asesoramos a instituciones educativas con información precisa para mejorar programas académicos y extracurriculares orientados a jóvenes.',
  },
  {
    icon: '🤝',
    title: 'Apoyo a Proyectos Sociales',
    desc: 'Proveemos datos confiables para entidades públicas y organizaciones que desarrollen iniciativas en beneficio de la juventud cundinamarquesa.',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Recolección',
    desc: 'Aplicamos encuestas y formularios dirigidos a jóvenes de 12 a 20 años en Tabio, con total respeto a su privacidad y autonomía.',
  },
  {
    num: '02',
    title: 'Organización',
    desc: 'Estructuramos los datos recolectados en bases de datos limpias, ordenadas y listas para el análisis.',
  },
  {
    num: '03',
    title: 'Análisis',
    desc: 'Aplicamos técnicas de análisis estadístico para encontrar patrones, correlaciones y tendencias significativas.',
  },
  {
    num: '04',
    title: 'Presentación',
    desc: 'Entregamos informes claros, gráficos dinámicos y dashboards personalizados según las necesidades del cliente.',
  },
];

const AUDIENCE = [
  {
    icon: '🏪',
    title: 'Empresas Locales',
    desc: 'Que buscan entender el mercado juvenil de Tabio para crear productos y servicios relevantes.',
  },
  {
    icon: '🏫',
    title: 'Instituciones Educativas',
    desc: 'Colegios y universidades que quieren mejorar sus programas con base en las necesidades reales de los estudiantes.',
  },
  {
    icon: '🏛️',
    title: 'Entidades Públicas',
    desc: 'Alcaldías, secretarías e instituciones gubernamentales que desarrollan políticas para la juventud.',
  },
  {
    icon: '💡',
    title: 'Emprendedores',
    desc: 'Personas con ideas de negocio que necesitan validar su propuesta con datos del mercado local.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Enfoque Local',
    desc: 'Conocemos profundamente el contexto social y cultural de Tabio, Cundinamarca, lo que nos permite recolectar datos más precisos y relevantes.',
  },
  {
    title: 'Ética en Datos',
    desc: 'La privacidad de los participantes es nuestra prioridad. Operamos bajo principios estrictos de manejo responsable de información personal.',
  },
  {
    title: 'Resultados Accionables',
    desc: 'No solo entregamos datos, sino insights concretos que permiten a nuestros clientes tomar decisiones mejor fundamentadas.',
  },
  {
    title: 'Población Especializada',
    desc: 'Nos especializamos en el segmento juvenil (12-20 años), un grupo estratégico frecuentemente subestimado en los análisis de datos regionales.',
  },
];

const FUTURE_ITEMS = [
  { icon: '🗺️', text: 'Expansión a otros municipios de Cundinamarca' },
  { icon: '📈', text: 'Dashboards personalizados para cada cliente' },
  { icon: '🧪', text: 'Análisis de múltiples grupos y sectores económicos' },
  { icon: '🌱', text: 'Alianzas con instituciones académicas y públicas' },
  { icon: '💻', text: 'Plataforma propia de gestión de encuestas y datos' },
];

/* ---------- Referencias del DOM ---------- */

const sidebar = document.getElementById('sidebar');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const servicesGrid = document.getElementById('servicesGrid');
const processList = document.getElementById('processList');
const audienceGrid = document.getElementById('audienceGrid');
const differentiatorsGrid = document.getElementById('differentiatorsGrid');
const futureList = document.getElementById('futureList');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

/* ---------- Estado ---------- */

let sidebarOpen = true;
let isMobile = false;
let activeSection = 'inicio';
let toastTimer = null;

/* =========================================================
   Renderizado de contenido dinámico
   ========================================================= */

function renderNav() {
  sidebarNav.innerHTML = NAV_ITEMS.map(
    (item) => `
      <button
        class="nav-link${activeSection === item.id ? ' active' : ''}"
        data-section="${item.id}"
      >
        <span class="nav-icon">${item.icon}</span>
        <span>${item.label}</span>
      </button>
    `,
  ).join('');

  sidebarNav.querySelectorAll('.nav-link').forEach((btn) => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.section));
  });
}

function renderServices() {
  servicesGrid.innerHTML = SERVICES.map(
    (s) => `
      <div class="service-card">
        <div class="service-icon">${s.icon}</div>
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.desc}</p>
      </div>
    `,
  ).join('');
}

function renderProcess() {
  processList.innerHTML = PROCESS_STEPS.map(
    (step, i) => `
      <div class="process-step">
        <div class="process-marker">
          <div class="step-circle font-mono">${step.num}</div>
          ${i < PROCESS_STEPS.length - 1 ? '<div class="process-connector"></div>' : ''}
        </div>
        <div class="process-content">
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </div>
      </div>
    `,
  ).join('');
}

function renderAudience() {
  audienceGrid.innerHTML = AUDIENCE.map(
    (a) => `
      <div class="audience-card">
        <div class="audience-icon">${a.icon}</div>
        <h3 class="audience-title">${a.title}</h3>
        <p class="audience-desc">${a.desc}</p>
      </div>
    `,
  ).join('');
}

function renderDifferentiators() {
  differentiatorsGrid.innerHTML = DIFFERENTIATORS.map(
    (d) => `
      <div class="differentiator">
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
      </div>
    `,
  ).join('');
}

function renderFuture() {
  futureList.innerHTML = FUTURE_ITEMS.map(
    (item) => `
      <div class="future-item">
        <span>${item.icon}</span>
        <span>${item.text}</span>
      </div>
    `,
  ).join('');
}

/* =========================================================
   Sidebar / Responsive
   ========================================================= */

function checkMobile() {
  isMobile = window.innerWidth <= 900;

  if (isMobile) {
    sidebarOpen = false;
    sidebar.classList.remove('collapsed');
  } else {
    sidebarOpen = true;
    sidebar.classList.remove('collapsed');
  }

  updateSidebarState();
}

function updateSidebarState() {
  if (isMobile) {
    sidebar.classList.toggle('open', sidebarOpen);
    sidebarOverlay.classList.toggle('visible', sidebarOpen);
    sidebarToggle.style.left = '20px';
  } else {
    sidebar.classList.toggle('collapsed', !sidebarOpen);
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    sidebarToggle.style.left = sidebarOpen ? '220px' : '20px';
  }

  mainContent.classList.toggle('full-width', !sidebarOpen && !isMobile);
  updateToggleIcon();
}

function updateToggleIcon() {
  const spans = sidebarToggle.querySelectorAll('span');
  const isCollapsed = !isMobile && !sidebarOpen;

  if (isCollapsed || isMobile) {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  } else {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }
}

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  updateSidebarState();
}

/* =========================================================
   Navegación suave
   ========================================================= */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  if (isMobile) {
    sidebarOpen = false;
    updateSidebarState();
  }
}

/* =========================================================
   Scroll spy (IntersectionObserver)
   ========================================================= */

function initScrollSpy() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
          updateActiveNavLink();
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' },
  );

  NAV_ITEMS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function updateActiveNavLink() {
  sidebarNav.querySelectorAll('.nav-link').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === activeSection);
  });
}

/* =========================================================
   Toast
   ========================================================= */

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* =========================================================
   Formulario de contacto
   ========================================================= */

function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    organizacion: document.getElementById('organizacion').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    interes: document.getElementById('interes').value,
    mensaje: document.getElementById('mensaje').value.trim(),
  };

  if (!formData.nombre || !formData.email || !formData.mensaje) {
    showToast('Por favor completa los campos requeridos.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  // Guardar en localStorage como clientes_potenciales
  try {
    const existing = JSON.parse(localStorage.getItem('clientes_potenciales') || '[]');
    existing.push({
      ...formData,
      fecha: new Date().toISOString(),
      id: Date.now(),
    });
    localStorage.setItem('clientes_potenciales', JSON.stringify(existing));
  } catch (err) {
    console.error('Error guardando en localStorage:', err);
  }

  // Simular envío asíncrono
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensaje';
    contactForm.reset();
    showToast('¡Mensaje enviado! Te contactaremos pronto.');
  }, 1200);
}

/* =========================================================
   Inicialización
   ========================================================= */

function init() {
  renderNav();
  renderServices();
  renderProcess();
  renderAudience();
  renderDifferentiators();
  renderFuture();

  checkMobile();
  initScrollSpy();

  sidebarToggle.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', () => {
    sidebarOpen = false;
    updateSidebarState();
  });

  document.querySelectorAll('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll));
  });

  contactForm.addEventListener('submit', handleSubmit);

  window.addEventListener('resize', checkMobile);
}

document.addEventListener('DOMContentLoaded', init);