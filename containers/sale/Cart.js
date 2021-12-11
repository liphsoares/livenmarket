import {
    Container, Header, Content, Button, Body, Text,
    Card, CardItem, View, Left, Right, Title, Toast, Thumbnail, Icon, Picker
} from "native-base";
import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, ImageBackground, Image, Alert, FlatList, TouchableOpacity, ScrollView } from 'react-native';

export default function Cart({ route, navigation }) {
    const [selectedValue, setSelectedValue] = useState(false);
    const [searchResults, setsearchResults] = useState([{ "id": "1", "createdAt": "2019-09-02T12:58:54.103Z", "name": "Rustic Metal Fish", "price": "289.00", "image": "http://lorempixel.com/640/480/food", "stock": 65171 }, { "id": "2", "createdAt": "2019-09-02T07:59:58.181Z", "name": "Sleek Wooden Soap", "price": "430.00", "image": "http://lorempixel.com/640/480/transport", "stock": 91260 }, { "id": "3", "createdAt": "2019-09-02T22:14:05.454Z", "name": "Small Cotton Shoes", "price": "993.00", "image": "http://lorempixel.com/640/480/sports", "stock": 36608 }, { "id": "4", "createdAt": "2019-09-02T07:36:56.139Z", "name": "Ergonomic Frozen Towels", "price": "259.00", "image": "http://lorempixel.com/640/480/nightlife", "stock": 92065 }])

    useEffect(() => {
        let arr = searchResults;
        arr.forEach((element, index) => {
            arr[index].qtde = 1;
        });

        setsearchResults(arr);
    }, [])


    function setQtde(qtde, item) {
        let arr = searchResults;
        arr.forEach((element, index) => {
            if (element.id === item.id) {
                arr[index].qtde = qtde;
            }
        });

        setsearchResults(arr);
    }
    return (
        <Container>
            <Header transparent androidStatusBarColor="transparent">
                <Left>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title>Carrinho</Title>
                </Body>
                <Right>

                </Right>
            </Header>

            <FlatList
                data={searchResults}
                renderItem={({ item, index }) => {
                    console.log(item.createdAt)
                    return (
                        <Card transparent>
                            <CardItem bordered button={true} onPress={() => {

                            }}>
                                <Left style={{ flex: 1 }}>
                                    {
                                        item.image !== '' ?
                                            <Thumbnail small source={{ uri: item.image.replace('http://lorempixel.com', 'https://loremflickr.com/') }} />
                                            : <Icon name='md-person' />
                                    }
                                    <Body>
                                        <Text>{item.name}</Text>
                                        <Text note>R$ {item.price}</Text>
                                    </Body>

                                </Left>

                                <Right >
                                    <Picker
                                        placeholder="QTDE.: 1"
                                        note
                                        mode="dialog"
                                        style={{ width: 120 }}
                                        selectedValue={item.qtde}
                                        onValueChange={(v) => {
                                            setSelectedValue(!selectedValue)
                                            setQtde(v, item)
                                        }}
                                    >
                                        <Picker.Item label="1un." value="1" />
                                        <Picker.Item label="2un." value="2" />
                                        <Picker.Item label="3un." value="3" />
                                        <Picker.Item label="4un." value="4" />
                                        <Picker.Item label="5un." value="5" />
                                        <Picker.Item label="Mais de 5 unidades" value="6" />
                                    </Picker>
                                </Right>
                            </CardItem>
                        </Card>
                    )
                }}
                keyExtractor={item => String(item.id)}
                extraData={selectedValue}
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