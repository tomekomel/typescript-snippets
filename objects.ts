class Shape {
}

// optional properties
interface ShapeObject {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(shape: ShapeObject) {
    let xPos = shape.xPos;
    let yPos = shape.yPos;
}

// setting defaults
function paintShapeExt({ shape, xPos = 0, yPos = 0 }: ShapeObject) {
    console.log('x: ', xPos);
    console.log('y: ', yPos);
}

// In an object destructuring pattern, shape: Shape means “grab" the property shape
// and redefine it locally as a variable named ShapeObject (because they already have defined types, so no need to redefine them)
// Likewise xPos: number creates a variable named number whose value is based on the parameter’s xPos.
function draw({ shape: ShapeObject, xPos: number = 100, yPos = 0 }: ShapeObject) {
    console.log(ShapeObject);
    console.log(number);
    console.log(yPos);
}

// readonly properties
interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value '${obj.prop}'.`);

    // But we can't re-assign it.
    obj.prop = "hello";
}
// It doesn't mean it's content can't be changed (if it's an object).
// But we can't reassign to that property

interface Person {
    name: string;
    age: number;
}
interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}
let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
};
// works, this is like aliasing to already created object
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
