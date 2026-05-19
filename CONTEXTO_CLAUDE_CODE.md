# CONTEXTO_CLAUDE_CODE.md
# Calculadora de Dietas — Base de conocimiento para Claude Code

## Descripción del Proyecto

App React frontend-only (Vite + React + Tailwind CSS) para calcular requerimientos nutricionales
usando la fórmula Harris-Benedict y generar menús personalizados por el **método de intercambios**.

No hay backend API separado. Toda la lógica de menús vive en `src/utils/alimentos.js`.

---

## Sistema de Intercambios

### Valores nutricionales por porción (1 intercambio)

| Categoría           | CHO (g) | CHON (g) | COOH (g) | kcal |
|---------------------|---------|----------|----------|------|
| Leche Entera        | 12      | 8        | 8        | 150  |
| Leche Semidescremada| 12      | 8        | 5        | 120  |
| Leche Descremada    | 12      | 8        | 0        | 100  |
| Vegetales           | 5       | 2        | 0        | 25   |
| Frutas              | 15      | 0        | 0        | 60   |
| Cereales            | 15      | 2        | 1        | 80   |
| Carnes Magras       | 0       | 7        | 3        | 55   |
| Carnes Semigrasas   | 0       | 7        | 5        | 75   |
| Carnes Grasas       | 0       | 7        | 8        | 100  |
| Grasas              | 0       | 0        | 5        | 45   |

**Nota**: CHO=carbohidratos, CHON=proteínas, COOH=grasas/lípidos

---

## Base de Datos de Alimentos (109 alimentos)

### LECHE ENTERA (1 alimento)
| ID                  | Nombre               | Cantidad  | CHO | CHON | COOH | kcal |
|---------------------|----------------------|-----------|-----|------|------|------|
| leche_entera_fluida | Leche Fluida Entera  | 1 taza    | 12  | 8    | 8    | 150  |

### LECHE SEMIDESCREMADA (2 alimentos)
| ID                | Nombre               | Cantidad | CHO | CHON | COOH | kcal |
|-------------------|----------------------|----------|-----|------|------|------|
| yogurt_natural    | Yogurt Natural       | 8 oz     | 12  | 8    | 5    | 120  |
| leche_semi_fluida | Leche Semidescremada | 1 taza   | 12  | 8    | 5    | 120  |

### LECHE DESCREMADA (2 alimentos)
| ID               | Nombre                    | Cantidad | CHO | CHON | COOH | kcal |
|------------------|---------------------------|----------|-----|------|------|------|
| leche_polvo_desc | Leche en Polvo Descremada | 4 cdas   | 12  | 8    | 0    | 100  |
| leche_fluida_desc| Leche Fluida Descremada   | 1 taza   | 12  | 8    | 0    | 100  |

### VEGETALES (24 alimentos)
Todos: CHO=5g, CHON=2g, COOH=0g, kcal=25 — Cantidad: 1 taza (salvo excepciones)

| ID                | Nombre                | Cantidad |
|-------------------|-----------------------|----------|
| zanahoria_cocida  | Zanahoria Cocida      | 1 taza   |
| brocoli_cocido    | Brócoli Cocido        | 1 taza   |
| guisquil_cocido   | Güisquil Cocido       | 1 taza   |
| ejotes_cocidos    | Ejotes Cocidos        | 1 taza   |
| ayote_cocido      | Ayote Cocido          | 1 taza   |
| coliflor_cocida   | Coliflor Cocida       | 1 taza   |
| berenjena_cocida  | Berenjena Cocida      | 1 taza   |
| piptanes_cocidos  | Piptanes Cocidos      | 1 taza   |
| espinaca_cocida   | Espinaca Cocida       | 1 taza   |
| repollo_cocido    | Repollo Cocido        | 1 taza   |
| zuquini_cocido    | Zuquini Cocido        | 1 taza   |
| tomate_crudo      | Tomate Crudo          | 1 taza   |
| remolacha_cruda   | Remolacha Cruda       | 1 taza   |
| lechuga_cruda     | Lechuga Cruda         | 1 taza   |
| apio_crudo        | Apio Crudo            | 1 taza   |
| pepino_crudo      | Pepino Crudo          | 1 taza   |
| zanahoria_cruda   | Zanahoria Cruda       | 1 taza   |
| rabano_crudo      | Rábano Crudo          | 1 taza   |
| cebolla_cruda     | Cebolla Cruda         | 1 taza   |
| palmito_crudo     | Palmito Crudo         | 1 taza   |
| acelga_cruda      | Acelga Cruda          | 1 taza   |
| jugo_vegetales    | Jugo de Vegetales     | ½ taza   |
| chile_dulce       | Chile Dulce/Pimiento  | 1 taza   |
| chipilin_cocido   | Chipilín Cocido       | 1 taza   |

