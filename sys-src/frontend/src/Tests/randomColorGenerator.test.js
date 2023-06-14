import { generateRandomColor } from "../randomColorGenerator";

describe('generateRandomColor.js tests', () => {
    test('should return a string', () => {
      const result = generateRandomColor();
      expect(typeof result).toBe('string');
    });
  
    test('should return a valid hex color code', () => {
      const result = generateRandomColor();
      const regex = /^#[0-9A-F]{6}$/i;
      expect(result).toMatch(regex);
    });
  
    test('should generate different color codes', () => {
      const color1 = generateRandomColor();
      const color2 = generateRandomColor();
      expect(color1).not.toBe(color2);
    });
  });