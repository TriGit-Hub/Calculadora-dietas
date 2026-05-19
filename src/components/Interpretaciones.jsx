function Alert({ tipo, children }) {
  const styles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-400',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400',
    danger:  'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-400',
    info:    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400',
  }
  const icons = { success: '✓', warning: '⚠️', danger: '🔴', info: 'ℹ️' }
  return (
    <div className={`flex items-start gap-2.5 px-4 py-3 rounded-xl border text-sm ${styles[tipo]}`}>
      <span className="flex-shrink-0 mt-0.5">{icons[tipo]}</span>
      <span>{children}</span>
    </div>
  )
}

export default function Interpretaciones({ datos }) {
  const { distribucionNutrientes, totalesIntercambios, margenError, requerimientosEnergeticos, datosGenerales, calculosAntropometricos } = datos
  const alerts = []

  const objetivo = {
    CHO:  distribucionNutrientes.CHO_gramos_seleccionado,
    CHON: distribucionNutrientes.CHON_gramos_seleccionado,
    COOH: distribucionNutrientes.COOH_gramos_seleccionado,
    KCAL: requerimientosEnergeticos.REE_seleccionado,
  }

  const diffCHO  = Math.abs(totalesIntercambios.CHO  - objetivo.CHO)
  const diffCHON = Math.abs(totalesIntercambios.CHON - objetivo.CHON)
  const diffCOOH = Math.abs(totalesIntercambios.COOH - objetivo.COOH)
  const diffKCAL = Math.abs(totalesIntercambios.KCAL - objetivo.KCAL)

  const todosOk = diffCHO <= margenError.CHO && diffCHON <= margenError.CHON && diffCOOH <= margenError.COOH && diffKCAL <= margenError.KCAL

  if (todosOk) {
    alerts.push({ tipo: 'success', msg: 'El plan está dentro del margen de error aceptable en todos los macronutrientes.' })
  }
  if (diffCHO > margenError.CHO) {
    const dir = totalesIntercambios.CHO > objetivo.CHO ? 'excede' : 'no alcanza'
    alerts.push({ tipo: 'warning', msg: `Los carbohidratos del plan ${dir} el objetivo por ${diffCHO.toFixed(0)} g (margen: ±${margenError.CHO} g). Ajusta los intercambios de cereales, frutas o vegetales.` })
  }
  if (diffCHON > margenError.CHON) {
    alerts.push({ tipo: 'warning', msg: `Las proteínas difieren del objetivo por ${diffCHON.toFixed(0)} g (margen: ±${margenError.CHON} g). Considera ajustar las carnes.` })
  }
  if (diffCOOH > margenError.COOH) {
    alerts.push({ tipo: 'warning', msg: `Las grasas difieren del objetivo por ${diffCOOH.toFixed(0)} g (margen: ±${margenError.COOH} g). Ajusta los intercambios de grasas o carnes.` })
  }

  const imc = calculosAntropometricos.IMC
  if (imc >= 40) {
    alerts.push({ tipo: 'danger', msg: 'Obesidad Grado III detectada. Se recomienda consulta médica especializada antes de iniciar cualquier plan.' })
  } else if (imc >= 30) {
    alerts.push({ tipo: 'warning', msg: `IMC ${imc.toFixed(1)} indica Obesidad. Considera un déficit calórico moderado con supervisión profesional.` })
  } else if (imc >= 25) {
    alerts.push({ tipo: 'info', msg: `IMC ${imc.toFixed(1)} indica Sobrepeso. Un déficit calórico moderado y mayor actividad física pueden ayudar.` })
  }

  const gv = datosGenerales.grasaVisceral
  if (gv >= 15) {
    alerts.push({ tipo: 'danger', msg: 'Grasa visceral MUY ALTA (≥15). Riesgo cardiovascular y metabólico elevado. Prioriza ejercicio cardiovascular y reducción de carbohidratos refinados.' })
  } else if (gv >= 10) {
    alerts.push({ tipo: 'warning', msg: 'Grasa visceral ALTA. Se recomienda ejercicio cardiovascular regular y monitoreo periódico.' })
  }

  const intMus = datosGenerales.interpretacionMusculo
  if (intMus && intMus.nivel === 'bajo') {
    alerts.push({ tipo: 'info', msg: 'Porcentaje de músculo BAJO para tu grupo. Considera aumentar el entrenamiento de fuerza y asegurar un aporte adecuado de proteínas.' })
  }

  const intGrasa = datosGenerales.interpretacionGrasa
  if (intGrasa && (intGrasa.nivel === 'muy_alto' || intGrasa.nivel === 'alto')) {
    alerts.push({ tipo: 'warning', msg: `Porcentaje de grasa corporal ${intGrasa.texto}. Un déficit calórico moderado combinado con ejercicio regular es clave.` })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-4 flex items-center gap-2">
        <span>💡</span> Interpretación y Recomendaciones
      </h3>
      <div className="flex flex-col gap-2.5">
        {alerts.map((a, i) => (
          <Alert key={i} tipo={a.tipo}>{a.msg}</Alert>
        ))}
        {alerts.length === 0 && (
          <Alert tipo="success">Todos los valores se encuentran dentro de los rangos aceptables.</Alert>
        )}
      </div>
    </div>
  )
}
