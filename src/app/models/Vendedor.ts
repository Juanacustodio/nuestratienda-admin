export interface Vendedor {
        nombres: string,
        apellidos: string,
        password: string,
        correo: string,
      suscripcion: Suscripcion
      }
      
export interface Suscripcion {
      token: string,   
      fechaInicio: string
      }

