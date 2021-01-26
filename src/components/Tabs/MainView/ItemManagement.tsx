import React from 'react';
import { GloomhavenItem } from "../../../State/Types";
import { Checkbox } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { storeItemsInUse} from "../../../State/RealState";
import { getRealSpoilerFilter } from "../../../State/Selectors";

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const {item} = props;
    const { enableStoreStockManagement, lockSpoilerPanel, itemsInUse } = getRealSpoilerFilter();
    const dispatch = useDispatch();

    if (!enableStoreStockManagement) {
        return (<>
                {item.count}
                </>)
    }

    const toggleItemInUse = (id: number, bit: number) => {

        const value = Object.assign({}, itemsInUse);
        value[id] = value[id] & bit ? value[id] ^ bit : value[id] | bit;

        if (value[id] === 0) {
            delete (value[id]);
        }

        dispatch(storeItemsInUse(value));
    }


    return (
        <>
            {[...Array(item.count).keys()].map(index =>
                <Checkbox key={index}
                        className={'i'+index}
                        toggle
                        disabled={lockSpoilerPanel}
                        checked={!!(itemsInUse[item.id] & Math.pow(2, index))}
                        onChange={() => toggleItemInUse(item.id, Math.pow(2, index))}/>
            )}
        </>
        );
}

export default ItemManagement;
