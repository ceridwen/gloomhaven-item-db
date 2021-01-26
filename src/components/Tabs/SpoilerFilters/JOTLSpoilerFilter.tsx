import React from 'react'
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeScenarioCompleted } from '../../../State/RealState';
import { getRealSpoilerFilter } from '../../../State/Selectors';

const JOTLSpoilerFilter = () => {
    const scenariosOfImportance = [2, 9, 15];
    const { scenarioCompleted } = getRealSpoilerFilter();
    const dispatch = useDispatch();

    const toggleScenarioCompleted = (key: number) => {
        const value = Object.assign([], scenarioCompleted);
        if (value.includes(key)) {
            value.splice(value.indexOf(key), 1);
        } else {
            value.push(key)
        }
        dispatch(storeScenarioCompleted(value));
    }

    return (
        <>
            <Form.Group inline className={'inline-break'}>
                <label>Scenarios Completed:</label>
                {scenariosOfImportance.map( (id) => {
                    return <Form.Checkbox key={id} label={'#' + (id + '').padStart(3, '0')}
                        checked={scenarioCompleted.includes(id)}
                        onChange={() => toggleScenarioCompleted(id)}/> 
                })}
            </Form.Group>
            <SpoilerFilterItemList ranges={[{start:14, end:14}, {start:27, end:36}]} title="Items"/>
        </>
    )
}

export default JOTLSpoilerFilter;
