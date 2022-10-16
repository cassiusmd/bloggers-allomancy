import {Text} from '@mantine/core';
import React from 'react';

export default function Copyright(props: any) {
    return (
        <Text
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'©'}
            <Text component={'span'}>Allomancy</Text>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Text>
    );
}
