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




// ################

// Ejercicio 1: Suma simple (tipos básicos)

// Convierte a TypeScript
function sumar(a, b) {
  return a + b;
}

// Solución en TypeScript

function sumar(a: number, b: number): number {
  return a + b;
}

// Ejercicio 2: Parámetro opcional y por defecto

// Convierte a TypeScript
function saludar(nombre, saludo) {
  saludo = saludo || "Hola";
  return `${saludo}, ${nombre}`;
}
// solución en TypeScript

function saludar(nombre: string, saludo: string = "Hola"): string {
  return `${saludo}, ${nombre}`;
}

// Ejercicio 3: Definir un objeto con interfaz

// Convierte a TypeScript
const crearUsuario = (u) => {
  return `Usuario ${u.nombre} creado con id ${u.id}`;
};

// Solución en TypeScript

interface Usuario {
  id: number;
  nombre: string;
  email?: string; // opcional
}

const crearUsuario = (u: Usuario): string => {
  return `Usuario ${u.nombre} creado con id ${u.id}`;
};

// Ejercicio 4: Readonly y tipos literales

// Convierte a TypeScript
const config = {
  mode: "production",
  version: "1.0.0"
};

// Solución en TypeScript

type Mode = "development" | "production" | "test";

interface Config {
  readonly mode: Mode;
  readonly version: string;
}

const config: Config = {
  mode: "production",
  version: "1.0.0"
};

// config.version = '1.0.1' // Error: no se puede asignar a 'version' porque es readonly

// Ejercicio 5: Tuplas

// Convierte a TypeScript
function crearPar(nombre, edad) {
  return [nombre, edad];
}

// Solución en TypeScript

function crearPar(nombre: string, edad: number): [string, number] {
  return [nombre, edad];
}

const p = crearPar("Ana", 30);

// Ejercicio 6: Enums para estados

// Convierte a TypeScript
const estado = "Activo"; // puede ser 'Activo' o 'Inactivo'

// Solución en TypeScript

enum Estado {
  Activo = "Activo",
  Inactivo = "Inactivo"
}

const estado: Estado = Estado.Activo;

// Ejercicio 7: Genéricos: identidad

// Convierte a TypeScript
function identidad(x) {
  return x;
}

// Solución en TypeScript

function identidad<T>(x: T): T {
  return x;
}

const a = identidad<number>(123);
const b = identidad("hola");

// Ejercicio 8: Genéricos con restricción (length)

// Convierte a TypeScript
function cuentaLongitud(x) {
  return x.length;
}

// Solución en TypeScript

function cuentaLongitud<T extends { length: number }>(x: T): number {
  return x.length;
}

console.log(cuentaLongitud('hola')); // 4
console.log(cuentaLongitud([1,2,3])); // 3

// Ejercicio 9: Unión de tipos y narrowing

// Convierte a TypeScript
function formatear(x) {
  if (typeof x === 'number') {
    return x.toFixed(2);
  }
  return x.trim();
}

// Solución en TypeScript

function formatear(x: string | number): string {
  if (typeof x === 'number') {
    return x.toFixed(2);
  }
  return x.trim();
}

// Ejercicio 10: Type guard con in

// Convierte a TypeScript
function descripcion(animal) {
  if (animal.nombre) {
    return `Animal: ${animal.nombre}`;
  }
  return 'Anónimo';
}

// Solución en TypeScript

type Gato = { nombre: string; ronronea: boolean };
type Pez = { tipo: string; nada: boolean };

function descripcion(animal: Gato | Pez): string {
  if ('nombre' in animal) {
    return `Animal: ${animal.nombre}`;
  }
  return 'Anónimo';
}

// Ejercicio 11: Narrowing con instanceof

// Convierte a TypeScript
class A { constructor() {} }
class B { constructor() {} }

function esA(x) {
  if (x instanceof A) return true;
  return false;
}

// Solución en TypeScript

class A { a = 1 }
class B { b = 2 }

function esA(x: A | B): boolean {
  if (x instanceof A) return true;
  return false;
}

const a = new A();
console.log(esA(a));

// Ejercicio 12: Uniones discriminadas (formas geométricas)

// Convierte a TypeScript
function area(shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius * shape.radius;
  }
  return shape.size * shape.size;
}

// Solución en TypeScript

type Circulo = { kind: 'circle'; radius: number };
type Cuadrado = { kind: 'square'; size: number };
type Shape = Circulo | Cuadrado;

function area(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius * shape.radius;
  }
  return shape.size * shape.size;
}

// Ejercicio 13: keyof y pluck

// Convierte a TypeScript
function pluck(obj, keys) {
  return keys.map(k => obj[k]);
}

// Solución en TypeScript

function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(k => obj[k]);
}

const persona = { nombre: 'Ana', edad: 28 };
const resultados = pluck(persona, ['nombre']); // tipo: string[]

// Ejercicio 14: Utility type: Pick

// Convierte a TypeScript
const user = { id: 1, nombre: 'Ana', password: '123' };
// Queremos un objeto público sin password

// Solución en TypeScript 

interface Usuario {
  id: number;
  nombre: string;
  password: string;
}

type UsuarioPublico = Pick<Usuario, 'id' | 'nombre'>;

const user: UsuarioPublico = { id: 1, nombre: 'Ana' };

// Ejercicio 15: Utility type: Omit

