import React, { useState } from 'react';
import { Button, Container, View, Item, Input, Label, Header, Spinner } from 'native-base';
import { TouchableOpacity, Text, KeyboardAvoidingView, Platform,  StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login({ props, navigation }) {
    const [Username, setUsername] = useState('');
    const [Pwd, setPwd] = useState('');
    const [isSecureTextEntry, setisSecureTextEntry] = useState(true);
    const [IsLoading, setIsLoading] = useState(false);
    return (
        <Container style={{backgroundColor: "#08012a",}}>
            <Header transparent androidStatusBarColor="transparent" style={{ backgroundColor: 'transparent', height: 0 }} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null} enabled>

                <View style={{
                    flex: 1,
                    
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                }} >
                    <Image style={{ width: 240, height: 80, bottom: 100 }} source={require('../../assets/images/logo-2x.png')} />
                    <View style={{
                        alignSelf: 'center',
                        alignContent: 'center',
                        width: '90%',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        padding: 30,
                        borderRadius: 16,
                        marginBottom: 50
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Item floatingLabel style={{ width: '100%' }}>
                                <Label style={{ color: '#08012a' }}>Informe seu cpf ou cnpj</Label>
                                <Input
                                    style={{ color: '#08012a' }}
                                    keyboardType="number-pad"
                                    value={Username}
                                    onChangeText={(value) => {

                                    }}
                                />
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Item floatingLabel style={{ width: '100%' }} >
                                <Label style={{ color: '#08012a' }}>Senha</Label>
                                <Input secureTextEntry={isSecureTextEntry}
                                    style={{ color: '#08012a' }}
                                    value={Pwd}
                                    onChangeText={(value) => { }}
                                    onSubmitEditing={() => {

                                    }}
                                />
                            </Item>
                            <Button style={{ right: 0, position: 'absolute' }} transparent onPress={() => {

                            }}>
                                <MaterialIcons
                                    name={isSecureTextEntry ? "visibility" : "visibility-off"} size={24} color="#fff" />
                            </Button>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 40
                        }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                navigation.navigate('HomeScreen', { username: Username });
                            }}>
                                <Text style={{ color: '#08012a', textAlign: 'left', fontSize: 12 }}>Primeiro acesso</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                navigation.navigate('ForgotPassword', { username: Username });
                            }}>
                                <Text style={{ color: '#08012a', textAlign: 'right', fontSize: 12 }}>Esqueci minha senha</Text>
                            </TouchableOpacity>
                        </View>

                        {IsLoading ?
                            <Spinner color="#fff" />
                            : <Button full style={{ marginTop: 20, backgroundColor: "#78d98a" }}
                                onPress={() => {
                                   navigation.navigate('HomeScreen')

                                }}>
                                <Text style={{ color: '#08012a', fontSize: 20, fontWeight:'bold' }}>ENTRAR</Text>
                            </Button>}
                    </View>
                </View>

            </KeyboardAvoidingView>
        </Container >
    )
}

const styles = StyleSheet.create({

    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
});