export interface JwtResponse {
    dataUsuario: {
        id: string,
        nombre: string,
        email: string,
        accessToken: string,
        expiresIn: string
    }
}
