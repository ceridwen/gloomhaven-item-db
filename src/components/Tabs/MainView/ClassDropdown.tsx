import React, { useEffect, useState } from 'react'
import { Image, Dropdown } from 'semantic-ui-react';
import { PullDownOptions } from '../../../State/Types';

type Props  = {
  className?:string;
  optionsList: PullDownOptions[];
  onChange?: (option:PullDownOptions) => void;
  disabled?:boolean;
}

export const createClassImage = (option:PullDownOptions) => {
  return <Image key={option} src={require(`../../../img/classes/${option}.png`)} className={'soloClass'}/>;
}

const ClassDropdown = (props:Props) => {
    const {disabled, className, onChange, optionsList} = props;

    const [selectedOption, setSelectedOption] = useState<PullDownOptions>(optionsList[0]);

    useEffect( () => {
      if (!optionsList.includes(selectedOption)) {
        onSelectOption(optionsList[0])
      }

    }, [optionsList])

    const onSelectOption = (option:PullDownOptions) => {
       setSelectedOption(option);
       if (onChange) {
        onChange(option)
       }
    };

    const options = () => {
      const opts:any = [];
      return opts.concat(optionsList.map(option => {
        return { onClick:() => {onSelectOption(option)}, key: option, image: createClassImage(option)    }
      }));
    };

    if (!selectedOption) {
      return null;
    }

    return <Dropdown
      scrolling={true}
      labeled={true}
      disabled={disabled}
      className={className}
      trigger={createClassImage(selectedOption)}
      pointing='top left'
      icon={null}
      options={options()}
    />     
}

export default ClassDropdown;