import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection } from '../../../State/Types';
import { useDispatch } from 'react-redux';
import SearchOptions from './SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { storeSortingProperty, storeSortingDirection,  } from '../../../State/RealState';
import { getRealSpoilerFilter, getItemViewState } from '../../../State/Selectors';

type Props = {
    items : GloomhavenItem[];
}

const ItemList = (props:Props) => {
    const {items} = props;
    const { displayAs, all } = getRealSpoilerFilter();
    const { property, direction } = getItemViewState();
    const dispatch = useDispatch();

        const setSorting = (newProperty: SortProperty) => {
            let newDirection:SortDirection;
            if (property === newProperty) {
                newDirection = direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
            } else {
                newDirection = SortDirection.ascending;
            }

            dispatch(storeSortingProperty(newProperty));
            dispatch(storeSortingDirection(newDirection));
        }
        
    return (
        <>
            <SearchOptions setSorting={setSorting}/>
            {all &&  (
                <Message negative>
                    <Message.Header><Icon name="exclamation triangle"/>Spoiler alert</Message.Header>
                    You are currently viewing all possible items.
                </Message>
            )}
            {items.length === 0 && 
                <Message negative>
                    No items found matching your filters and/or search criteria
                </Message>
            }

            {displayAs === 'list' ? <ItemTable items={items} setSorting={setSorting}/> : <ItemGrid items={items}/>}

        </>
    );

}

export default ItemList;