### FRUTAS (28 alimentos)
Todos: CHO=15g, CHON=0g, COOH=0g, kcal=60

| ID              | Nombre              | Cantidad      |
|-----------------|---------------------|---------------|
| manzana         | Manzana             | 1 unidad      |
| guineo          | Guineo              | ½ unidad      |
| melon           | Melón               | 1 taza        |
| uvas            | Uvas                | 17 unidades   |
| mango_maduro    | Mango Maduro        | ½ unidad      |
| naranja         | Naranja             | 1 unidad      |
| ciruela         | Ciruela             | 2 unidades    |
| guayaba         | Guayaba Pequeña     | 1 unidad      |
| frutos_secos    | Frutos Secos        | ¼ taza        |
| jocotes         | Jocotes             | 3 unidades    |
| fresas          | Fresas              | 1¼ taza       |
| kiwi            | Kiwi                | 1 unidad      |
| mamey           | Mamey               | ½ unidad      |
| nances          | Nances              | 20 unidades   |
| maranon_japones | Marañón Japonés     | 3 unidades    |
| papaya          | Papaya              | 1 taza        |
| sandia          | Sandía              | 1¼ taza       |
| pina            | Piña                | ¾ taza        |
| agua_coco       | Agua de Coco        | 1 taza        |
| jugo_naranja    | Jugo de Naranja     | ½ taza        |
| anona           | Anona               | ⅛ unidad      |
| mamones         | Mamones             | 22 unidades   |
| mandarina       | Mandarina Pequeña   | 2 unidades    |
| guanabana       | Guanábana           | ¼ unidad      |
| nispero         | Níspero             | 1 unidad      |
| jalea           | Jalea o Mermelada   | 1 cdta        |
| durazno         | Durazno             | 1 unidad      |
| moras           | Moras               | ¾ taza        |

### CEREALES (19 alimentos)
Todos: CHO=15g, CHON=2g, COOH=1g, kcal=80

| ID                  | Nombre                         | Cantidad             |
|---------------------|--------------------------------|----------------------|
| cereal_azucarado    | Cereal Azucarado               | ½ taza               |
| cereal_simple       | Cereal Simple                  | ¾ taza               |
| avena_cocida        | Avena Cocida                   | ½ taza               |
| tortilla_maiz       | Tortilla de Maíz               | 1 unidad             |
| pasta               | Pasta Cocida                   | ½ taza               |
| arroz               | Arroz Cocido                   | ½ taza               |
| pancake             | Pancake                        | 1 unidad             |
| granola             | Granola                        | ¼ taza               |
| frijoles            | Frijoles / Arvejas / Lentejas  | ¼ taza               |
| pan_bollo           | Pan Bollo                      | 1 unidad pequeña     |
| pan_caja            | Pan de Caja                    | 1 unidad             |
| tortilla_taco       | Tortilla para Taco             | 2 unidades           |
| galletas_animalitos | Galletas Animalitos            | 8 unidades           |
| galletas_saladas    | Galletas Saladas               | 3 unidades           |
| palomitas_maiz      | Palomitas de Maíz Caseras      | 3 tazas              |
| papa                | Papa Cocida                    | ½ taza               |
| camote              | Camote Cocido                  | ½ taza               |
| yuca                | Yuca Cocida                    | ¼ taza               |
| platano             | Plátano Cocido                 | ¼ taza               |

### CARNES MAGRAS (6 alimentos)
Todos: CHO=0g, CHON=7g, COOH=3g, kcal=55

