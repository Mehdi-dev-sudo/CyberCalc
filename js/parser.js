// Secure Math Expression Parser - No eval() used
export class MathParser {
  constructor() {
    this.operators = {
      '+': { precedence: 1, associativity: 'L' },
      '-': { precedence: 1, associativity: 'L' },
      '*': { precedence: 2, associativity: 'L' },
      '/': { precedence: 2, associativity: 'L' },
      '^': { precedence: 3, associativity: 'R' },
    };

    this.functions = {
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      sqrt: Math.sqrt,
      ln: Math.log,
      log: Math.log10,
      abs: Math.abs,
    };
  }

  // Tokenize the expression
  tokenize(expression) {
    const tokens = [];
    let i = 0;

    while (i < expression.length) {
      let char = expression[i];

      // Skip whitespace
      if (/\s/.test(char)) {
        i++;
        continue;
      }

      // Numbers (including decimals)
      if (/\d/.test(char) || char === '.') {
        let num = '';
        while (
          i < expression.length &&
          (/\d/.test(expression[i]) || expression[i] === '.')
        ) {
          num += expression[i];
          i++;
        }
        tokens.push({ type: 'number', value: parseFloat(num) });
        continue;
      }

      // Operators
      if ('+-*/^'.includes(char)) {
        tokens.push({ type: 'operator', value: char });
        i++;
        continue;
      }

      // Parentheses
      if (char === '(' || char === ')') {
        tokens.push({ type: 'paren', value: char });
        i++;
        continue;
      }

      // Functions
      if (/[a-zA-Z]/.test(char)) {
        let func = '';
        while (i < expression.length && /[a-zA-Z]/.test(expression[i])) {
          func += expression[i];
          i++;
        }
        if (this.functions[func]) {
          tokens.push({ type: 'function', value: func });
        } else {
          throw new Error(`Unknown function: ${func}`);
        }
        continue;
      }

      throw new Error(`Unexpected character: ${char}`);
    }

    return tokens;
  }

  // Convert infix to postfix (Shunting Yard Algorithm)
  infixToPostfix(tokens) {
    const output = [];
    const operators = [];

    for (let token of tokens) {
      if (token.type === 'number') {
        output.push(token);
      } else if (token.type === 'function') {
        operators.push(token);
      } else if (token.type === 'operator') {
        while (
          operators.length > 0 &&
          operators[operators.length - 1].type === 'operator' &&
          ((this.operators[token.value].associativity === 'L' &&
            this.operators[token.value].precedence <=
              this.operators[operators[operators.length - 1].value]
                .precedence) ||
            (this.operators[token.value].associativity === 'R' &&
              this.operators[token.value].precedence <
                this.operators[operators[operators.length - 1].value]
                  .precedence))
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      } else if (token.type === 'paren') {
        if (token.value === '(') {
          operators.push(token);
        } else {
          while (
            operators.length > 0 &&
            operators[operators.length - 1].value !== '('
          ) {
            output.push(operators.pop());
          }
          if (operators.length === 0) {
            throw new Error('Mismatched parentheses');
          }
          operators.pop(); // Remove '('
          if (
            operators.length > 0 &&
            operators[operators.length - 1].type === 'function'
          ) {
            output.push(operators.pop());
          }
        }
      }
    }

    while (operators.length > 0) {
      if (operators[operators.length - 1].value === '(') {
        throw new Error('Mismatched parentheses');
      }
      output.push(operators.pop());
    }

    return output;
  }

  // Evaluate postfix expression
  evaluatePostfix(postfix) {
    const stack = [];

    for (let token of postfix) {
      if (token.type === 'number') {
        stack.push(token.value);
      } else if (token.type === 'operator') {
        if (stack.length < 2) {
          throw new Error('Invalid expression');
        }
        const b = stack.pop();
        const a = stack.pop();
        let result;

        switch (token.value) {
          case '+':
            result = a + b;
            break;
          case '-':
            result = a - b;
            break;
          case '*':
            result = a * b;
            break;
          case '/':
            if (b === 0) throw new Error('Division by zero');
            result = a / b;
            break;
          case '^':
            result = Math.pow(a, b);
            break;
          default:
            throw new Error(`Unknown operator: ${token.value}`);
        }

        stack.push(result);
      } else if (token.type === 'function') {
        if (stack.length < 1) {
          throw new Error('Invalid expression');
        }
        const a = stack.pop();
        const result = this.functions[token.value](a);
        stack.push(result);
      }
    }

    if (stack.length !== 1) {
      throw new Error('Invalid expression');
    }

    return stack[0];
  }

  // Main parse method
  parse(expression) {
    try {
      const tokens = this.tokenize(expression);
      const postfix = this.infixToPostfix(tokens);
      const result = this.evaluatePostfix(postfix);

      if (!isFinite(result)) {
        throw new Error('Result is not finite');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
