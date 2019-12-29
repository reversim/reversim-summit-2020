import React, {createElement} from 'react';
import styled from 'styled-components';
import {Input} from 'reactstrap';
import { 
  InputLabel,
  FormSubHeading,
 } from './GlobalStyledComponents/ReversimStyledComps';

export const SPACING = 'mb-6'; //NOTE: SHOULD BE DELETED AT THE END

const RadioLabel = styled.label`
  display: inline;
`;

const Radio = ({id, value, values: radioValues, onChange, className}) => (
  <div className={className}>
    {radioValues.map((val, i) => {
      const optionId = `${id}${i}`;
      return (
        <div key={i}>
          <input
            type="radio"
            name={id}
            onChange={onChange}
            value={val.value}
            checked={val.value === value}
            id={optionId}
          />{' '}
          <RadioLabel htmlFor={optionId}>{val.text}</RadioLabel>
        </div>
      );
    })}
  </div>
);

export default ({
  label,
  id,
  required,
  text,
  subtitle,
  placeholder,
  inputType,
  multiline,
  onChange,
  value,
  values,
  minLength,
  maxLength,
  className,
}) => {
  if (inputType === 'radio') return <Radio {...{id, value, values, onChange, className}} />;

  let valueComp;

  if (text) valueComp = text;
  else
    valueComp = createElement(Input, {
      id,
      type: multiline ? 'textarea' : inputType || 'text',
      defaultValue: value,
      placeholder,
      onChange,
      required,
      minLength,
      maxLength,
      rows: multiline ? 6 : undefined,
    });

  return (
    <div className={className}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      {subtitle && <FormSubHeading>{subtitle}</FormSubHeading>}
      {valueComp}
    </div>
  );
};
