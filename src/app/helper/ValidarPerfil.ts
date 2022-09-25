import { JwtHelperService } from "@auth0/angular-jwt";

export class ValidarPerfil{

    constructor(){}

    get(): string{
        const helper = new JwtHelperService();
        const token = localStorage.getItem("TOKEN");
        const decodedToken = helper.decodeToken(token);
        let result = '0';
        switch(decodedToken.perfil[0]){
            case "SECRETARIA": result = '1'; break;
            case "ADMINISTRADOR": result = '2'; break;
            case "GERENTE": result = '3'; break;
            case "ASISTENTE": result = '4'; break;
            case "ABOGADO": result = '5'; break;
        }
        return result;
    }
}