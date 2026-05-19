const FACTORES_LABEL = {
  1.2: 'Sedentario', 1.4: 'Ligeramente activo', 1.6: 'Moderadamente activo',
  1.8: 'Muy activo', 2.0: 'Extremadamente activo',
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
      <span className="text-sm text-apple-mid dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-apple-dark dark:text-gray-100">{value}</span>
    </div>
  )
}

export default function ResumenPersonal({ datos }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-apple p-6 print-card">
      <h3 className="text-base font-semibold text-apple-dark dark:text-gray-100 mb-4 flex items-center gap-2">
        <span>👤</span> Datos Generales
      </h3>
      <Row label="Nombre" value={datos.nombre} />
      <Row label="Edad" value={`${datos.edad} años`} />
      <Row label="Sexo" value={datos.sexo === 'MASCULINO' ? '♂ Masculino' : '♀ Femenino'} />
      <Row label="Peso actual" value={`${datos.pesoActual} kg`} />
      <Row label="Talla" value={`${datos.talla} m (${datos.tallaCM.toFixed(0)} cm)`} />
      <Row label="Factor de actividad" value={`${datos.factorActividadFisica} — ${FACTORES_LABEL[datos.factorActividadFisica] || ''}`} />
    </div>
  )
}
