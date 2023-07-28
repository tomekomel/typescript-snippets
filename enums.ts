enum Color {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}

type ColorKey = keyof typeof Color;
type ColorValue = typeof Color[ColorKey];

const colorKey: ColorKey = 'Red';
const colorValue: ColorValue = Color[colorKey];

console.log(colorKey); // Output: 'Red'
console.log(colorValue); // Output: 'RED'

