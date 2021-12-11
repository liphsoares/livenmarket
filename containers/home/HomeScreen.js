import {
    Container, Header, Content, Button, Body, Text,
    Card, CardItem, View, Left, Right, Title, Toast, Thumbnail, Icon
} from "native-base";
import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, ImageBackground, Image, Alert, FlatList, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function HomeScreen({ route, navigation }) {
    const [IsBoletoDetails, setBoletoDetails] = useState(false);
    const [SelectedData, setSelectedData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [IsRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        getData()
    }, [])

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

                    setIsRefreshing(false);
                    setIsLoading(false);
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
            <Header transparent androidStatusBarColor="transparent">
                <Left />
                <Body>
                    <Title>Web Market</Title>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Cart');
                    }}>
                        <Ionicons name="md-cart-sharp" size={24} color="black" />
                    </TouchableOpacity>
                </Right>
            </Header>

            <FlatList
                data={searchResults}
                renderItem={({ item }) => {
                    console.log(item.createdAt)
                    return (
                        <Card transparent>
                            <CardItem bordered button={true} onPress={() => {

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

            />

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