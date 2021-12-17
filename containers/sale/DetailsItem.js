import {
    Container, Header, Content, Title, Card,  Text, Button, Left, Body, Right
} from "native-base";
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CartIcon from "./components/CartIcon";
import { useIsFocused } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
import NumericInput from 'react-native-numeric-input'

export default function DetailsItem({ route, navigation }) {
    const isFocused = useIsFocused();
    const item = route.params.product;
    const [badge, setBadge] = useState(0);
    const [images, setImages] = useState([
        item.image.replace('http://lorempixel.com', 'https://loremflickr.com/'),
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
    ]);
    const [Qtde, setQtde] = useState(1);

    useEffect(() => {
        isFocused ?
            setBadge(CART_ITEMS.length) : null

    }, [route, isFocused]);

    function changeQtde(v) {
        setQtde(v);
    }
    return (
        <Container>
            <Header transparent androidStatusBarColor="#08012a" style={{ backgroundColor: '#08012a' }}>
                <Left>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title style={{ color: '#fff' }}>Detalhes</Title>
                </Body>

                <Right>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Cart');
                    }}>
                        <CartIcon value={badge} />
                    </TouchableOpacity >
                </Right>
            </Header>

            <Content >
                <Card style={{ padding: 10 }}>
                    <Text style={{ marginBottom: 20, marginTop: 10 }}>{item.name}</Text>
                    <SliderBox
                        style={{ height: 250, width: '94%', flex: 1 }}
                        images={images}
                        sliderBoxHeight={400}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    />
                    {/* </CardItem> */}
                    <View style={{ xsflex: 1, flexDirection: 'column' }}>
                        <Text note style={{ textDecorationLine: 'line-through', fontSize: 20, marginTop: 20 }}>R$ {(Number(item.price) + 10).toFixed(2)}</Text>
                        <Text style={{ fontSize: 50 }}>R$ {item.price}</Text>
                        <Text style={{ fontSize: 15 }}>em 12x R$ {(Number(item.price) / 6).toFixed(2)}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold' }}>Estoque Disponível</Text>
                            <Text>Quantidade: {item.stock}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <NumericInput
                                value={Qtde}
                                onChange={value => {
                                    changeQtde(value);
                                    item.qtde = value
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
                    </View>

                    <Button
                        testID="button-buy"
                        full style={{ borderRadius: 5, marginTop: 20 }} onPress={() => {
                            console.log('Obrigado pela compra');
                        }}>
                        <Text style={{ color: '#fff' }}>COMPRAR</Text>
                    </Button>


                    <Button
                        testID="add-to-cart"
                        full style={{ backgroundColor: '#a6d7f3', borderRadius: 5, marginTop: 10 }} onPress={() => {
                            CART_ITEMS.push(item);

                            setBadge(CART_ITEMS.length);

                            console.log('Produto adicionado ao Carrinho');
                        }}>
                        <Text style={{ color: '#039cf5' }}>ADICIONAR AO CARRINHO</Text>
                    </Button>

                    <View style={{ xsflex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Descrição</Text>
                        <Text style={{ textAlign: 'justify', marginTop: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet proin fermentum leo vel orci porta non. Augue lacus viverra vitae congue eu consequat ac felis donec. Odio eu feugiat pretium nibh ipsum consequat nisl vel pretium. Viverra mauris in aliquam sem. Cursus mattis molestie a iaculis at. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Morbi tristique senectus et netus. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Sed pulvinar proin gravida hendrerit. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Convallis a cras semper auctor neque vitae tempus.</Text>
                    </View>
                </Card>
                {/* </View> */}
            </Content>

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