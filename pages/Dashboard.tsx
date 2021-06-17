import React from 'react';
import {View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';

const statusBarHeight = StatusBar.currentHeight;

const Dashboard: React.FC = () => {
    return (
        <View style={styles.root}>
            <StatusBar
                // translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode="always">
                <Text style={styles.header_title}>Dashboard</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
                <Text style={styles.header_subtitle}>Subtitle</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        marginTop: statusBarHeight,
    },
    header_title: {
        fontSize: 34,
        fontWeight: '800',
        marginTop: 8,
        marginLeft: 20,
    },
    header_subtitle: {
        marginLeft: 21,
    },
});

export default Dashboard;