| ID            | Nombre              | Cantidad   |
|---------------|---------------------|------------|
| huevo         | Huevo               | 1 huevo    |
| claras_huevo  | Claras de Huevo     | 3 claras   |
| pollo_sin_piel| Pollo Sin Piel      | 1 oz       |
| parmesano     | Queso Parmesano     | 2 cdas     |
| mozzarella    | Queso Mozzarella    | 1 oz       |
| requeson      | Requesón            | ¼ taza     |

### CARNES SEMIGRASAS (6 alimentos)
Todos: CHO=0g, CHON=7g, COOH=5g, kcal=75

| ID             | Nombre              | Cantidad   |
|----------------|---------------------|------------|
| queso_kraft    | Queso Procesado     | 1 lasca    |
| atun_agua      | Atún en Agua        | ¼ taza     |
| pescado_filete | Filete de Pescado   | 1 oz       |
| queso_fresco   | Queso Fresco        | 1 oz       |
| res_magro      | Res Corte Magro     | 1 oz       |
| sardinas_agua  | Sardinas en Agua    | ¼ taza     |

### CARNES GRASAS (5 alimentos)
Todos: CHO=0g, CHON=7g, COOH=8g, kcal=100

| ID            | Nombre              | Cantidad |
|---------------|---------------------|----------|
| chorizo       | Chorizo             | 1 oz     |
| salchicha_res | Salchicha de Res    | 1 oz     |
| costilla_res  | Costilla de Res     | 1 oz     |
| pollo_con_piel| Pollo Con Piel      | 1 oz     |
| cerdo_costilla| Costilla de Cerdo   | 1 oz     |

### GRASAS (16 alimentos)
Todos: CHO=0g, CHON=0g, COOH=5g, kcal=45

| ID               | Nombre               | Cantidad     |
|------------------|----------------------|--------------|
| mantequilla      | Mantequilla          | 1 cdta       |
| margarina        | Margarina            | 1 cdta       |
| aceite           | Aceite               | 1 cdta       |
| mayonesa         | Mayonesa             | 1 cdta       |
| tocino           | Tocino               | 1 tira       |
| aguacate         | Aguacate             | ¼ unidad     |
| crema_espesa     | Crema Espesa         | 1 cda        |
| queso_crema      | Queso Crema          | 1 cda        |
| crema_rala       | Crema Rala           | 1½ cda       |
| quesillo         | Quesillo             | 1 oz         |
| mani             | Maní                 | 10 unidades  |
| semilla_maranon  | Semilla de Marañón   | 6 unidades   |
| aderezo_light    | Aderezo Light        | 2 cdas       |
| aceitunas_negras | Aceitunas Negras     | 8 unidades   |
| aceituna_verde   | Aceituna Verde       | 10 unidades  |
| coco_rallado     | Coco Rallado         | 2 cdas       |

**Total: 1+2+2+24+28+19+6+6+5+16 = 109 alimentos**

---

## Reglas de Distribución por Tiempo de Comida

### DESAYUNO (25% del total calórico)

**PERMITIDO:**
- Cereales de desayuno: avena, cereal azucarado, cereal simple, pancake, granola, pan bollo, pan de caja, tortilla para taco, tortilla de maíz, galletas
- Frutas: todas sin restricción
- Leche y derivados: todas las categorías (entera, semi, descremada, yogurt)
- Proteínas de desayuno: huevo, claras de huevo, requesón, queso parmesano, mozzarella, queso procesado, queso fresco
- Grasas: todas sin restricción

**PROHIBIDO:**
- Carnes principales: pollo sin piel, filete de pescado, atún, res, sardinas
- Cereales de almuerzo: arroz, pasta, papa, camote, yuca, plátano, frijoles
- Vegetales cocidos (solo tomate crudo y cebolla cruda permitidos)

### ALMUERZO (35% del total calórico)

**PERMITIDO:**
- Cereales de almuerzo: arroz, pasta, papa, camote, yuca, plátano, frijoles, tortilla para taco
- Vegetales: todos sin restricción (cocidos y crudos)
- Frutas: todas sin restricción (como postre)
- Grasas de cocción y aderezo: aceite, mantequilla, margarina, mayonesa, aguacate, aderezo light, aceitunas, crema espesa, crema rala, quesillo, tocino
- **UNA SOLA proteína principal**: pollo O pescado O res O atún O sardinas O huevo (no mezclar)
- Los quesos pueden acompañar sin contar como "proteína principal"

