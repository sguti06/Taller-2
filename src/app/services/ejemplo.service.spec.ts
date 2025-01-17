// ESTA DE ACA ESTA LA ESTRUCTURA BASICA PARA HACER UNA PRUEBA UNITARIA EN ANGULAR

/*
  En el frontEnd no se hacen pruebas de SERVIDORES ni de BASES DE DATOS
  Aca solamente testeamos que el usuario obtenga la informacion que deberia 
  LA IDEA ES QUE LA INTERFAZ FUNCIONE
*/

// Configurar el entorno de pruebas de Angular
import { TestBed } from '@angular/core/testing';
// Traerse lo que necesito testear
import { EjemploService } from './ejemplo.service';

// Definir el bloque de pruebas
describe('EjemploService', () => {

  // 1. Declarar que variables vamos a necesitar en nuestras pruebas
  let service: EjemploService;

  // 2. Hacemos una configuracion global -> El beforeEach siempre lo tenemos que configurar
  // el beforeEach -> sucede antes de cada caso de prueba
  beforeEach(() => {
    // configuracion del entorno de prueba
    TestBed.configureTestingModule({
      // Aca se pone todo lo que se necesite inyectar -> importaciones, servicios o componentes, proveedores, 
      providers: [EjemploService]
    });

    service = TestBed.inject(EjemploService);
  });

  // 3. Definir los casos de prueba
  it('Deberia haberse creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it("Deberia sumar dos numeros correctamente", ()=>{
    const resultado = service.suma(3,5);
    expect(resultado).toBe(8);
  });

});
