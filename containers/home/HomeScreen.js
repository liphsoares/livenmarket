import {
    Container, Header, Body, Text,
    Card, CardItem, View, Left, Right, Title, Toast, Thumbnail, Icon, Spinner
} from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CartIcon from "../sale/components/CartIcon";

export default function HomeScreen({ props, navigation }) {
    const isFocused = useIsFocused();
    const [searchResults, setSearchResults] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [badge, setBadge] = useState(0);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (isFocused) setBadge(CART_ITEMS.length);
    }, [props, isFocused]);

    async function getData() {
        setIsLoading(true);
        fetch('https://5d6da1df777f670014036125.mockapi.io/api/v1/product', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            data.json().then((res) => {
                if (res) {
                    let arr = res;
                    console.log(arr.length)
                    arr.sort((a, b) => { return b.name > a.name })
                    setSearchResults(arr);
                    setIsLoading(false);
                    setBadge(CART_ITEMS.length);
                }
            }).catch((err) => {
                Toast.show({
                    text: err
                }, 3000);
                setIsLoading(false);
            })
        }).catch((err) => {
            setIsLoading(false);

            Alert.alert(
                "Market",
                "Não consegui carregar o Catálogo de Produtos, deseja tentar novamente?",
                [
                    {
                        text: "SIM",
                        onPress: () => getData(),
                        style: "default",
                    },
                    {
                        text: "NÃO",
                        onPress: () => { },
                        style: "default",
                    },
                ]
            );
        });
    }

    return (
        <Container>
            <Header transparent androidStatusBarColor="#08012a" style={{ backgroundColor: '#08012a' }}>
                {/* <Left /> */}
                <Body>
                    <Title style={{ color: '#fff', textAlign: 'center' }}>Web Market</Title>
                </Body>
                <Right>
                    <TouchableOpacity
                        testID="button-cart"
                        onPress={() => {
                            navigation.navigate('Cart');
                        }}>

                        <CartIcon value={badge} />
                    </TouchableOpacity >
                </Right>
            </Header>

            {IsLoading ?
                <View
                    testID="loading"
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size={64} color="#ccc" />
                    <Text note>Aguarde, Carregando...</Text>
                </View>
                :
                <FlatList

                    data={searchResults}
                    renderItem={({ item }) => {
                        return (
                            <Card transparent testID="flat-list">
                                <CardItem bordered button={true} onPress={() => {
                                    navigation.navigate('DetailsItem', { product: item })
                                }}>
                                    <Left style={{ flex: 1 }}>
                                        {
                                            item.image !== '' ?
                                                <Thumbnail large source={{ uri: item.image.replace('http://lorempixel.com', 'https://loremflickr.com/') }} />
                                                : <Icon name='md-person' />
                                        }
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text note>R$ {item.price}</Text>
                                            <Text style={{ marginTop: 10, fontSize: 10 }} note>Saldo: {item.stock}</Text>
                                        </Body>

                                    </Left>

                                    <Right style={{ flex: 0.1 }}>
                                        <Icon name="arrow-forward" size={16} />
                                    </Right>
                                </CardItem>
                            </Card>
                        )
                    }}
                    keyExtractor={item => String(item.id)}
                // ListFooterComponent={renderFooter}
                // onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={5}
                />}

        </Container>
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