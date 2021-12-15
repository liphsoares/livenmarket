import React from 'react';
import Login from './containers/login/Login'
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './containers/home/HomeScreen';



afterEach(cleanup);

describe('Login', () => {
  it('Renderizar o Login', async () => {
    const component = (
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    const home = render(component);
    const header = await home.getByText('Senha');
    expect(home.toJSON()).toMatchSnapshot();
    expect(header).toBeTruthy();
  });



  it('O Texto do Botão  ENTRAR', () => {
    const defaultText = 'ENTRAR';
    const notFoundText = 'Not found text';

    const { toJSON, getByText, queryByText } = render(<Login />);

    const foundDefaultTextElement = getByText(defaultText);
    const notFoundTextElement = queryByText(notFoundText);

    expect(foundDefaultTextElement.props.children).toEqual(defaultText);
    expect(notFoundTextElement).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it('Renderizar Botão Login', () => {
    const testIdName = 'btn-how-to-login';

    const { getByTestId } = render(<Login />);

    const foundButton = getByTestId(testIdName);

    expect(foundButton).toBeTruthy();
  });

});

describe('HomeScreen', () => {

  it('Renderizar o HomeSreen', async () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    const home = render(component);
    const header = await home.getByText('Web Market');
    expect(home.toJSON()).toMatchSnapshot();
    expect(header).toBeTruthy();
  });

  it('Botão Cart Existe', () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    const home = render(component);
    const testIdName = 'button-cart';
    const foundButton = home.getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
  });

  it('Renderizar Spinner', async () => {

    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    const { getByTestId } = render(component);
    const foundSpinner = getByTestId('loading');

    expect(foundSpinner).toBeTruthy();
  });

 
});





