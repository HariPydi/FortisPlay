import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import { Colors } from '../../styles/colors';

const Checkbox: React.FC<{ checked: boolean; onPress: () => void }> = ({ checked, onPress }) => (
    <TouchableOpacity
        style={[styles.checkbox, checked && styles.checkboxChecked]}
        onPress={onPress}
        activeOpacity={0.7}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 3,
        borderWidth: 1.71,
        borderColor: '#1F232B4D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.primaryBlue,
        borderColor: Colors.primaryBlue,
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
})

export default Checkbox;