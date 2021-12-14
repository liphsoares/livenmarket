import {
    Container, Header, Body, Text,
    Card, CardItem, Left, Right, Title, Thumbnail, Icon, Button, Content, Toast
} from "native-base";
import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input'

// Variável global para armazenamento dos itens do Pedido, Preferi adicionar esta varíavel do que guardar no Storage.
CART_ITEMS = [];

export default function Cart({ route, navigation }) {
    // State para Atualizar o FlatList
    const [selectedValue, setSelectedValue] = useState(false);
    // State do Data do FlatList
    const [searchResults, setsearchResults] = useState([])
    // State do Somatório total das vendas do carrinho
    const [mTotal, setmTotal] = useState(0);

    useEffect(() => {
        let arr = CART_ITEMS;

        // Seto todas as quantidades que estão indefinidas para 1
        arr.forEach((element, index) => {
            console.log(arr[index].qtde);
            if (arr[index].qtde === undefined) { arr[index].qtde = 1 }
        });

        // Passo os valores para o FlatList e também para a Variável Global e refaço o Somatório
        setsearchResults(arr);
        CART_ITEMS = arr;
        sumTotal();
    }, [])


    // Função para Setar as Quantidades
    function setQtde(qtde, item) {
        let arr = searchResults;
        arr.forEach((element, index) => {
            if (element.id === item.id) {
                arr[index].qtde = qtde;
            }
        });
        setsearchResults(arr);
        CART_ITEMS = arr;
    }

    // Função para Somar os totais
    function sumTotal() {
        let arr = CART_ITEMS;
        var v = 0;
        arr.forEach((element) => {
            v = v + Number(element.price * element.qtde);
        });
        setmTotal(v);
    }

    // Função para remover os itens do Array
    function removeItem(item) {
        let arr = CART_ITEMS;
        let idx = arr.indexOf(item);
        if (idx > -1) { arr.splice(idx, 1); }
        
        setsearchResults(arr);
        setSelectedValue(!selectedValue);
        CART_ITEMS = arr;
        sumTotal();
    }


    return (
        <Container>
            <Header transparent androidStatusBarColor="#08012a" style={{ backgroundColor: '#08012a' }}>
                <Left>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                </Left>
                <Body style={{ flex: 2 }}>
                    <Title style={{ color: "#fff" }}>Carrinho de Compras</Title>
                </Body>

                <Right >
                    {CART_ITEMS.length > 0 ? <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Market",
                            "Deseja limpar o seu carrinho de compras?",
                            [
                                {
                                    text: "SIM",
                                    onPress: () => {
                                        CART_ITEMS = []
                                        setsearchResults(CART_ITEMS);
                                        setSelectedValue(!selectedValue);
                                    },
                                    style: "default",
                                },
                                {
                                    text: "NÃO",
                                    onPress: () => { },
                                    style: "default",
                                },
                            ]
                        );
                    }}>
                        <Ionicons name="ios-trash-outline" size={24} color="#fff" />
                    </TouchableOpacity> : null}
                </Right >
            </Header>
            {searchResults.length > 0 ? <Content style={{ padding: 10 }}>
                <FlatList
                    data={searchResults}
                    renderItem={({ item, index }) => {                        
                        return (
                            <Card >
                                <CardItem bordered button={true} onPress={() => {
                                    navigation.navigate('DetailsItem', { product: item })
                                }}>
                                    <Left style={{ flex: 1 }}>
                                        {
                                            item.image !== '' ?
                                                <Thumbnail source={{ uri: item.image.replace('http://lorempixel.com', 'https://loremflickr.com/') }} />
                                                : <Icon name='md-person' />
                                        }
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text note>R$ {item.price}</Text>
                                        </Body>

                                    </Left>

                                    <Right >
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <NumericInput
                                                value={item.qtde}
                                                onChange={value => {
                                                    setQtde(value, item);
                                                    sumTotal();
                                                    setSelectedValue(!selectedValue)
                                                }}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                iconSize={25}
                                                step={1}
                                                minValue={1}
                                                valueType='real'
                                                rounded
                                                textColor='black'
                                                iconStyle={{ color: 'white' }}
                                                rightButtonBackgroundColor='#a6d7f3'
                                                leftButtonBackgroundColor='#a6d7f3' />
                                        </View>                                      
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button transparent onPress={() => {
                                            removeItem(item);
                                            Toast.show({
                                                text: "Produto Removido com Sucesso!",
                                            })
                                        }}>
                                            <Text>Remove</Text>
                                        </Button>
                                    </Left>
                                </CardItem>
                            </Card>
                        )
                    }}
                    keyExtractor={(item, index) => String(index)}
                    extraData={selectedValue}
                />
                <View style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 5,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    height: 200,
                    marginBottom: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Text note>Envio: Av Brasil 1000, Ipatinga - MG</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                        <Text style={{ flex: 1 }}>Total Com Frete </Text>

                        <Text style={{ fontWeight: 'bold', textAlign: 'right', flex: 1 }}>R$ {mTotal.toFixed(2)}</Text>

                    </View>
                    <Text note style={{ fontSize: 12, textAlign: 'right' }}>Em até 12x</Text>

                    <Button full onPress={() => {
                        navigation.navigate('HomeScreen');
                    }} style={{ borderRadius: 5, backgroundColor: '#a6d7f3', marginTop: 5 }}>
                        <Text style={{ color: '#039cf5' }}>Continuar Comprando</Text>
                    </Button>

                    <Button full onPress={() => {
                        alert('Opa..... Obrigado pela compra uai!')
                    }} style={{ borderRadius: 5, backgroundColor: '#35a65b' }}>
                        <Text>Efetuar Pagamento</Text>
                    </Button>
                </View>


            </Content> :
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 10
                }}>
                    <Text note style={{ fontSize: 30, textAlign: 'center' }}>O seu carrinho está vazio</Text>
                    <Text style={{ fontSize: 15, textAlign: 'center', color: '#ccc' }}>Clique no botão abaixo e descubra um mundo de produtos esperando por você</Text>
                    <Button full onPress={() => {
                        navigation.navigate('HomeScreen');
                    }} style={{ borderRadius: 5, backgroundColor: '#a6d7f3', marginTop: 5 }}>
                        <Text style={{ color: '#039cf5' }}>Efetuar uma Compra</Text>
                    </Button>
                </View>}
        </Container >
    )

}

const s = StyleSheet.create({
    CardStyle: {
        height: 200,
        backgroundColor: '#08012a',

        borderRadius: 16,
        marginHorizontal: 5
    },
    CardTextStyle: {
        marginTop: 20,
        color: '#78d98a',
        fontSize: 20
    },
    CardIconStyle: {
        color: '#fff'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
})