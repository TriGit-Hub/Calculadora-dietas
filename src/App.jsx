import { useState } from 'react'
import FormularioEntrada from './components/FormularioEntrada'
import PanelResultados from './components/PanelResultados'
import { realizarCalculosCompletos } from './utils/calculosNutricionales'

export default function App() {
  const [resultados, setResultados] = useState(null)
  const [savedForm, setSavedForm] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const toggleDark = () => {
    setDarkMode(prev => {
      const next = !prev
      localStorage.setItem('darkMode', String(next))
      return next
    })
  }

  const handleCalcular = (datos, rawForm) => {
    setSavedForm(rawForm)
    const r = realizarCalculosCompletos(datos)
    setResultados(r)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleVolver = () => {
    setResultados(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen bg-[#f5f5f7] dark:bg-gray-950 ${darkMode ? 'dark' : ''}`}>
      {!resultados ? (
        <FormularioEntrada onCalcular={handleCalcular} initialData={savedForm} darkMode={darkMode} onToggleDark={toggleDark} />
      ) : (
        <PanelResultados resultados={resultados} onVolver={handleVolver} darkMode={darkMode} onToggleDark={toggleDark} />
      )}
    </div>
  )
}
