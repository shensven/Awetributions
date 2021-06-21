import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from './pages/Dashboard';

const Stack = createStackNavigator();

const App: React.FC = () => {
    // return <Dashboard />;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{title: 'Dashboard'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
