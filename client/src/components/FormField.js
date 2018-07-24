import React, {createElement} from 'react';
import {Input} from 'reactstrap';

export const SPACING = 'mb-6';

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
          <label htmlFor={optionId}>{val.text}</label>
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
      <label htmlFor={id}>{label}</label>
      {subtitle && <small className="d-block text-muted mb-2">{subtitle}</small>}
      {valueComp}
    </div>
  );
};
