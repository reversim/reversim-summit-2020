import React from 'react';

const Radio = ({ id, value, values: radioValues, onChange }) => {
  return (
    <div className="mb-3">
      {radioValues.map((val, i) => {
        const optionId = `${id}${i}`;
        return (
          <div key={i}>
            <input type="radio" name={id} onChange={onChange} value={val.value} checked={val.value === value} id={optionId}/> <label htmlFor={optionId}>{val.text}</label>
          </div>
        )
      })}
    </div>
  )
};


export default ({ label, id, required, text, caption, subtitle, placeholder, inputType, multiline, fullRow, onChange, value, values, minLength, maxLength }) => {
  if (inputType === "radio") return (
    <Radio {...{ id, value, values, onChange }} />
  );

  if (caption === undefined && !required) {
    caption = 'Optional. will be presented on the website';
  }

  let valueComp;

  if (text) valueComp = text;
  else valueComp = React.DOM[multiline ? 'textarea' : 'input']({
    id,
    type: inputType || "text",
    defaultValue: value,
    placeholder,
    onChange,
    required,
    minLength,
    maxLength
  });

  const valueClass = fullRow && 'col-sm-6';

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      { subtitle && <small style={{display:'block'}} className="text-muted">{subtitle}</small> }
      <span className={valueClass}>
        {valueComp}
      </span>
      { caption && <small className="col-sm-6">{caption}</small> }
    </div>
  );
};