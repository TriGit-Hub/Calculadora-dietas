import ResumenPersonal from './ResumenPersonal'
import AnalisisAntropometrico from './AnalisisAntropometrico'
import RequerimientosEnergeticos from './RequerimientosEnergeticos'
import DistribucionMacros from './DistribucionMacros'
import TablaIntercambios from './TablaIntercambios'
import Interpretaciones from './Interpretaciones'
import GeneradorMenu from './GeneradorMenu'

export default function PanelResultados({ resultados, onVolver, darkMode, onToggleDark }) {
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 no-print">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onVolver}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-apple-dark dark:text-gray-100 transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-base font-semibold text-apple-dark dark:text-gray-100 leading-tight">Plan Nutricional</h1>
              <p className="text-xs text-apple-mid dark:text-gray-400">{resultados.datosGenerales.nombre}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-apple-dark dark:text-gray-100 transition-colors text-base"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-apple-blue hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              🖨️ Imprimir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-600 text-sm font-medium px-4 py-2 rounded-full mb-3">
            ✓ Plan calculado exitosamente
          </div>
          <h2 className="text-2xl font-bold text-apple-dark dark:text-gray-100">
            Plan para {resultados.datosGenerales.nombre}
          </h2>
          <p className="text-apple-mid dark:text-gray-400 text-sm mt-1">
            {resultados.requerimientosEnergeticos.REE_seleccionado.toFixed(0)} kcal/día · {resultados.datosGenerales.sexo === 'FEMENINO' ? 'Femenino' : 'Masculino'} · {resultados.datosGenerales.edad} años
          </p>
        </div>

        <ResumenPersonal datos={resultados.datosGenerales} />
        <AnalisisAntropometrico datos={resultados} />
        <RequerimientosEnergeticos datos={resultados} />
        <DistribucionMacros datos={resultados} />
        <TablaIntercambios datos={resultados} />
        <Interpretaciones datos={resultados} />
        <GeneradorMenu listaIntercambios={resultados.listaIntercambios} />

        <button
          onClick={onVolver}
          className="no-print w-full border-2 border-apple-blue text-apple-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3.5 rounded-2xl transition-colors text-sm"
        >
          ← Nuevo cálculo
        </button>
      </div>
    </div>
  )
}