// Convierte a TypeScript
const user = { id: 1, nombre: 'Ana', password: '123' };
// Queremos un usuario sin password

// Solución en TypeScript

interface Usuario {
  id: number;
  nombre: string;
  password: string;
}

type UsuarioSinPassword = Omit<Usuario, 'password'>;

const safeUser: UsuarioSinPassword = { id: 1, nombre: 'Ana' };

// Ejercicio 16: Partial y Required

// Convierte a TypeScript
function actualizar(usuario, cambios) {
  return { ...usuario, ...cambios };
}

// Solución en TypeScript

interface Usuario {
  id: number;
  nombre: string;
  email?: string;
}

function actualizar(usuario: Usuario, cambios: Partial<Usuario>): Usuario {
  return { ...usuario, ...cambios };
}

const u: Usuario = { id: 1, nombre: 'Ana' };
const actualizado = actualizar(u, { email: 'a@b.com' });

// Ejercicio 17: ReadonlyArray y readonly

// Convierte a TypeScript
const nums = [1,2,3];
nums.push(4); // debería no permitirse si queremos inmutabilidad

// Solución en TypeScript

const nums: ReadonlyArray<number> = [1, 2, 3];
// nums.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'.

// Ejercicio 18: Sobrecarga de funciones

// Convierte a TypeScript
function combinar(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a + b;
  return `${a}${b}`;
}

// Solución en TypeScript

function combinar(a: number, b: number): number;
function combinar(a: string, b: string): string;
function combinar(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') return a + b;
  return `${a}${b}`;
}

const n = combinar(1, 2); // number
const s = combinar('a', 'b'); // string

// Ejercicio 19: Mapped types: crear Optionalize

// Convierte a TypeScript
// Queremos un tipo igual al original pero con todas las propiedades opcionales

// Solución en TypeScript

type Optionalize<T> = { [P in keyof T]?: T[P] };

interface Persona {
  id: number;
  nombre: string;
}

type PersonaOpcional = Optionalize<Persona>; // { id?: number; nombre?: string }

// Ejercicio 20: Tipos condicionales simples

// Convierte a TypeScript
// Queremos un tipo que sea 'yes' si T es string, y 'no' en caso contrario

// Solución en TypeScript

type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>; // 'yes'
type B = IsString<number>; // 'no'

// Ejercicio 21: unknown vs any

// Convierte a TypeScript
function parse(json) {
  return JSON.parse(json);
}

// Solución en TypeScript

function parse(json: string): unknown {
  return JSON.parse(json);
}

const data = parse('{"x":1}');
if (typeof data === 'object' && data !== null && 'x' in data) {
  // ahora TypeScript permite acceso seguro
  console.log((data as any).x);
}

// Ejercicio 22: never y chequeo exhaustivo

// Convierte a TypeScript
function procesar(valor) {
  switch(valor) {
    case 'a': return 1;
    case 'b': return 2;
  }
}

// Solución en TypeScript

type T = 'a' | 'b';

function assertNever(x: never): never {
  throw new Error('Valor inesperado: ' + x);
}

function procesar(valor: T): number {
  switch (valor) {
    case 'a': return 1;
    case 'b': return 2;
    default: return assertNever(valor as never);
  }
}

// Ejercicio 23: Index signatures / Record

// Convierte a TypeScript
const puntuaciones = {};
puntuaciones['ana'] = 10;
puntuaciones['juan'] = 8;

// Solución en TypeScript

const puntuaciones: Record<string, number> = {};
puntuaciones['ana'] = 10;
puntuaciones['juan'] = 8;

// Ejercicio 24: Módulos: export / import

// Convierte a TypeScript (dos archivos)
// utils.js
function doble(x) { return x * 2; }
module.exports = { doble };

// index.js
const { doble } = require('./utils');
console.log(doble(3));

// Solución en TypeScript

// utils.ts
export function doble(x: number): number { return x * 2; }

// index.ts
import { doble } from './utils';
console.log(doble(3));

// Ejercicio 25: 'as const' para inferencia literal

// Convierte a TypeScript
const opciones = { modo: 'auto', retry: 3 };

// Solución en TypeScript

const opciones = { modo: 'auto', retry: 3 } as const;
// tipo de opciones.modo es 'auto' (literal), no string

// Ejercicio 26: Tuplas con elementos rest

// Convierte a TypeScript
function makeTuple(first, ...rest) {
  return [first, ...rest];
}

// Solución en TypeScript

function makeTuple(first: string, ...rest: number[]): [string, ...number[]] {
  return [first, ...rest];
}

const t = makeTuple('x', 1, 2, 3); // tipo: [string, ...number[]]

// Ejercicio 27: Promises y async/await

// Convierte a TypeScript
async function fetchUser() {
  const r = await fetch('/user');
  return r.json();
}

// Solución en TypeScript

interface Usuario { id: number; nombre: string; }

async function fetchUser(): Promise<Usuario> {
  const r = await fetch('/user');
  const data = await r.json() as Usuario;
  return data;
}

// Ejercicio 28: Type assertion y non-null assertion

// Convierte a TypeScript
const el = document.getElementById('app');
el.innerHTML = 'Hola';

// Solución en TypeScript 

const el = document.getElementById('app') as HTMLElement | null;
if (el) {
  el.innerHTML = 'Hola';
}

// o usando non-null assertion (con precaución)
const el2 = document.getElementById('app')!;
el2.innerHTML = 'Hola';