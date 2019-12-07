import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Moneda } from './moneda';

export interface Cuenta {
    _id: string;
    nombre: string;
    valor_inicial: number;
    color: string;
    tipo: string;
    descripcion: string;
    moneda: Moneda;
    createdAt: string;
    updatedAt: string;
}


export interface CuentaApi {
    items: Cuenta[];
    total_count: number;
}