**PROHIBIDO:**
- Leche (redistribuida a otras comidas)
- Mezclar más de una fuente de proteína principal (pollo + atún = incorrecto)

### CENA (20% del total calórico)

**PERMITIDO:**
- Cereales ligeros: arroz, pasta, papa, frijoles, pan de caja, tortilla para taco
- Vegetales: todos sin restricción
- **UNA SOLA proteína ligera**: preferir pescado > pollo > huevo
  - Magras permitidas: huevo, claras, pollo sin piel, requesón, mozzarella, parmesano
  - Semigrasas permitidas: atún, filete de pescado, sardinas, queso fresco, queso procesado
- Yogurt (única leche permitida en cena)
- Grasas moderadas: aceite, aguacate, maní, aceitunas, aderezo light, semilla de marañón

**PROHIBIDO:**
- Leche entera, leche descremada
- Carnes grasas (chorizo, costilla, etc.)
- Frutas (no es momento de postre)

### COLACIÓN AM y PM (10% cada una)

**PERMITIDO:**
- Frutas: todas sin restricción
- Cereales ligeros: pan de caja, pan bollo, galletas saladas, galletas animalitos, granola
- Yogurt natural
- Grasas saludables: aguacate, maní, semilla de marañón

**PROHIBIDO:**
- Leche (entera y descremada)
- Carnes (todas las categorías)
- Vegetales
- Cereales de almuerzo (arroz, pasta, papa)

---

## Regla Crítica: Proteína Única por Comida

En almuerzo y cena, solo puede haber **UNA FUENTE DE PROTEÍNA PRINCIPAL**:

```
PROTEINAS_PRINCIPALES = {
  huevo, claras_huevo, pollo_sin_piel,
  atun_agua, pescado_filete, res_magro, sardinas_agua,
  chorizo, salchicha_res, costilla_res, pollo_con_piel, cerdo_costilla
}
```

**Correcto**: 8 porciones = 8 oz de pollo sin piel
**Incorrecto**: 4 oz de pollo + 4 oz de atún

Los quesos NO son proteína principal (pueden coexistir con una proteína principal).

---

## Fórmula Harris-Benedict

```
Mujer:  REE = (655.1 + 9.56×PesoIdeal + 1.85×TallaCM − 4.68×Edad) × FactorActividad
Hombre: REE = (66.47 + 13.75×PesoIdeal + 5×TallaCM − 6.74×Edad) × FactorActividad
```

**Peso Ideal**: promedio entre IMC 18.5 y 24.9

**Factores de Actividad**:
- Sedentario: 1.2
- Ligeramente activo: 1.375
- Moderadamente activo: 1.55
- Muy activo: 1.725
- Extremadamente activo: 1.9

---

## Distribución de Macronutrientes

Distribución estándar (ajustable por el usuario):
- CHO: 50-60% del total calórico (÷4 para gramos)
- CHON: 15-20% del total calórico (÷4 para gramos)
- COOH: 25-30% del total calórico (÷9 para gramos)

---

## Archivos Clave del Proyecto

| Archivo | Descripción |
|---------|-------------|
| `src/utils/alimentos.js` | Base de datos completa + lógica de generación de menús |
| `src/utils/recetas.js` | ~150 recetas agrupadas por comida |
| `src/utils/calculosNutricionales.js` | Harris-Benedict + TABLA_INTERCAMBIOS |
| `src/components/GeneradorMenu.jsx` | UI de generación: multi-día, exclusiones, export |
| `src/components/TablaIntercambios.jsx` | Tabla de distribución de intercambios |
| `src/components/FormularioEntrada.jsx` | Formulario de datos del paciente |
| `src/components/PanelResultados.jsx` | Panel completo de resultados |

---

## Notas Técnicas

- La lógica de distribución usa el **método de mayor residuo** para garantizar que la suma de porciones sea exacta (sin pérdida por redondeo)
- Los filtros por comida redistribuyen automáticamente los intercambios bloqueados a otras comidas permitidas
- El sistema prioriza **recetas reconocidas** antes de asignar alimentos individuales (para menús más naturales)
- El historial de alimentos usados evita repeticiones en planes multi-día (ventana de 3 días)
