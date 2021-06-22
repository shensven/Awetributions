import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import Dashboard from './pages/Dashboard';
import {StyleSheet, View} from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
    const DashboardHeaderRight = () => {
        return (
            <View style={styles.dashboard_header_btn}>
                <IconButton
                    icon="plus-circle-outline"
                    size={20}
                    onPress={() => console.log('Pressed')}
                />
                <IconButton
                    icon="cog-outline"
                    size={20}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        title: 'Dashboard',
                        headerRight: () => <DashboardHeaderRight />,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    dashboard_header_btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default App;
