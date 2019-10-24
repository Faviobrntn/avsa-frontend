import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Moneda } from './moneda';
import { Cuenta } from './cuenta';

export interface Registro {
    _id: string;
    tipo: string, //Ingresos, Gastos
    importe: number,
    estado: string,
    fecha_hora: string,
    notas: string,
    moneda: Moneda;
    cuenta: Cuenta;
    createdAt: string;
    updatedAt: string
}
