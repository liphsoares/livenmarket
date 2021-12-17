import React from 'react';
import Login from './containers/login/Login'
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './containers/home/HomeScreen';
import App from './App';
import DetailsItem from './containers/sale/DetailsItem';
import Cart from './containers/sale/Cart';
import { Root } from 'native-base';



afterEach(cleanup);

describe('App', () => {
  it('Renderizar o App', () => {
    const component = (
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );
    const home = render(component);
    expect(home.toJSON()).toMatchSnapshot();
  });

});

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

    const { getByText, queryByText } = render(<Login />);

    const foundDefaultTextElement = getByText(defaultText);
    const notFoundTextElement = queryByText(notFoundText);

    expect(foundDefaultTextElement.props.children).toEqual(defaultText);
    expect(notFoundTextElement).toBeNull();
  });

  it('Renderizar Botão Login', () => {
    const testIdName = 'btn-how-to-login';

    const { getByTestId } = render(<Login />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
  });

});

describe('HomeScreen', () => {

  it('Renderizar o HomeSreen', () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    const home = render(component);
    const header = home.getByText('Web Market');
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

describe('DetailsItem', () => {
  const json = { "id": "1", "createdAt": "2019-09-02T12:58:54.103Z", "name": "Rustic Metal Fish", "price": "289.00", "image": "http://lorempixel.com/640/480/food", "stock": 65171 }
  const props = {
    navigation: '',
    route: { params: { product: json } }
  }

  const component = (
    <Root>
      <NavigationContainer>
        <DetailsItem {...props} />
      </NavigationContainer>
    </Root>
  );


  it('Renderizar o DetailsItem', async () => {

    const Details = render(component);
    const header = Details.getByText('Detalhes');
    expect(Details.toJSON()).toMatchSnapshot();
    expect(header).toBeTruthy();
  });


  it('Clique do Botao Add-to Card', async () => {
    const logSpy = jest.spyOn(console, "Carrinho");    
    const { getByTestId } = render(component);
    const foundButton = getByTestId('add-to-cart');
    expect(foundButton).toBeTruthy();
    await fireEvent.press(foundButton);
    expect(logSpy).toHaveBeenCalledTimes(1);
  });


  it('Clique do Botao Comprar', async () => {
    const logSpy = jest.spyOn(console, "compra");    
    const { getByTestId } = render(component);
    const foundButton = getByTestId('button-buy');

    expect(foundButton).toBeTruthy();
    await fireEvent.press(foundButton);
    expect(logSpy).toHaveBeenCalledTimes(1);
  });





});

describe('Cart', () => {
  test('Renderizar o Cart', async () => {

    const cart = render(<Cart />).toJSON();;
    expect(cart).toMatchSnapshot();
  });

});





