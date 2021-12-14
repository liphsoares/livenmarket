import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function CartIcon(props) {
    return (
        <View >
            <Text style={{
                textAlign: 'center',
                color: '#08012a',
                position: 'absolute',
                fontWeight: 'bold',
                fontSize: 10,
                left: 15,
                top: 6.5,
                zIndex: 1
            }}>{props.value}</Text>
            <Ionicons name="md-cart-sharp" size={32} color="#78d98a" >
            </Ionicons>
        </View>
    )
}