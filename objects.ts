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

