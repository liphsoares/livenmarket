import React from 'react';
import Login from './containers/login/Login'
import {cleanup, render, fireEvent} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './containers/home/HomeScreen';


afterEach(cleanup);

describe('Login', () => {

  it('O Texto do Botão  ENTRAR', () => {
    const defaultText = 'ENTRAR';
    const notFoundText = 'Not found text';

    const {toJSON, getByText, queryByText} = render(<Login />);

    const foundDefaultTextElement = getByText(defaultText);
    const notFoundTextElement = queryByText(notFoundText);

    expect(foundDefaultTextElement.props.children).toEqual(defaultText);
    expect(notFoundTextElement).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });
 
  it('Renderizar Botão Login', () => {
    const testIdName = 'btn-how-to-login';

    const {getByTestId} = render(<Login />);

    const foundButton = getByTestId(testIdName);

    expect(foundButton).toBeTruthy();
  });

});

describe('HomeScreen', () => {

  it('Renderizar o HomeSreen', () => {
    const home = render(<HomeScreen />);
    expect(home.toJSON()).toMatchSnapshot();
  });
 
});

