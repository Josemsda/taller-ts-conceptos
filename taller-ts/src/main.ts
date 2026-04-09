let productoNombre: string = "Laptop";
let productoPrecio: number = 1200;
let productoEnStock: boolean = true;

// ❌ El editor te mostrará un error aquí
// productoPrecio = "mil doscientos"; 


// ##### Tipo any y unknown
// Definición:
// any: Desactiva la comprobación de tipos para una variable. Úsalo con cuidado, ya que elimina la principal ventaja de TypeScript.
// unknown: Similar a any pero más seguro. Para usar una variable de tipo unknown, debes verificar su tipo primero.
// Ejemplo Práctico: Cuando recibes datos de una API externa con una estructura desconocida.

let datosAPI: unknown = JSON.parse('{"nombre": "tablet", "precio": 300}');

if (typeof datosAPI === 'object' && datosAPI !== null) {
  // ✅ Comprobación para acceder de forma segura
  let producto = datosAPI as { nombre: string, precio: number };
  console.log(producto.nombre);
}


// ##### Tipo void y never en Funciones
// Definición:
// void: Para funciones que no devuelven explícitamente un valor.
// never: Para funciones que nunca terminan su ejecución (por ejemplo, lanzan un error o entran en un bucle infinito).
// Ejemplo Práctico: Una función de registro (logger) que no devuelve nada y una función que maneja un error fatal.

function registrarMensaje(mensaje: string): void {
  console.log("LOG:", mensaje);
}

function detenerProceso(razon: string): never {
  throw new Error(`Proceso detenido: ${razon}`);
}

// ##### Arrays, Tuplas y Enumeradores
// Definición:
// Array: Una colección de elementos del mismo tipo con longitud dinámica.
// Tupla: Un array con una longitud y tipos de datos fijos en posiciones específicas.
// Enum: Define un conjunto de constantes con nombres.
// Ejemplo Práctico: Una lista de usuarios, una coordenada GPS y los estados de una orden.

let usuariosIDs: number[] = [101, 102, 103];
let gpsCoordenadas: [number, number] = [40.7128, -74.0060];

enum EstadoOrden { Pendiente, Enviada, Entregada, Cancelada };
let miOrdenEstado: EstadoOrden = EstadoOrden.Enviada;

// #####Union Types, Type Aliases e Intersection Types
// Definición:
// Union Types: Una variable puede ser de varios tipos (string | number).
// Type Aliases: Un nuevo nombre para un tipo.
// Intersection Types: Combina varios tipos en uno solo (&).
// Ejemplo Práctico: Una función que acepta un id que puede ser de tipo string o number.

type ID = string | number;
let miId: ID = "a-123";

type Empleado = { nombre: string, email: string };
type Desarrollador = Empleado & { lenguaje: string, senioridad: "junior" | "senior" };

let nuevoDev: Desarrollador = {
  nombre: "Carlos",
  email: "carlos@empresa.com",
  lenguaje: "TypeScript",
  senioridad: "junior"
};

// ##### Parámetros de Funciones
// Definición:
// Opcionales: Pueden no ser proporcionados (?).
// Múltiples (rest): Aceptan un número variable de argumentos (...).
// Valores por defecto: Un valor que se usa si no se proporciona un argumento.
// Ejemplo Práctico: Una función de saludo que puede recibir diferentes parámetros.

function saludar(nombre: string = 'Desconocido', titulo?: string, ...amigos: string[]): string {
  let saludo = titulo ? `${titulo} ${nombre}` : nombre;
  if (amigos.length > 0) {
    saludo += `, y tus amigos ${amigos.join(', ')}`;
  }
  return `Hola, ${saludo}.`;
}

console.log(saludar()); // Hola, Desconocido
console.log(saludar("Ana"));  // Hola, Ana
console.log(saludar("Pedro", "Sr.")); //Hola, Sr. Pedro
console.log(saludar("Maria", undefined, "Juan", "Pedro")); // Hola, Maria, y tus amigos Juan,Pedro

// ##### Interfaces y Propiedades
// Definición: Una interfaz define la "forma" que debe tener un objeto.
// Propiedades opcionales: Una propiedad que puede no estar presente en un objeto (?).
// Propiedades de solo lectura: No se puede modificar después de la creación (readonly).
// Ejemplo Práctico: La interfaz de un usuario en un sistema, con propiedades requeridas y opcionales.

interface Usuario {
  readonly id: number;
  nombre: string;
  email?: string;
}

let usuario: Usuario = { id: 10, nombre: "Luis" };
// usuario.id = 11; // ❌ Error, es de solo lectura
usuario.email = "luis@correo.com"; // ✅ Válido

// ##### Clases y Modificadores de Acceso
// Definición: Un plano para crear objetos. Los modificadores de acceso controlan la visibilidad de los miembros: public, private, y protected.
// Ejemplo Práctico: Una clase Vehiculo y su herencia a una clase Coche, mostrando cómo los modificadores limitan el acceso.

class Vehiculo {
  protected ruedas: number;
  constructor(ruedas: number) {
    this.ruedas = ruedas;
  }
  public arrancar(): void {
    console.log("El vehículo está arrancando.");
  }
}

class Coche extends Vehiculo {
  public marca: string;
  private _velocidad: number = 0;

  constructor(ruedas: number, marca: string) {
    super(ruedas);
    this.marca = marca;
  }
  
  // Puedes acceder a 'this.ruedas' porque es 'protected'
  public getInfo(): void {
    console.log(`Este coche tiene ${this.ruedas} ruedas.`);
  }

  // Métodos que manipulan la propiedad 'private'
  public acelerar(cantidad: number): void {
    this._velocidad += cantidad;
  }
}

const miCoche = new Coche(4, "Toyota");
miCoche.arrancar();
miCoche.acelerar(50);
// miCoche._velocidad = 100; // ❌ Error, es privado

// ##### Tipos Genéricos
// Definición: Los genéricos te permiten crear componentes reutilizables que pueden trabajar con cualquier tipo de dato, manteniendo la seguridad de tipos.
// Ejemplo Práctico: Una función que crea una cola (queue) de cualquier tipo de elemento.

class Cola<T> {
  private items: T[] = [];
  
  agregar(item: T): void {
    this.items.push(item);
  }
  
  obtenerPrimerElemento(): T | undefined {
    return this.items.shift();
  }
}

const colaNumeros = new Cola<number>();
colaNumeros.agregar(10);
colaNumeros.agregar(20);
const primerNumero = colaNumeros.obtenerPrimerElemento(); // Tipo: number

// ##### Módulos
// Definición: Los módulos te permiten dividir tu código en archivos separados para mejorar la organización y evitar conflictos de nombres.
// Ejemplo Práctico: Un módulo de utilidades para operaciones matemáticas que se exporta y se usa en otro archivo.

// utils.ts

// TypeScript


export function sumar(a: number, b: number): number {
  return a + b;
}


// main.ts

// TypeScript


import { sumar } from './utils';

const resultado = sumar(5, 10);
console.log(`El resultado de la suma es: ${resultado}`);