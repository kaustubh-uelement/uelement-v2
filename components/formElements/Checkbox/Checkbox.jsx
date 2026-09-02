import React from 'react';

const Checkbox = ({
  wrapperClassName = '',
  inputClassName = '',
  labelClassName = '',
  label,
  id = '',
  checked = false,
  onChange = (_e) => {},
}) => {
  return (
    <div className={`${wrapperClassName} flex items-center gap-2`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`${inputClassName} peer size-[20px] appearance-none bg-[#E0E0E0] checked:bg-black cursor-pointer rounded-full block relative after:content-[''] after:block after:absolute after:left-[6px] after:top-[6px] after:w-[9px] after:h-[5px] after:border-l after:border-l-white after:border-b after:border-b-white after:rotate-[318deg]`}
      />
      <label
        htmlFor={id}
        className={`${labelClassName} cursor-pointer select-none text-14 font-reddit-sans text-[#8D8D8D] peer-checked:text-[#4D4C4C]`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
