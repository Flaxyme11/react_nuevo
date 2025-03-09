import { render, screen } from '@testing-library/react';
import App from './App';
import Muestra from './Muestra';

test('renders learn react link', () => {
  render(<App />);

  // render(<Muestra></Muestra>)
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
