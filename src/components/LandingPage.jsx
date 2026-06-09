import { useRef, useState, useEffect, lazy, Suspense, Component } from 'react'
const VegetableScene = lazy(() => import('./VegetableScene'))

class VegErrorBoundary extends Component {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? null : this.props.children }
}
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import { DESAYUNOS } from '../data/desayunos'
import { ALMUERZOS } from '../data/almuerzos'
import { CENAS } from '../data/cenas'

// ── Helpers ──────────────────────────────────────────────────────────────────

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
}

// ── Animated counter hook ────────────────────────────────────────────────────

function useCountUp(target, duration = 1.5, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

// ── Animated Number Component ────────────────────────────────────────────────

function AnimatedStat({ value, suffix = '', prefix = '', label, color = 'text-[#0071e3]', started }) {
  const count = useCountUp(value, 1.4, started)
  return (
    <div className="text-center">
      <div className={cn('text-4xl sm:text-5xl font-bold tabular-nums', color)}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm text-[#6e6e73] font-medium">{label}</div>
    </div>
  )
}

// ── Meal time badge ──────────────────────────────────────────────────────────

function MealBadge({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
        active
          ? 'bg-[#0071e3] text-white shadow-md'
          : 'bg-black/5 text-[#6e6e73] hover:bg-black/10'
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

// ── Sample menu data ─────────────────────────────────────────────────────────

const SAMPLE_MENUS = {
  desayuno: {
    label: 'Desayuno',
    icon: '🌅',
    kcal: 500,
    color: '#ff9f0a',
    items: [
      { name: 'Avena cocida', amount: '½ taza', kcal: 80, icon: '🥣' },
      { name: 'Manzana', amount: '1 unidad', kcal: 60, icon: '🍎' },
      { name: 'Leche descremada', amount: '1 taza', kcal: 100, icon: '🥛' },
      { name: 'Huevo', amount: '1 unidad', kcal: 55, icon: '🍳' },
    ],
  },
  colacionAM: {
    label: 'Colación A.M.',
    icon: '🍎',
    kcal: 143,
    color: '#30d158',
    items: [
      { name: 'Yogurt natural', amount: '8 oz', kcal: 120, icon: '🫙' },
      { name: 'Fresas', amount: '¾ taza', kcal: 60, icon: '🍓' },
    ],
  },
  almuerzo: {
    label: 'Almuerzo',
    icon: '🍽️',
    kcal: 700,
    color: '#0071e3',
    items: [
      { name: 'Arroz cocido', amount: '½ taza', kcal: 80, icon: '🍚' },
      { name: 'Pollo sin piel', amount: '3 oz', kcal: 165, icon: '🍗' },
      { name: 'Frijoles', amount: '¼ taza', kcal: 80, icon: '🫘' },
      { name: 'Brócoli cocido', amount: '1 taza', kcal: 25, icon: '🥦' },
      { name: 'Aguacate', amount: '¼ unidad', kcal: 45, icon: '🥑' },
    ],
  },
  colacionPM: {
    label: 'Colación P.M.',
    icon: '🥜',
    kcal: 143,
    color: '#ff453a',
    items: [
      { name: 'Galletas saladas', amount: '3 unidades', kcal: 80, icon: '🍪' },
      { name: 'Maní', amount: '10 unidades', kcal: 45, icon: '🥜' },
    ],
  },
  cena: {
    label: 'Cena',
    icon: '🌙',
    kcal: 400,
    color: '#9b59b6',
    items: [
      { name: 'Pasta cocida', amount: '½ taza', kcal: 80, icon: '🍝' },
      { name: 'Filete de pescado', amount: '1 oz', kcal: 75, icon: '🐟' },
      { name: 'Ensalada mixta', amount: '1 taza', kcal: 25, icon: '🥗' },
    ],
  },
}

// ── Feature card (cult-ui minimal-card style) ────────────────────────────────

function FeatureCard({ icon, title, desc, gradient }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 cursor-default"
    >
      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4', gradient)}>
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#1d1d1f] mb-1.5">{title}</h3>
      <p className="text-sm text-[#6e6e73] leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// ── Step card ────────────────────────────────────────────────────────────────

function StepCard({ num, title, desc, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      className="flex gap-5"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0071e3] text-white text-sm font-bold flex items-center justify-center shadow-md">
        {num}
      </div>
      <div>
        <h3 className="font-semibold text-[#1d1d1f] mb-1">{title}</h3>
        <p className="text-sm text-[#6e6e73] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

// ── Floating hero card ───────────────────────────────────────────────────────

function HeroCard() {
  const [activeMeal, setActiveMeal] = useState('almuerzo')
  const meal = SAMPLE_MENUS[activeMeal]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.9, ease: [0.34, 1.1, 0.64, 1] }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 via-purple-300/10 to-green-300/20 rounded-3xl blur-2xl" />

      {/* Card */}
      <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] font-medium text-[#6e6e73] uppercase tracking-wider">Plan nutricional</p>
              <p className="text-base font-semibold text-[#1d1d1f] mt-0.5">María García, 28 años</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-medium text-[#6e6e73]">Objetivo</p>
              <p className="text-base font-bold text-[#0071e3]">1,850 kcal</p>
            </div>
          </div>

          {/* Meal tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(SAMPLE_MENUS).map(([key, m]) => (
              <MealBadge
                key={key}
                label={m.label}
                icon={m.icon}
                active={activeMeal === key}
                onClick={() => setActiveMeal(key)}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/[0.05] mx-5" />

        {/* Meal content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMeal}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="px-5 py-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold" style={{ color: meal.color }}>
                {meal.icon} {meal.label}
              </span>
              <span className="text-xs font-medium text-[#6e6e73] bg-black/5 px-2 py-0.5 rounded-full">
                {meal.kcal} kcal
              </span>
            </div>
            <div className="space-y-2">
              {meal.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm text-[#1d1d1f]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6e6e73]">{item.amount}</span>
                    <span className="text-xs font-medium text-[#6e6e73] w-12 text-right">{item.kcal} kcal</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="px-5 pb-5">
          <div className="h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
            <motion.div
              key={activeMeal}
              initial={{ width: 0 }}
              animate={{ width: `${(meal.kcal / 1850) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: meal.color }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#6e6e73]">{meal.kcal} kcal consumidas</span>
            <span className="text-[10px] text-[#6e6e73]">{1850 - meal.kcal} restantes</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Macro bar ────────────────────────────────────────────────────────────────

function MacroBar({ label, value, max, color, unit = 'g' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs text-[#6e6e73] mb-1">
        <span>{label}</span>
        <span className="font-medium text-[#1d1d1f]">{value}{unit}</span>
      </div>
      <div className="h-2 bg-black/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(value / max) * 100}%` } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ── Food category pills ──────────────────────────────────────────────────────

const FOOD_CATEGORIES = [
  { name: 'Cereales', count: 19, icon: '🌾', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Frutas', count: 28, icon: '🍎', color: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'Vegetales', count: 24, icon: '🥦', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Carnes', count: 17, icon: '🥩', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Leche', count: 5, icon: '🥛', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { name: 'Grasas', count: 16, icon: '🫒', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
]

// ── Main Landing Page ────────────────────────────────────────────────────────

export default function LandingPage({ onStart }) {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' })

  return (
    <div className="min-h-screen bg-[#f5f5f7] overflow-x-hidden font-sans">

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#f5f5f7]/80 border-b border-black/[0.06]"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0071e3] flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="font-semibold text-[#1d1d1f] text-sm">NutriCalc</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
        >
          Comenzar gratis
        </motion.button>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-green-200/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-purple-200/20 blur-3xl"
          />
        </div>

        {/* 3D vegetable models — lazy loaded, WebGL optional */}
        <VegErrorBoundary>
          <Suspense fallback={null}>
            <VegetableScene />
          </Suspense>
        </VegErrorBoundary>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
              Sistema de Intercambios · Harris-Benedict
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-[#1d1d1f] leading-[1.08] tracking-tight mb-6">
              Nutrición personalizada,{' '}
              <span className="bg-gradient-to-r from-[#0071e3] to-[#30d158] bg-clip-text text-transparent">
                sin complicaciones.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-[#6e6e73] leading-relaxed mb-8 max-w-md">
              Calcula tus requerimientos energéticos con la fórmula Harris-Benedict y obtén menús personalizados usando el método de intercambios con más de 109 alimentos.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold px-7 py-3.5 rounded-full text-sm shadow-lg shadow-blue-500/20 transition-colors"
              >
                Calcular mi plan ahora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-black/[0.06] hover:bg-black/[0.09] text-[#1d1d1f] font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                Ver funciones
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {['🧑‍⚕️','👩‍⚕️','🧑‍🍳','👩‍🔬'].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-green-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#6e6e73]">
                Diseñado para <span className="font-semibold text-[#1d1d1f]">nutricionistas y pacientes</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right — hero card */}
          <HeroCard />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-[#6e6e73]/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-[#6e6e73]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-10">
            <motion.div
              initial="hidden"
              animate={statsInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div variants={scaleIn}>
                <AnimatedStat value={109} label="Alimentos en base de datos" color="text-[#0071e3]" started={statsInView} />
              </motion.div>
              <motion.div variants={scaleIn}>
                <AnimatedStat value={5} label="Tiempos de comida" color="text-[#30d158]" started={statsInView} />
              </motion.div>
              <motion.div variants={scaleIn}>
                <AnimatedStat value={150} suffix="+" label="Recetas salvadoreñas" color="text-[#ff9f0a]" started={statsInView} />
              </motion.div>
              <motion.div variants={scaleIn}>
                <AnimatedStat value={30} label="Días de menú en un click" color="text-[#ff453a]" started={statsInView} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" ref={featuresRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-[#0071e3] uppercase tracking-widest mb-3">
              Todo lo que necesitas
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
              Funciones diseñadas para el{' '}
              <span className="bg-gradient-to-r from-[#0071e3] to-[#5856d6] bg-clip-text text-transparent">
                profesional de nutrición
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <FeatureCard
              icon="⚖️"
              gradient="bg-blue-50"
              title="Fórmula Harris-Benedict"
              desc="Calcula el Requerimiento Energético Estimado (REE) con peso ideal, talla y factor de actividad física."
            />
            <FeatureCard
              icon="🍽️"
              gradient="bg-green-50"
              title="Generador de menús"
              desc="Genera planes alimenticios personalizados por día con distribución automática de intercambios por tiempo de comida."
            />
            <FeatureCard
              icon="📊"
              gradient="bg-purple-50"
              title="Distribución de macros"
              desc="Ajusta carbohidratos, proteínas y grasas con porcentajes personalizables y visualización en tiempo real."
            />
            <FeatureCard
              icon="📅"
              gradient="bg-amber-50"
              title="Planes multi-día"
              desc="Genera menús de 1, 7, 14 o 30 días con historial de alimentos que evita repeticiones en ventana de 3 días."
            />
            <FeatureCard
              icon="🔄"
              gradient="bg-red-50"
              title="Sistema de exclusiones"
              desc="Filtra alimentos por alergias o condiciones médicas y el sistema redistribuye automáticamente los intercambios."
            />
            <FeatureCard
              icon="📥"
              gradient="bg-sky-50"
              title="Exportar a Excel y CSV"
              desc="Descarga el plan completo con un click para compartir con el paciente o usarlo en tu práctica clínica."
            />
          </motion.div>
        </div>
      </section>

      {/* ── MENU PREVIEW ── */}
      <MenuPreviewSection onStart={onStart} />

      {/* ── RECETAS SALVADOREÑAS ── */}
      <RecetasSalvadorenasSection />

      {/* ── MACROS PREVIEW ── */}
      <MacrosSection />

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-widest mb-3">Simple y rápido</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">¿Cómo funciona?</h2>
          </div>
          <div className="space-y-8">
            <StepCard delay={0} num="1" title="Ingresa los datos del paciente"
              desc="Peso, talla, edad, sexo y nivel de actividad física. El sistema calcula el peso ideal y el REE automáticamente." />
            <div className="w-px h-6 bg-black/10 ml-4" />
            <StepCard delay={0.1} num="2" title="Ajusta la distribución de macronutrientes"
              desc="Modifica los porcentajes de CHO, CHON y COOH según el objetivo nutricional del paciente (normal, hipocalórico, hiperproteico, etc.)." />
            <div className="w-px h-6 bg-black/10 ml-4" />
            <StepCard delay={0.2} num="3" title="Genera y personaliza el menú"
              desc="Selecciona la cantidad de días, excluye alimentos no deseados y obtén un menú completo basado en el método de intercambios con recetas salvadoreñas." />
            <div className="w-px h-6 bg-black/10 ml-4" />
            <StepCard delay={0.3} num="4" title="Exporta y comparte"
              desc="Descarga el plan en Excel o CSV para entregarlo al paciente con toda la información nutricional por tiempo de comida." />
          </div>
        </div>
      </section>

      {/* ── FOOD CATEGORIES ── */}
      <FoodCategoriesSection />

      {/* ── CTA ── */}
      <CTASection onStart={onStart} />

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0071e3] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">N</span>
            </div>
            <span className="text-sm font-semibold text-[#1d1d1f]">NutriCalc</span>
          </div>
          <p className="text-sm text-[#6e6e73]">
            Sistema de intercambios · Fórmula Harris-Benedict · 109 alimentos
          </p>
        </div>
      </footer>
    </div>
  )
}

// ── Menu Preview — datos reales de desayunos.js / almuerzos.js / cenas.js ───

const COLACIONES_PREVIEW = [
  {
    nombre: 'Fruta con Yogurt Natural',
    desc: 'Fresas frescas con yogurt natural sin azúcar y un puñadito de maní crudo.',
    totales: { CHO: 27, CHON: 8, COOH: 1, kcal: 151 },
    items: ['Fresas 1¼ taza', 'Yogurt natural 8 oz', 'Maní 10 unidades'],
  },
  {
    nombre: 'Galletas con Maní y Naranja',
    desc: 'Galletas saladas con maní tostado sin sal y una naranja fresca en gajos.',
    totales: { CHO: 30, CHON: 4, COOH: 5, kcal: 183 },
    items: ['Galletas saladas 3 unidades', 'Maní 10 unidades', 'Naranja 1 unidad'],
  },
  {
    nombre: 'Kiwi con Granola',
    desc: 'Kiwi en rodajas con granola casera y agua de coco natural. Colación refrescante.',
    totales: { CHO: 30, CHON: 3, COOH: 2, kcal: 151 },
    items: ['Kiwi 1 unidad', 'Granola ¼ taza', 'Agua de coco 1 taza'],
  },
]

function buildDay(label, di, ai, ci, coli) {
  const d  = DESAYUNOS[di]
  const a  = ALMUERZOS[ai]
  const c  = CENAS[ci]
  const col = COLACIONES_PREVIEW[coli]

  const mkMeal = (src, label, icon, color, bg) => ({
    label, icon, color, bg,
    nombre: src.nombre,
    desc:   src.descripcion,
    kcal:   src.totales.kcal,
    cho:    src.totales.CHO,
    chon:   src.totales.CHON,
    cooh:   src.totales.COOH,
    items:  src.alimentos.slice(0, 5).map(al => `${al.alimento} · ${al.cantidad}`),
  })

  const desayuno   = mkMeal(d,   'Desayuno',   '🌅', '#ff9f0a', 'bg-amber-50')
  const almuerzo   = mkMeal(a,   'Almuerzo',   '🍽️', '#0071e3', 'bg-blue-50')
  const cena       = mkMeal(c,   'Cena',        '🌙', '#5856d6', 'bg-purple-50')
  const colacion   = {
    label: 'Colaciones', icon: '🍎', color: '#30d158', bg: 'bg-green-50',
    nombre: col.nombre,
    desc:   col.desc,
    kcal:   col.totales.kcal,
    cho:    col.totales.CHO,
    chon:   col.totales.CHON,
    cooh:   col.totales.COOH,
    items:  col.items,
  }

  const meals = [desayuno, almuerzo, cena, colacion]
  return {
    label,
    total: {
      kcal: meals.reduce((s, m) => s + m.kcal, 0),
      cho:  meals.reduce((s, m) => s + m.cho,  0),
      chon: meals.reduce((s, m) => s + m.chon, 0),
      cooh: meals.reduce((s, m) => s + m.cooh, 0),
    },
    meals,
  }
}

// Días 1-3 de cada archivo (índices 0-2)
const PREVIEW_DAYS = [
  buildDay('Lunes',     0, 0, 0, 0),
  buildDay('Martes',    1, 1, 1, 1),
  buildDay('Miércoles', 2, 2, 2, 2),
]

function MacroChip({ label, value, color }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color }}>{label}</span>
      <span className="text-xs font-bold text-[#1d1d1f]">{value}g</span>
    </div>
  )
}

function MenuPreviewSection({ onStart }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeDay, setActiveDay] = useState(0)
  const [mode, setMode] = useState('recetas') // 'recetas' | 'intercambios'

  const day = PREVIEW_DAYS[activeDay]
  const meals = day.meals

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#30d158] uppercase tracking-widest mb-3">
            Vista previa
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
            Así se ve un plan real
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[#6e6e73] max-w-lg mx-auto">
            Menús balanceados con alimentos de tu entorno, con macronutrientes detallados por cada tiempo de comida.
          </motion.p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-3xl bg-white/80 backdrop-blur-sm border border-black/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Toolbar: day tabs + mode toggle */}
          <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.05] px-5 pt-4 pb-0">
            {/* Day tabs */}
            <div className="flex gap-0.5">
              {PREVIEW_DAYS.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setActiveDay(i)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium transition-colors relative',
                    activeDay === i ? 'text-[#0071e3]' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  )}
                >
                  {d.label}
                  {activeDay === i && (
                    <motion.div layoutId="day-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071e3] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mode toggle */}
            <div className="flex items-center mb-1.5 bg-black/[0.05] rounded-full p-0.5 gap-0.5">
              {[
                { key: 'intercambios', label: 'Intercambios', icon: '⚖️' },
                { key: 'recetas',      label: '🇸🇻 Recetas SV', icon: '' },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap',
                    mode === m.key
                      ? 'bg-white text-[#1d1d1f] shadow-sm'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  )}
                >
                  {m.icon && <span className="mr-1">{m.icon}</span>}
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily macro summary bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="px-5 py-3 bg-gradient-to-r from-[#f5f5f7] to-white/60 flex flex-wrap items-center gap-4 border-b border-black/[0.04]"
            >
              <span className="text-xs font-semibold text-[#6e6e73]">Total del día</span>
              <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm border border-black/[0.05]">
                <span className="text-xs font-bold text-[#1d1d1f]">{day.total.kcal.toLocaleString()}</span>
                <span className="text-[10px] text-[#6e6e73]">kcal</span>
              </div>
              <div className="h-3 w-px bg-black/10" />
              <MacroChip label="CHO" value={day.total.cho} color="#ff9f0a" />
              <MacroChip label="CHON" value={day.total.chon} color="#0071e3" />
              <MacroChip label="COOH" value={day.total.cooh} color="#30d158" />
              <div className="ml-auto flex gap-3">
                <span className="text-[10px] text-[#6e6e73]">
                  CHO {Math.round((day.total.cho * 4 / day.total.kcal) * 100)}% ·
                  CHON {Math.round((day.total.chon * 4 / day.total.kcal) * 100)}% ·
                  COOH {Math.round((day.total.cooh * 9 / day.total.kcal) * 100)}%
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Meal cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${mode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {meals.map((meal, i) => (
                <motion.div
                  key={meal.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={cn('rounded-2xl p-4 flex flex-col gap-3', meal.bg)}
                >
                  {/* Meal header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{meal.icon}</span>
                      <span className="text-xs font-semibold" style={{ color: meal.color }}>{meal.label}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#6e6e73] bg-white/70 px-1.5 py-0.5 rounded-full">
                      {meal.kcal} kcal
                    </span>
                  </div>

                  {/* Content */}
                  {mode === 'recetas' ? (
                    <div>
                      <p className="text-xs font-semibold text-[#1d1d1f] mb-1">{meal.nombre}</p>
                      <p className="text-[11px] text-[#6e6e73] leading-relaxed">{meal.desc}</p>
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {meal.items.map((item) => (
                        <li key={item} className="text-[11px] text-[#1d1d1f] flex items-start gap-1.5">
                          <span className="mt-0.5 text-[8px]" style={{ color: meal.color }}>●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Macro chips */}
                  <div className="flex gap-2 pt-1 border-t border-black/[0.06]">
                    {[
                      { l: 'CHO',  v: meal.cho,  c: '#ff9f0a' },
                      { l: 'CHON', v: meal.chon, c: '#0071e3' },
                      { l: 'COOH', v: meal.cooh, c: '#30d158' },
                    ].map(({ l, v, c }) => (
                      <div key={l} className="flex flex-col items-center flex-1">
                        <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: c }}>{l}</span>
                        <span className="text-[11px] font-semibold text-[#1d1d1f]">{v}g</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="px-5 pb-5 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStart}
              className="text-sm font-medium text-[#0071e3] hover:underline"
            >
              Generar mi plan personalizado →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Salvadoran Recipes Section ───────────────────────────────────────────────

// Iconos por tipo de proteína principal (heurística rápida sobre el nombre)
function iconForReceta(nombre) {
  const n = nombre.toLowerCase()
  if (n.includes('res') || n.includes('carne') || n.includes('casamiento')) return '🥩'
  if (n.includes('pollo') || n.includes('gallina'))                          return '🍗'
  if (n.includes('pescado') || n.includes('atún'))                           return '🐟'
  if (n.includes('pupusa'))                                                  return '🫓'
  if (n.includes('huevo') || n.includes('omelette'))                         return '🍳'
  if (n.includes('pasta'))                                                   return '🍝'
  if (n.includes('avena') || n.includes('cereal') || n.includes('pancake'))  return '🥣'
  if (n.includes('sopa'))                                                    return '🍲'
  return '🍽️'
}

function RecetasSalvadorenasSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // 2 desayunos + 2 almuerzos + 2 cenas reales de los archivos
  const recetas = [
    { src: DESAYUNOS[0], tiempo: 'Desayuno',    tipo: 'Típico · Tortillas + huevo + frijoles' },
    { src: DESAYUNOS[4], tiempo: 'Desayuno',    tipo: 'Tortillas con crema y queso' },
    { src: ALMUERZOS[0], tiempo: 'Almuerzo',    tipo: 'Plato fuerte · Sopa tradicional' },
    { src: ALMUERZOS[3], tiempo: 'Almuerzo',    tipo: 'Carne asada · Casamiento SV' },
    { src: CENAS[4],     tiempo: 'Cena',        tipo: 'Cena especial · Pupusas' },
    { src: CENAS[5],     tiempo: 'Cena',        tipo: 'Sopa ligera reconfortante' },
  ]

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-white/40 to-[#f5f5f7]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="mb-14"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-4 py-1.5 rounded-full">
              🇸🇻 Modo Recetas Salvadoreñas
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight text-center mb-5">
            Recetas realistas y alcanzables{' '}
            <span className="bg-gradient-to-r from-[#0071e3] to-[#30d158] bg-clip-text text-transparent">
              para los salvadoreños
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#6e6e73] text-lg leading-relaxed text-center max-w-2xl mx-auto">
            No diseñamos menús para revistas. Creamos planes que se cocinan en casa, con ingredientes del mercado local,
            respetando los sabores, el presupuesto y los hábitos alimenticios de las familias salvadoreñas.
          </motion.p>

          {/* Pillars */}
          <motion.div variants={stagger} className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: '🏪', text: 'Ingredientes del mercado local' },
              { icon: '💰', text: 'Accesible económicamente' },
              { icon: '👨‍👩‍👧', text: 'Adaptado a la familia salvadoreña' },
              { icon: '🌿', text: 'Alimentos de temporada' },
              { icon: '⏱️', text: 'Preparación rápida y práctica' },
            ].map((p) => (
              <motion.div
                key={p.text}
                variants={scaleIn}
                className="flex items-center gap-2 bg-white border border-black/[0.06] shadow-sm text-sm text-[#1d1d1f] px-4 py-2 rounded-full"
              >
                <span>{p.icon}</span>
                <span>{p.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Recipe cards grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {recetas.map((r) => (
            <motion.div
              key={r.src.nombre}
              variants={scaleIn}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">
                  {iconForReceta(r.src.nombre)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#1d1d1f] text-sm leading-tight mb-1">{r.src.nombre}</p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded-full">{r.tiempo}</span>
                    <span className="text-[10px] text-[#6e6e73] bg-black/5 px-2 py-0.5 rounded-full">{r.tipo}</span>
                  </div>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">{r.src.descripcion}</p>
                  {/* Macros de la receta real */}
                  <div className="flex gap-3 mt-2 pt-2 border-t border-black/[0.05]">
                    {[
                      { l: 'CHO',  v: r.src.totales.CHO,  c: '#ff9f0a' },
                      { l: 'CHON', v: r.src.totales.CHON, c: '#0071e3' },
                      { l: 'COOH', v: r.src.totales.COOH, c: '#30d158' },
                      { l: 'kcal', v: r.src.totales.kcal, c: '#6e6e73' },
                    ].map(({ l, v, c }) => (
                      <div key={l} className="flex flex-col items-center">
                        <span className="text-[9px] font-bold uppercase" style={{ color: c }}>{l}</span>
                        <span className="text-[10px] font-semibold text-[#1d1d1f]">{v}{l !== 'kcal' ? 'g' : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/60 p-6 text-center"
        >
          <p className="text-sm font-medium text-[#1d1d1f] leading-relaxed max-w-xl mx-auto">
            "Cada receta está pensada para que el paciente pueda prepararla sin complicaciones,
            usando lo que ya conoce, sin sacrificar el balance nutricional que necesita."
          </p>
          <p className="mt-2 text-xs text-[#6e6e73]">— Principio del sistema de Recetas Salvadoreñas</p>
        </motion.div>
      </div>
    </section>
  )
}

// ── Macros Section ───────────────────────────────────────────────────────────

function MacrosSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white/20 to-white/60">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#ff9f0a] uppercase tracking-widest mb-3">Macronutrientes</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4">
            Distribución precisa de cada macronutriente
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6e6e73] leading-relaxed mb-6">
            El sistema calcula automáticamente gramos de carbohidratos, proteínas y grasas según el porcentaje calórico que definas, con ajuste fino para cada paciente.
          </motion.p>
          <motion.div variants={fadeUp} className="space-y-1.5">
            {[
              { text: '50–60% Carbohidratos (base energética)', icon: '🌾' },
              { text: '15–20% Proteínas (mantenimiento muscular)', icon: '🥩' },
              { text: '25–30% Grasas (hormonas y absorción)', icon: '🫒' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-[#6e6e73]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual card */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.34, 1.1, 0.64, 1] }}
            className="rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs text-[#6e6e73]">Paciente</p>
                <p className="font-semibold text-[#1d1d1f]">Carlos López</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6e6e73]">Total diario</p>
                <p className="text-xl font-bold text-[#0071e3]">2,200 kcal</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <MacroBar label="Carbohidratos (55%)" value={303} max={500} color="#ff9f0a" />
              <MacroBar label="Proteínas (17%)" value={94} max={500} color="#0071e3" />
              <MacroBar label="Grasas (28%)" value={68} max={500} color="#30d158" />
            </div>

            {/* Donut-like visual */}
            <div className="flex items-center justify-center gap-6">
              {[
                { label: 'CHO', pct: '55%', color: '#ff9f0a', grams: '303g' },
                { label: 'CHON', pct: '17%', color: '#0071e3', grams: '94g' },
                { label: 'COOH', pct: '28%', color: '#30d158', grams: '68g' },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1"
                    style={{ background: `conic-gradient(${m.color} 0%, ${m.color} ${m.pct}, #f0f0f0 ${m.pct})` }}>
                  </div>
                  <p className="text-xs font-semibold text-[#1d1d1f]">{m.pct}</p>
                  <p className="text-[10px] text-[#6e6e73]">{m.label} · {m.grams}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Food Categories Section ──────────────────────────────────────────────────

function FoodCategoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#5856d6] uppercase tracking-widest mb-3">Base de datos</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-8">
            109 alimentos en 6 categorías
          </motion.h2>
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
            {FOOD_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -2 }}
                className={cn(
                  'flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-sm font-medium cursor-default',
                  cat.color
                )}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="bg-black/10 text-xs px-1.5 py-0.5 rounded-full font-semibold">{cat.count}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── CTA Section ──────────────────────────────────────────────────────────────

function CTASection({ onStart }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3] via-[#0071e3] to-[#5856d6]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

          <div className="relative px-8 py-14 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 text-3xl"
            >
              🥗
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Empieza en menos de un minuto
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Sin registros, sin suscripciones. Solo ingresa los datos del paciente y obtén su plan personalizado al instante.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStart}
              className="bg-white text-[#0071e3] font-bold px-8 py-4 rounded-full text-base shadow-xl shadow-black/20 hover:shadow-2xl transition-shadow"
            >
              Calcular plan nutricional →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
