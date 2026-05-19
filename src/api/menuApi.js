const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export async function crearMenuAPI(intercambiosRequeridos, distribucionComidas, opciones = {}) {
  const response = await fetch(`${BACKEND_URL}/api/nutricion/crear-menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intercambiosRequeridos,
      distribucionComidas,
      opciones: { numDias: opciones.numDias ?? 1, excluirAlimentos: opciones.excluirAlimentos ?? [] },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `Error ${response.status}`)
  }

  const { data } = await response.json()
  return data.menus
}

export async function healthCheck() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`)
    return response.ok
  } catch {
    return false
  }
}
