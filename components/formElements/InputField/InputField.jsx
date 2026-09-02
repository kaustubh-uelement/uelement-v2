const InputField = ({
  wrapperClassName = "flex flex-col gap-2",
  label,
  labelClassName = "font-reddit-sans text-[15px] font-semibold text-[#232223]",
  inputClassName = "w-full bg-transparent border-b border-[#D7D7D7] outline-none focus:border-black font-reddit-sans text-[14px] text-[#232223] placeholder:text-[#808080] py-2 px-0 transition-colors",
  type = "text",
  name = "",
  value,
  onChangeHandler = (_e) => {},
  onBlur = (_e) => {},
  placeholder = "",
  errMsg = "",
}) => {
  return (
    <div className={wrapperClassName}>
      <label className={labelClassName}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClassName}
      />
      {errMsg && <p className="text-12 text-red-600">{errMsg}</p>}
    </div>
  );
};

export default InputField;
