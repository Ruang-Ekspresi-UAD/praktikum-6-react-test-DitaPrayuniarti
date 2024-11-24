import { render, screen, fireEvent } from '@testing-library/react';
import { Counter, Greeting, AlertButton } from './latihan';
import '@testing-library/jest-dom';
import React from 'react';

describe('Latihan Components', () => {
  // Counter Component Tests
  test('Counter Default Value must be 0', () => {
    render(<Counter />);
    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('0');
  });

  test('Increment works when button clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByTestId('increment-button');
    const counterValue = screen.getByTestId('counter-value');

    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent('1');
  });

  test('Decrement works when button clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByTestId('decrement-button');
    const counterValue = screen.getByTestId('counter-value');

    fireEvent.click(decrementButton);
    expect(counterValue).toHaveTextContent('-1');
  });

  test('Reset the count using reset button', () => {
    render(<Counter />);
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    const counterValue = screen.getByTestId('counter-value');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent('2');

    fireEvent.click(resetButton);
    expect(counterValue).toHaveTextContent('0');
  });

  // Greeting Component Tests
  test('Greeting component renders correctly with your name', () => {
    render(<Greeting name="Dita" />);
    const greeting = screen.getByTestId('greeting');
    expect(greeting).toHaveTextContent('Hello, dita');
  });

  test('Greeting component renders correctly with your lecturer\'s name', () => {
    render(<Greeting name="Pak Dosen" />);
    const greeting = screen.getByTestId('greeting');
    expect(greeting).toHaveTextContent('Hello, Pak Dosen');
  });

  // Display Component Test
  test('Display shows the correct value', () => {
    const value = 5;
    render(<p data-testid="display-value">Value: {value}</p>);
    const displayValue = screen.getByTestId('display-value');
    expect(displayValue).toHaveTextContent('Value: 5');
  });

  // AlertButton Component Tests
  test('AlertButton triggers alert with correct message when clicked', () => {
    window.alert = jest.fn(); // Mock alert
    render(<AlertButton message="This is a test alert!" />);
    const alertButton = screen.getByTestId('alert-button');

    fireEvent.click(alertButton);
    expect(window.alert).toHaveBeenCalledWith('This is a test alert!');
  });

  // Combination Tests
  test('Counter: Increment and Reset buttons work correctly together', () => {
    render(<Counter />);
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    const counterValue = screen.getByTestId('counter-value');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent('2');

    fireEvent.click(resetButton);
    expect(counterValue).toHaveTextContent('0');
  });

  test('Greeting component updates dynamically with new props', () => {
    const { rerender } = render(<Greeting name="dita" />);
    const greeting = screen.getByTestId('greeting');
    expect(greeting).toHaveTextContent('Hello, dita');

    rerender(<Greeting name="Pak Dosen" />);
    expect(greeting).toHaveTextContent('Hello, Pak Dosen');
  });
});
