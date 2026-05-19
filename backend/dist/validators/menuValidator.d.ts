import { z } from 'zod';
export declare const IntercambiosSchema: z.ZodObject<{
    lecheEntera: z.ZodNumber;
    lecheSemi: z.ZodNumber;
    lecheDes: z.ZodNumber;
    vegetales: z.ZodNumber;
    frutas: z.ZodNumber;
    cereales: z.ZodNumber;
    carnesMagras: z.ZodNumber;
    carnesSemi: z.ZodNumber;
    carnesGordas: z.ZodNumber;
    grasas: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    lecheEntera: number;
    lecheSemi: number;
    lecheDes: number;
    vegetales: number;
    frutas: number;
    cereales: number;
    carnesMagras: number;
    carnesSemi: number;
    carnesGordas: number;
    grasas: number;
}, {
    lecheEntera: number;
    lecheSemi: number;
    lecheDes: number;
    vegetales: number;
    frutas: number;
    cereales: number;
    carnesMagras: number;
    carnesSemi: number;
    carnesGordas: number;
    grasas: number;
}>;
export declare const DistribucionComidasSchema: z.ZodEffects<z.ZodObject<{
    desayuno: z.ZodNumber;
    colacionAM: z.ZodNumber;
    almuerzo: z.ZodNumber;
    colacionPM: z.ZodNumber;
    cena: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    desayuno: number;
    colacionAM: number;
    almuerzo: number;
    colacionPM: number;
    cena: number;
}, {
    desayuno: number;
    colacionAM: number;
    almuerzo: number;
    colacionPM: number;
    cena: number;
}>, {
    desayuno: number;
    colacionAM: number;
    almuerzo: number;
    colacionPM: number;
    cena: number;
}, {
    desayuno: number;
    colacionAM: number;
    almuerzo: number;
    colacionPM: number;
    cena: number;
}>;
export declare const OpcionesSchema: z.ZodObject<{
    numDias: z.ZodNumber;
    excluirAlimentos: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    numDias: number;
    excluirAlimentos: string[];
}, {
    numDias: number;
    excluirAlimentos?: string[] | undefined;
}>;
export declare const CrearMenuSchema: z.ZodObject<{
    intercambiosRequeridos: z.ZodObject<{
        lecheEntera: z.ZodNumber;
        lecheSemi: z.ZodNumber;
        lecheDes: z.ZodNumber;
        vegetales: z.ZodNumber;
        frutas: z.ZodNumber;
        cereales: z.ZodNumber;
        carnesMagras: z.ZodNumber;
        carnesSemi: z.ZodNumber;
        carnesGordas: z.ZodNumber;
        grasas: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lecheEntera: number;
        lecheSemi: number;
        lecheDes: number;
        vegetales: number;
        frutas: number;
        cereales: number;
        carnesMagras: number;
        carnesSemi: number;
        carnesGordas: number;
        grasas: number;
    }, {
        lecheEntera: number;
        lecheSemi: number;
        lecheDes: number;
        vegetales: number;
        frutas: number;
        cereales: number;
        carnesMagras: number;
        carnesSemi: number;
        carnesGordas: number;
        grasas: number;
    }>;
    distribucionComidas: z.ZodEffects<z.ZodObject<{
        desayuno: z.ZodNumber;
        colacionAM: z.ZodNumber;
        almuerzo: z.ZodNumber;
        colacionPM: z.ZodNumber;
        cena: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    }, {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    }>, {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    }, {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    }>;
    opciones: z.ZodObject<{
        numDias: z.ZodNumber;
        excluirAlimentos: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        numDias: number;
        excluirAlimentos: string[];
    }, {
        numDias: number;
        excluirAlimentos?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    distribucionComidas: {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    };
    intercambiosRequeridos: {
        lecheEntera: number;
        lecheSemi: number;
        lecheDes: number;
        vegetales: number;
        frutas: number;
        cereales: number;
        carnesMagras: number;
        carnesSemi: number;
        carnesGordas: number;
        grasas: number;
    };
    opciones: {
        numDias: number;
        excluirAlimentos: string[];
    };
}, {
    distribucionComidas: {
        desayuno: number;
        colacionAM: number;
        almuerzo: number;
        colacionPM: number;
        cena: number;
    };
    intercambiosRequeridos: {
        lecheEntera: number;
        lecheSemi: number;
        lecheDes: number;
        vegetales: number;
        frutas: number;
        cereales: number;
        carnesMagras: number;
        carnesSemi: number;
        carnesGordas: number;
        grasas: number;
    };
    opciones: {
        numDias: number;
        excluirAlimentos?: string[] | undefined;
    };
}>;
export type CrearMenuInput = z.infer<typeof CrearMenuSchema>;
//# sourceMappingURL=menuValidator.d.ts.map