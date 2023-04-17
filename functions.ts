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

