import React from 'react';
import Login from '../containers/login/Login'
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../containers/home/HomeScreen';
import App from '../App';
import DetailsItem from '../containers/sale/DetailsItem';
import Cart from '../containers/sale/Cart';
import { Root } from 'native-base';


jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('App', () => {
  let app;

  beforeEach(async () => {
    const component = (<App />);
    app = await waitFor(async () => render(component));

  });

  it('Renderizar o App', async () => {
    expect(app.toJSON()).toMatchSnapshot();
  });

});

describe('Login', () => {
  it('Renderizar o Login', async () => {
    const component = (
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    const home = await waitFor(async () => render(component));
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

  it('Renderizar o HomeSreen', async () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    const home = await waitFor(async () => render(component));
    const header = home.getByText('Web Market');
    expect(home.toJSON()).toMatchSnapshot();
    expect(header).toBeTruthy();
  });

  it('Botão Cart Existe', async () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    const home = await waitFor(async () => render(component));
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

    const { getByTestId } = await waitFor(async () => render(component));
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
    let Details
    await waitFor(async () =>
      Details = render(component)
    );

    expect(Details.toJSON()).toMatchSnapshot();

    const header = Details.getByText('Detalhes');
    expect(header).toBeTruthy();
  });


  it('Clique do Botao Add-to Cart', async () => {
    const { getByTestId, queryByTestId } = await waitFor(async () => render(component));
    const foundButton = getByTestId('add-to-cart');
    const foundText = queryByTestId('qtde-cart');
    expect(foundButton).toBeTruthy();

    await waitFor(async () => {
      fireEvent.press(foundButton);
    });

    await waitFor(() =>
      expect(foundText).toBeTruthy()
    );

  });

});

describe('Cart', () => {
  const component = (
    <NavigationContainer>
      <Cart />
    </NavigationContainer>
  );

  test('Renderizar o Cart', async () => {

    const cart = await waitFor(async () => render(component));
    expect(cart.toJSON()).toMatchSnapshot();
  });

  it('Clique do Botao Remove item', async () => {
    const { getByTestId, queryByText } = render(component);
    const foundButton = getByTestId('remove');
    const foundText = queryByText('Carrinho de Compras');
    expect(foundButton).toBeTruthy();

    await waitFor(async () => {
      fireEvent.press(foundButton);
    });

    await waitFor(() =>
      expect(foundText).toBeTruthy()
    );

  });

});





