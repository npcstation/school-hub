import { Badge } from '@mantine/core';
import React from 'react';

interface BadgeShowProp {
    left: JSX.Element | string;
    right: JSX.Element | string;
    color?: string;
}

export function BadgeShow({ left, right, color }: BadgeShowProp) {
    return (
        <Badge color={color} variant='outline' radius='xl' pr={0} rightSection={right}>
            {left}
        </Badge>
    );
}
