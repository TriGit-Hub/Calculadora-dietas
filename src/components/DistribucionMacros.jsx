function MacroBar({ label, porcentaje, color }) {
  const colors = {
    blue: 'bg-blue-400',
    green: 'bg-green-400',
    amber: 'bg-amber-400',
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-apple-mid dark:text-gray-400 w-16 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
        <div className={`h-2 rounded-full ${colors[color]}`} style={{ width: `${porcentaje}%` }} />
      </div>
      <span className="text-xs font-semibold text-apple-dark dark:text-gray-100 w-8 text-right">{porcentaje}%</span>
    </div>
  )
}

export default function DistribucionMacros({ datos }) {
  const { distribucionNutrientes, datosGenerales } = datos
  const { sexo } = datosGenerales
  const d = distribucionNutrientes

  const fmt = (n) => n.toFixed(2)
  const fmtKcal = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const macros = [
    { key: 'CHO', label: 'Carbohidratos', abbr: 'CHO', color: 'blue', pct: d.porcentajeCHO, gF: d.CHO_gramos_femenino, gM: d.CHO_gramos_masculino, gS: d.CHO_gramos_seleccionado, kF: d.CHO_kcal_femenino, kM: d.CHO_kcal_masculino },
    { key: 'CHON', label: 'Proteínas', abbr: 'CHON', color: 'green', pct: d.porcentajeCHON, gF: d.CHON_gramos_femenino, gM: d.CHON_gramos_masculino, gS: d.CHON_gramos_seleccionado, kF: d.CHON_kcal_femenino, kM: d.CHON_kcal_masculino },
    { key: 'COOH', label: 'Grasas', abbr: 'COOH', color: 'amber', pct: d.porcentajeCOOH, gF: d.COOH_gramos_femenino, gM: d.COOH_gramos_masculino, gS: d.COOH_gramos_seleccionado, kF: d.COOH_kcal_femenino, kM: d.COOH_kcal_masculino },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-4 flex items-center gap-2">
        <span>⚖️</span> Distribución de Macronutrientes
      </h3>

      <div className="flex flex-col gap-2 mb-6">
        <MacroBar label="Carbohidratos" porcentaje={d.porcentajeCHO} color="blue" />
        <MacroBar label="Proteínas" porcentaje={d.porcentajeCHON} color="green" />
        <MacroBar label="Grasas" porcentaje={d.porcentajeCOOH} color="amber" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-apple-mid dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
              <th className="text-left pb-2 font-medium">Nutriente</th>
              <th className="text-right pb-2 font-medium">Femenino</th>
              <th className="text-right pb-2 font-medium">Masculino</th>
              <th className={`text-right pb-2 font-medium ${sexo === 'MASCULINO' ? 'text-apple-blue' : 'text-apple-mid dark:text-gray-400'}`}>
                {sexo === 'MASCULINO' ? '★ Masc.' : 'Masc.'}
              </th>
            </tr>
          </thead>
          <tbody>
            {macros.map(m => (
              <tr key={m.key} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                <td className="py-2.5">
                  <span className="font-medium text-apple-dark dark:text-gray-100">{m.abbr}</span>
                  <span className="text-xs text-apple-mid dark:text-gray-400 ml-1">({m.pct}%)</span>
                </td>
                <td className="text-right py-2.5 text-apple-mid dark:text-gray-400">
                  <div>{fmt(m.gF)} g</div>
                  <div className="text-xs">{fmtKcal(m.kF)} kcal</div>
                </td>
                <td className="text-right py-2.5 text-apple-mid dark:text-gray-400">
                  <div>{fmt(m.gM)} g</div>
                  <div className="text-xs">{fmtKcal(m.kM)} kcal</div>
                </td>
                <td className={`text-right py-2.5 ${sexo === 'MASCULINO' ? 'text-apple-blue font-semibold' : 'text-apple-mid dark:text-gray-400'}`}>
                  <div>{fmt(m.gS)} g</div>
                  <div className="text-xs font-normal">{fmtKcal(sexo === 'MASCULINO' ? m.kM : m.kF)} kcal</div>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 dark:bg-gray-700 rounded-xl">
              <td className="py-2.5 px-1 font-semibold text-apple-dark dark:text-gray-100 rounded-l-xl">Total</td>
              <td className="text-right py-2.5 text-apple-mid dark:text-gray-400">{fmtKcal(datos.requerimientosEnergeticos.REE_femenino)} kcal</td>
              <td className="text-right py-2.5 text-apple-mid dark:text-gray-400">{fmtKcal(datos.requerimientosEnergeticos.REE_masculino)} kcal</td>
              <td className={`text-right py-2.5 rounded-r-xl font-semibold ${sexo === 'MASCULINO' ? 'text-apple-blue' : 'text-apple-mid dark:text-gray-400'}`}>{fmtKcal(datos.requerimientosEnergeticos.REE_seleccionado)} kcal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
