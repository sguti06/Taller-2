// 1. Traer las importaciones necesarias
import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";

// Toca importar el provedor para hacer peticiones de HTTP
import { provideHttpClient } from "@angular/common/http";

// Importar herramientas que permitan simular interacciones con mis Peticiones HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

// 2. Definir el bloque de pruebas
describe ("Pruebas para servicio Login", ()=>{

    // VARIABLES...
    let _loginService : LoginService;
    let _httpMock : HttpTestingController //MOCK -> objeto o funcion falsa -> simular un comportamiento en HTTP
    const urlTest = "http://localhost:9000/iniciarSesion";
    const emailTest = "Kakaroto@EjemploService.com";
    const passwordTest = "Dragonball123";
    const tokenTest = "K129hedaiDPWOF"


    // beforeEach y el afterALl -> Hacer la configuracion global
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        // Inyección de servicios
        _loginService = TestBed.inject(LoginService);
        _httpMock = TestBed.inject(HttpTestingController);
    });

    afterAll(()=>{
        _httpMock.verify(); // Este VERIFY sirve para evaluar despues de TODAS las pruebas no queden peticiónes pendientes
    });


    // 3. Definir nuestros casos de Prueba
        // CASO DE PRUEBA UNO
        it("Deberia hacer una peticion POST para iniciar sesion", ()=>{
           const mockResponse = {
            mensaje: "Inicio de sesion exitoso",
            token: tokenTest
           } 
           
           _loginService.login(emailTest, passwordTest).subscribe(
                (res)=>{
                    // El "RES" va a ser exactamente igual a lo que  tengamos en "mockResponse"
                    expect(res).toEqual(mockResponse);
                }
           )

            //  Toca garantiza que la peticion se este haciendo a una URL en particular
            const peticion = _httpMock.expectOne(urlTest)

            // Toca garantizar el metodo
            expect(peticion.request.method).toBe("POST")

            // ESTO ES LO QUE SIMULA EL SERVIDOR
            peticion.flush(mockResponse)

        });

            // CASO DE PRUEBA DOS
            it("Deberia obtener el token almacenado en el localStorage", ()=>{
                localStorage.setItem("token", tokenTest) //Esto es lo que estoy guardando en el localStorage
                expect(_loginService.getToken()).toBe(tokenTest);
            });

                // CASO DE PRUEBA TRES
                it("Deberia verificar si el usuario esta logueado", ()=>{
                    // tenemos el token
                    localStorage.setItem("token", tokenTest)
                    expect(_loginService.isLoggedIn()).toBeTrue(); //Respuesta Booleana = true
 
                });

                    // CASO DE PRUEBA CUATRO
                    it("Deberia cerrar sesion", ()=>{
                        _loginService.logout();
                        expect(localStorage.getItem("token")).toBeFalsy(); //Si cierro sesion, elimino localStorage, y si quiero volver a acceder al local storage, me debe de mandar a null.
                    });

});