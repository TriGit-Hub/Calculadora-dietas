import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from './components/LandingPage'
import FormularioEntrada from './components/FormularioEntrada'
import PanelResultados from './components/PanelResultados'
import { realizarCalculosCompletos } from './utils/calculosNutricionales'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
}

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'form' | 'results'
  const [resultados, setResultados] = useState(null)
  const [savedForm, setSavedForm] = useState(null)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  const toggleDark = () => {
    setDarkMode(prev => {
      const next = !prev
      localStorage.setItem('darkMode', String(next))
      return next
    })
  }

  const handleStart = () => setView('form')

  const handleCalcular = (datos, rawForm) => {
    setSavedForm(rawForm)
    setResultados(realizarCalculosCompletos(datos))
    setView('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleVolver = () => {
    setView('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoHome = () => {
    setView('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen bg-[#f5f5f7] dark:bg-gray-950 ${darkMode ? 'dark' : ''}`}>
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" {...pageTransition}>
            <LandingPage onStart={handleStart} />
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div key="form" {...pageTransition}>
            {/* Back to landing link */}
            <div className="px-6 pt-4">
              <button
                onClick={handleGoHome}
                className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] flex items-center gap-1 transition-colors"
              >
                ← Inicio
              </button>
            </div>
            <FormularioEntrada onCalcular={handleCalcular} initialData={savedForm} darkMode={darkMode} onToggleDark={toggleDark} />
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div key="results" {...pageTransition}>
            <PanelResultados resultados={resultados} onVolver={handleVolver} darkMode={darkMode} onToggleDark={toggleDark} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
