import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { AuthUserModel } from '@app/core/features/auth/auth.interface';
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  constructor() { }

  getDataApi(): Observable<any> {
    //TODO: Aqui podemos hacer http.get('api...')
    const authUserData : AuthUserModel =
    {
      user:{
        id: "123hgb21g-323214ds-afsdsadf",
        username: "JuanGomez",
        code: "20001",
        grupo_id: 1,
        role: "admin",
        data:{
          email: "admin@email.com",
          contact_phone: "26541551321",
          address: "B° Solares de Esperanzas"
        }
      },
      access_token: "AccessToken",
      company: "Empresa S.R.L",
      permissions:[
        {
          page_id: 1,
          nivel_acceso: "escritura",
          path: "/page-1"
        },
        {
          page_id: 2,
          nivel_acceso: "escritura",
          path: "/page-2"
        },
        {
          page_id: 3,
          nivel_acceso: "escritura",
          path: "/page-3"
        },
        {
          page_id: 4,
          nivel_acceso: "escritura",
          path: "/page-4"
        },
        {
          page_id: 5,
          nivel_acceso: "escritura",
          path: "/page-5"
        },
        {
          page_id: 6,
          nivel_acceso: "escritura",
          path: "/page-6"
        },
        {
          page_id: 7,
          nivel_acceso: "escritura",
          path: "/page-7"
        },
        {
          page_id: 8,
          nivel_acceso: "escritura",
          path: "/page-8"
        },
        {
          page_id: 9,
          nivel_acceso: "escritura",
          path: "/page-9"
        },

      ]
    }
    return of(authUserData);
  }

}
