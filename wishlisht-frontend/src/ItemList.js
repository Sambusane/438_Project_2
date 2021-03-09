import React from 'react';
import ReactDOM from 'react-dom';

function menu(items){
    const list = items.item();

    const updatedList = list.map((listItems) => {
        return <li>{listItems}</li>
    });

    return(
        <u1>{updatedList}</u1>
    );

}