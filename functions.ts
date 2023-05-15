// Function Types

// Function type expression
type Greet = (name: string) => void;

// If we want to describe something callable with properties
type GreetWithProperties = {
  properties: Record<string, string>;
  (name: string): void;
};
// Usage:
function greet(fn: GreetWithProperties) {
  console.log("Test Greet: ", fn.properties, fn("Patrick"));
}

// Generics are used to describe the correspondence between the two values
function firstElement<Type>(array: Type[]): Type | undefined {
  return array[0];
}
// By adding Type we've created a link between the input and the output types

// The type is inferred - chosen automatically by typescript
const s = firstElement(["a", "b", "c"]);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);

// We can constrain the acceptable types by adding extends
function longest<Type extends { length: number }>(a: Type, b: Type): Type {
  if (a.length > b.length) {
    return a;
  } else {
    return b;
  }
}

const longestArray = longest([1, 2, 3], [2, 3, 5, 6]);
// @ts-ignore
const wrongUsage = longestArray(2, 3);

// Guidelines to write good function generics
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

// 1. When possible, use the type parameter itself rather than constraining it
// 2. Always use as few type parameters as possible
// 3. If a type parameter only appears in one location, strongly reconsider if you actually need it

// Function parameters:
// - optional
function f(n?: number) {
  // @ts-ignore
  return n.toFixed();
}
// - default values
function f10(n = 10): string {
  return n.toFixed();
}

// Optional parameters in callbacks, function statement:
function mapForEach(array: any[], callback: (arg: any, index?: number) => any) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}
// Usage:
mapForEach([1, 2, 3], (a, i) => {
  // @ts-ignore
  console.log(i.toFixed());
});

// Function overloads, line 1 and 2 are overload signatures
// 3 line is a function implementation signature compatible with overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d!==undefined && y!==undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
// Usage:
const d1 = makeDate(1123123);
const d2 = makeDate(4, 5, 5);
// @ts-ignore
const d3 = makeDate(1, 3); // Error

// Writing good overloads
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

// Error:
// @ts-ignore
len(Math.random() > 0.5 ? "hello" : [0]);

// If both overloads have the same argument count and same return time it's better
// to write non-overload version of this function:
function len2(x: any[] | string) {
  return x.length;
}
// Always prefer parameters with union types instead of overloads when possible ^^

// The inferred return type is void
function noop() {
  return;
}
// in TypeScript void and undefined are not the same

// unknown, unknown is safer then any because it doesn't allow to do anything with an unknown value
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  // @ts-ignore
  a.b();
}

// never
function fail(msg: string): never {
  throw new Error(msg);
}

// Rest parameters
// A rest parameter appears after all other parameters, and uses the ... syntax:
// If we want to declare generic type for rest parameters we must use Array<T> or T[]
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const result = multiply(10, 1, 2, 3, 4);

// Note that in general, TypeScript does not assume that arrays are immutable.
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers, atan2 expects exactly two parameters
const args = [8, 5];
// @ts-ignore
const angle = Math.atan2(...args);

// Inferred as 2-length tuple
const argsCorrect = [8, 5] as const;
// OK
const angleCorrect = Math.atan2(...argsCorrect);

// Parameter destructuring
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}

// Return type void
// Contextual typing with a return type of void does not force functions to not return something.
type voidFunc = () => void;

const ff1: voidFunc = () => {
  return true;
};
const ff2: voidFunc = () => true;
const ff3: voidFunc = function () {
  return true;
};

const specificVoidFunction: voidFunc = () => {
  return 'some-string';
}
const v1 = ff1();

// This behavior exists so that the following code is valid
// even though Array.prototype.push returns a number
// and the Array.prototype.forEach method expects
// a function with a return type of void.
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));

function fff2(): void {
  // @ts-expect-error
  return true;
}
const fff3 = function (): void {
  // @ts-expect-error
  return true;
};
