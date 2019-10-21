import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Cuenta {
    _id: string;
    nombre: string;
    valor_inicial: number;
    color: string;
    tipo: string;
    descripcion: string;
    moneda: {
        nombre: string
    };
    createdAt: string;
    updatedAt: string
}
