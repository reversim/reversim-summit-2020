import React from 'react';
import { cx } from 'css/styles';

const Radio = ({ id, value, values: radioValues, onChange }) => {
  return (
    <fieldset className={cx("row")} style={{ marginBottom: 15 }}>
      <span className={cx("col-xs-12")}>
        {radioValues.map((val, i) => {
          const optionId = `${id}${i}`;
          return (
            <div key={i}>
              <input type="radio" name={id} onChange={onChange} value={val.value} checked={val.value === value} id={optionId}/> <label htmlFor={optionId}>{val.text}</label>
            </div>
          )
        })}
      </span>
    </fieldset>
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

  const valueClass = fullRow ? 'col-xs-12' : ['col-xs-12', 'col-sm-6'];

  return (
    <fieldset className={cx("row")}>
      <span className={cx("col-xs-12")}>
        <label htmlFor={id}>{label}</label>
        { subtitle ? <small style={{display:'block'}}className="text-muted">{subtitle}</small> : undefined }
      </span>
      <span className={cx(valueClass)}>
        {valueComp}
      </span>
      { caption ? <small className={cx("col-sm-6")}>{caption}</small> : undefined }
    </fieldset>
  );
};