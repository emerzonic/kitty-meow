import React from 'react';
export default function Row(props: { name: string; rating?: number; }) {
    if (props.rating === undefined) {
        return null;
    }
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.rating}</td>
        </tr>
    );
}
