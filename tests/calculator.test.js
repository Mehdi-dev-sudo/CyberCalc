import { MathParser } from '../js/parser.js';

describe('CyberCalc - Parser Tests', () => {
  let parser;

  beforeEach(() => {
    parser = new MathParser();
  });

  describe('Basic Operations', () => {
    test('addition of positive numbers', () => {
      expect(parser.parse('2+2')).toBe(4);
      expect(parser.parse('10+5')).toBe(15);
      expect(parser.parse('100+200')).toBe(300);
    });

    test('subtraction', () => {
      expect(parser.parse('10-5')).toBe(5);
      expect(parser.parse('100-50')).toBe(50);
      expect(parser.parse('5-10')).toBe(-5);
    });

    test('multiplication', () => {
      expect(parser.parse('3*4')).toBe(12);
      expect(parser.parse('10*5')).toBe(50);
      expect(parser.parse('7*8')).toBe(56);
    });

    test('division', () => {
      expect(parser.parse('10/2')).toBe(5);
      expect(parser.parse('100/4')).toBe(25);
      expect(parser.parse('15/3')).toBe(5);
    });

    test('modulo operation', () => {
      expect(parser.parse('10%3')).toBe(1);
      expect(parser.parse('17%5')).toBe(2);
      expect(parser.parse('100%7')).toBe(2);
    });
  });

  describe('Order of Operations', () => {
    test('multiplication and addition', () => {
      expect(parser.parse('2+3*4')).toBe(14);
      expect(parser.parse('10+5*2')).toBe(20);
    });

    test('division and subtraction', () => {
      expect(parser.parse('10-8/2')).toBe(6);
      expect(parser.parse('20-10/5')).toBe(18);
    });

    test('parentheses', () => {
      expect(parser.parse('(2+3)*4')).toBe(20);
      expect(parser.parse('(10-5)*2')).toBe(10);
      expect(parser.parse('2*(3+4)')).toBe(14);
    });

    test('nested parentheses', () => {
      expect(parser.parse('((2+3)*4)+5')).toBe(25);
      expect(parser.parse('2*((3+4)*5)')).toBe(70);
    });
  });

  describe('Decimal Numbers', () => {
    test('decimal addition', () => {
      expect(parser.parse('1.5+2.5')).toBe(4);
      expect(parser.parse('0.1+0.2')).toBeCloseTo(0.3, 10);
    });

    test('decimal multiplication', () => {
      expect(parser.parse('2.5*4')).toBe(10);
      expect(parser.parse('1.5*2.5')).toBe(3.75);
    });

    test('division with decimal result', () => {
      expect(parser.parse('5/2')).toBe(2.5);
      expect(parser.parse('7/4')).toBe(1.75);
    });
  });

  describe('Negative Numbers', () => {
    test('operations with negative numbers', () => {
      expect(parser.parse('-5+10')).toBe(5);
      expect(parser.parse('10+(-5)')).toBe(5);
      expect(parser.parse('-5*2')).toBe(-10);
      expect(parser.parse('-10/-2')).toBe(5);
    });

    test('negating results', () => {
      expect(parser.parse('-(5+3)')).toBe(-8);
      expect(parser.parse('-(10-15)')).toBe(5);
    });
  });
});

describe('Scientific Functions', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('trigonometric functions', () => {
    expect(parser.parse('sin(0)')).toBe(0);
    expect(parser.parse('cos(0)')).toBe(1);
    expect(parser.parse('tan(0)')).toBe(0);
  });

  test('square root and power', () => {
    expect(parser.parse('sqrt(16)')).toBe(4);
    expect(parser.parse('sqrt(25)')).toBe(5);
    expect(parser.parse('2^8')).toBe(256);
    expect(parser.parse('3^3')).toBe(27);
  });

  test('logarithms', () => {
    expect(parser.parse('log(100)')).toBe(2);
    expect(parser.parse('log(1000)')).toBe(3);
    expect(parser.parse('ln(2.718281828459045)')).toBeCloseTo(1, 10);
  });

  test('absolute value', () => {
    expect(parser.parse('abs(-5)')).toBe(5);
    expect(parser.parse('abs(5)')).toBe(5);
    expect(parser.parse('abs(-10.5)')).toBe(10.5);
  });
});

describe('Bitwise Operations', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('AND operation', () => {
    expect(parser.parse('5&3')).toBe(1);
    expect(parser.parse('12&10')).toBe(8);
  });

  test('OR operation', () => {
    expect(parser.parse('5|3')).toBe(7);
    expect(parser.parse('12|10')).toBe(14);
  });

  test('XOR operation', () => {
    expect(parser.parse('5 xor 3')).toBe(6);
    expect(parser.parse('12 xor 10')).toBe(6);
  });

  test('NOT operation', () => {
    expect(parser.parse('not(5)')).toBe(-6);
    expect(parser.parse('not(0)')).toBe(-1);
  });

  test('left shift', () => {
    expect(parser.parse('5<<1')).toBe(10);
    expect(parser.parse('8<<2')).toBe(32);
  });

  test('right shift', () => {
    expect(parser.parse('10>>1')).toBe(5);
    expect(parser.parse('16>>2')).toBe(4);
  });
});

describe('Edge Cases', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('division by zero', () => {
    expect(() => parser.parse('5/0')).toThrow('Division by zero');
  });

  test('very large numbers', () => {
    expect(parser.parse('999999999+1')).toBe(1000000000);
    expect(parser.parse('1000000*1000000')).toBe(1000000000000);
  });

  test('very small numbers', () => {
    expect(parser.parse('0.0001*0.0001')).toBeCloseTo(0.00000001, 10);
  });
});

describe('Performance Tests', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('fast calculation', () => {
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      parser.parse('2+2*3');
    }
    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`1000 calculations in ${duration.toFixed(2)}ms`);
    expect(duration).toBeLessThan(1000);
  });
});

describe('Integration Tests', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('combination of different operations', () => {
    expect(parser.parse('((2+3)*4-10)/2')).toBe(5);
    expect(parser.parse('100-50*2+25/5')).toBe(5);
  });

  test('complex expressions', () => {
    expect(parser.parse('(10+20)*(5-3)+100/10')).toBe(70);
    expect(parser.parse('((5*5)-10)+((20/4)*3)')).toBe(30);
  });
});

describe('Security Tests', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('malicious inputs should throw', () => {
    const maliciousInputs = [
      'alert("XSS")',
      'window.location="evil.com"',
      'document.cookie',
    ];

    maliciousInputs.forEach(input => {
      expect(() => parser.parse(input)).toThrow();
    });
  });
});

describe('Input Validation', () => {
  let parser;

  beforeAll(() => {
    parser = new MathParser();
  });

  test('empty input', () => {
    expect(() => parser.parse('')).toThrow();
  });

  test('invalid input', () => {
    expect(() => parser.parse('abc')).toThrow();
  });

  test('unbalanced parentheses', () => {
    expect(() => parser.parse('(5+3')).toThrow();
    expect(() => parser.parse('5+3)')).toThrow();
    expect(() => parser.parse('((5+3)')).toThrow();
  });
});
