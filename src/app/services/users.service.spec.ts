import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Pruebas para el servicio Users', () => {

  let service: UsersService;
  let mockHttp: HttpTestingController
  const urlTest = "http://localhost:9000/usuarios"

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ] });

    service = TestBed.inject(UsersService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterAll(()=>{
    mockHttp.verify() // Esto lo que va a hacer es verificar que no hayan solicitudes pendientes
  });
  

  // CASO DE PRUEbA:
  it("Deberia ser una peticion GET para poder mostrar los usuarios", ()=>{
    const mockUser = [
      {fullname: "Maria Alejandra", email: "marialeja@gmail.com", password: "12345"},
      {fullname: "Maria Alejandro", email: "marialeja@gmail.com", password: "12345"},
    ];

    const mockResponse = {
      mensaje: "Se encontraron usuarios almacenados",
      numeroUsuarios: mockUser.length,
      datos: mockUser
    }

    service.getUser().subscribe(
      (res)=>{
        // El "RES" va a ser exactamente igual a lo que  tengamos en "mockResponse"
        expect(res).toEqual(mockResponse);
      }
    );

    //  Toca garantiza que la peticion se este haciendo a una URL en particular
    const req = mockHttp.expectOne(urlTest);

    // Toca garantizar el metodo
    expect(req.request.method).toBe("GET")

    // ESTO ES LO QUE SIMULA EL SERVIDOR
    req.flush(mockResponse)
  });
  
});
