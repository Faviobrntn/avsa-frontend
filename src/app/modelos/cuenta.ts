export interface Cuenta {
    _id: string;
    nombre: String;
    valor_inicial: Number;
    color: String;
    tipo: String;
    descripcion: String;
    // moneda: Array<String>;
    moneda: String;
}
