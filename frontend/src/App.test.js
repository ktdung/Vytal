/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';

jest.mock('./components/workerSetup.js');

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
