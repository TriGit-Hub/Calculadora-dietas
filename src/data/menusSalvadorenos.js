// 21 menús salvadoreños predefinidos compuestos desde archivos separados
import { DESAYUNOS } from './desayunos'
import { ALMUERZOS } from './almuerzos'
import { CENAS } from './cenas'

export { DESAYUNOS, ALMUERZOS, CENAS }

export const MENUS_SALVADORENOS = DESAYUNOS.map((desayuno, i) => ({
  dia: desayuno.dia,
  desayuno,
  almuerzo: ALMUERZOS[i],
  cena: CENAS[i],
}))

export function getTotalesDia(menuDia) {
  const sumar = (campo) =>
    menuDia.desayuno.totales[campo] +
    menuDia.almuerzo.totales[campo] +
    menuDia.cena.totales[campo]

  return {
    CHO:  sumar('CHO'),
    CHON: sumar('CHON'),
    COOH: sumar('COOH'),
    kcal: sumar('kcal'),
  }
}
