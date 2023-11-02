import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackRoutes from './StackRoutes';

const Drawer = createDrawerNavigator();
export default function Routes() {

    const dimensions = useWindowDimensions();

    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: styles.backGround, headerTitleStyle: styles.headerTitleStyle,
            drawerStyle: { backgroundColor: '#00918F', borderRightColor: 'white', borderRightWidth: 2 }, drawerLabelStyle: { letterSpacing: 2, color: '#00918F', fontSize: 18 },
            drawerType: dimensions.width >= 768 ? 'front' : 'front', drawerItemStyle: { backgroundColor: 'white' },
            headerTintColor: 'white'
        }}>
            <Drawer.Screen name="HomeTela" component={StackRoutes}
                options={{ drawerLabel: 'Pokedex', drawerIcon: ({ size, focused }) => <Image style={styles.icon} source={require('../assets/logoPokedex.png')} size={size} tintColor='#00918F' />, headerShown: false, drawerItemStyle: {marginHorizontal: 0, backgroundColor: 'white', borderRadius: 0} }}
            />
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
        width: 25, height: 25
        // backgroundColor: 'black'
    }
})