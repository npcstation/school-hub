import { Badge } from '@mantine/core';
import React from 'react';

interface EmojiBadgeProp {
    native: string;
    count: number;
    isSelected?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export function EmojiBadge({ native, count, isSelected, onClick }: EmojiBadgeProp) {
    return (
        <Badge
            color={isSelected ? 'blue' : 'indigo'}
            size='xs'
            variant={isSelected ? 'filled' : 'light'}
            radius='xl'
            leftSection={
                <div style={{ position: 'relative', marginLeft: '-0.25rem' }}>
                    <em-emoji set='twitter' class={'icons'} native={native} size='10px'></em-emoji>
                </div>
            }
            onClick={onClick}
        >
            {count}
        </Badge>
    );
}
