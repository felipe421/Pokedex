import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackRoutes from './StackRoutes';

const Drawer = createDrawerNavigator();
export default function Routes() {

    const dimensions = useWindowDimensions();

    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: styles.backGround, headerTitleStyle: styles.headerTitleStyle, headerLeftContainerStyle: { paddingLeft: 10 },
            drawerStyle: { backgroundColor: '#00918F', borderRightColor: 'black', borderRightWidth: 2 },
            drawerType: dimensions.width >= 768 ? 'front' : 'front',
            headerTintColor: 'white'
        }}>
            <Drawer.Screen name="HomeTela" component={StackRoutes} options={{headerTitle: 'Pokedex', drawerIcon: ({ size, focused }) => <Image style={styles.icon} source={require('../assets/logoPokedex.png')} size={size} />, headerShown: false }}/>
            {/* <Drawer.Screen name="Pokedex" component={StackRoutes} options={{drawerIcon: ({size, focused}) => <Ionicons name='hourglass' color='#A9A9A9' size={size} />}}/> */}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#00918F',
    },

    headerTitleStyle: {
        color: '#FFFFFF',   //titulo na barra superior
        fontSize: 23, fontWeight: 'bold'
    },

    icon: {
        width: 25, height: 25,
        // backgroundColor: 'black'
    }
})