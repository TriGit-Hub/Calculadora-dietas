import { TABLA_INTERCAMBIOS, ORDEN_INTERCAMBIOS } from '../utils/calculosNutricionales'

function DiffBadge({ diff, margen }) {
  const abs = Math.abs(diff)
  const ok = abs <= margen
  const sign = diff > 0 ? '+' : ''
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ok ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'}`}>
      {sign}{diff.toFixed(0)}
    </span>
  )
}

export default function TablaIntercambios({ datos }) {
  const { listaIntercambios, totalesIntercambios, distribucionNutrientes, margenError, requerimientosEnergeticos } = datos

  const objetivo = {
    CHO: distribucionNutrientes.CHO_gramos_seleccionado,
    CHON: distribucionNutrientes.CHON_gramos_seleccionado,
    COOH: distribucionNutrientes.COOH_gramos_seleccionado,
    KCAL: requerimientosEnergeticos.REE_seleccionado,
  }

  const diferencia = {
    CHO: totalesIntercambios.CHO - objetivo.CHO,
    CHON: totalesIntercambios.CHON - objetivo.CHON,
    COOH: totalesIntercambios.COOH - objetivo.COOH,
    KCAL: totalesIntercambios.KCAL - objetivo.KCAL,
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-1 flex items-center gap-2">
        <span>🍽️</span> Plan de Intercambios de Alimentos
      </h3>
      <p className="text-xs text-apple-mid dark:text-gray-400 mb-4">Los cereales se calcularon automáticamente para cubrir el objetivo de carbohidratos.</p>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="text-xs text-apple-mid dark:text-gray-400 font-medium border-b-2 border-gray-100 dark:border-gray-700">
              <th className="text-left pb-3 font-medium">Alimento</th>
              <th className="text-center pb-3 font-medium w-14">Porc.</th>
              <th className="text-right pb-3 font-medium w-16">CHO (g)</th>
              <th className="text-right pb-3 font-medium w-16">CHON (g)</th>
              <th className="text-right pb-3 font-medium w-16">COOH (g)</th>
              <th className="text-right pb-3 font-medium w-16">kcal</th>
            </tr>
          </thead>
          <tbody>
            {ORDEN_INTERCAMBIOS.map(key => {
              const cantidad = listaIntercambios[key] || 0
              const tabla = TABLA_INTERCAMBIOS[key]
              const esCereal = key === 'cereales'
              return (
                <tr key={key} className={`border-b border-gray-50 dark:border-gray-700/50 last:border-0 ${esCereal ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                  <td className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`${esCereal ? 'text-apple-blue font-semibold' : 'text-apple-dark dark:text-gray-100'}`}>{tabla.nombre}</span>
                      {esCereal && <span className="text-[10px] bg-apple-blue text-white px-1.5 py-0.5 rounded-full font-medium">AUTO</span>}
                    </div>
                  </td>
                  <td className={`text-center py-2.5 font-bold ${esCereal ? 'text-apple-blue' : 'text-apple-dark dark:text-gray-100'}`}>{cantidad}</td>
                  <td className="text-right py-2.5 text-apple-dark dark:text-gray-100">{(cantidad * tabla.CHO_por_porcion) || 0}</td>
                  <td className="text-right py-2.5 text-apple-dark dark:text-gray-100">{(cantidad * tabla.CHON_por_porcion) || 0}</td>
                  <td className="text-right py-2.5 text-apple-dark dark:text-gray-100">{(cantidad * tabla.COOH_por_porcion) || 0}</td>
                  <td className="text-right py-2.5 text-apple-dark dark:text-gray-100">{(cantidad * tabla.KCAL_por_porcion) || 0}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 dark:border-gray-600 font-semibold text-apple-dark dark:text-gray-100 bg-gray-50 dark:bg-gray-700">
              <td className="py-3 font-bold">TOTAL</td>
              <td />
              <td className="text-right py-3">{totalesIntercambios.CHO}</td>
              <td className="text-right py-3">{totalesIntercambios.CHON}</td>
              <td className="text-right py-3">{totalesIntercambios.COOH}</td>
              <td className="text-right py-3">{totalesIntercambios.KCAL.toLocaleString('es-ES')}</td>
            </tr>
            <tr className="text-apple-mid dark:text-gray-400">
              <td className="py-1.5 text-xs">OBJETIVO</td>
              <td />
              <td className="text-right py-1.5 text-xs">{objetivo.CHO.toFixed(0)}</td>
              <td className="text-right py-1.5 text-xs">{objetivo.CHON.toFixed(0)}</td>
              <td className="text-right py-1.5 text-xs">{objetivo.COOH.toFixed(0)}</td>
              <td className="text-right py-1.5 text-xs">{objetivo.KCAL.toFixed(0)}</td>
            </tr>
            <tr>
              <td className="py-1.5 text-xs text-apple-mid dark:text-gray-400">MARGEN ±</td>
              <td />
              <td className="text-right py-1.5 text-xs text-apple-mid dark:text-gray-400">{margenError.CHO}</td>
              <td className="text-right py-1.5 text-xs text-apple-mid dark:text-gray-400">{margenError.CHON}</td>
              <td className="text-right py-1.5 text-xs text-apple-mid dark:text-gray-400">{margenError.COOH}</td>
              <td className="text-right py-1.5 text-xs text-apple-mid dark:text-gray-400">{margenError.KCAL}</td>
            </tr>
            <tr className="border-t border-gray-100 dark:border-gray-700">
              <td className="py-2 text-xs font-medium text-apple-mid dark:text-gray-400">DIFERENCIA</td>
              <td />
              <td className="text-right py-2"><DiffBadge diff={diferencia.CHO} margen={margenError.CHO} /></td>
              <td className="text-right py-2"><DiffBadge diff={diferencia.CHON} margen={margenError.CHON} /></td>
              <td className="text-right py-2"><DiffBadge diff={diferencia.COOH} margen={margenError.COOH} /></td>
              <td className="text-right py-2"><DiffBadge diff={diferencia.KCAL} margen={margenError.KCAL} /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
