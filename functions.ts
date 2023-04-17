//Function Types

// function type expression
type Greet = (name: string) => void;

// if we want to describe something callable with properties
type GreetWithProperties = {
    properties: Record<string, string>;
    (name: string): void;
}
// usage
function greet(fn: GreetWithProperties) {
    console.log('Test Greet: ', fn.properties, fn('Patrick'));
}

// Generics are used to describe the correspondence between the two values
function firstElement<Type>(array: Type[]): Type | undefined {
    return array[0];
}
// By adding Type we've created a link between the input and the output types

// the type is inferred - chosen automatically by typescript
const s = firstElement(["a", "b", "c"]);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);

// we can constrain the acceptable types by adding extends
function longest<Type extends { length: number }>(a: Type, b: Type): Type {
    if (a.length > b.length) {
        return a;
    } else {
        return b;
    }
}

const longestArray = longest([1, 2, 3], [2, 3, 5, 6]);
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
    return n.toFixed();
}
// - default values
function f10(n = 10): string {
    return n.toFixed();
}
