export const TextInput = ({ type = "text", label, value, name, onChange }) => {
  return (
    <div className="flex flex-col gap-3 py-3">
      <label className="text-lg">{label}</label>
      <input
        className="text-black border-blue-500 rounded-lg bg-slate-100"
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export const SelectInput = ({ label,placeholder, options = [], name, value, onChange }) => {

  return (
    <div>
      <label>{label}</label>
      <select className="text-black" onChange={onChange} name={name} value={value}>
        <option value={""}>{placeholder}</option>
         {options.map(item => <option key={item?.id} value={item?.id}>{item?.name}</option>)} 
      </select>
    </div>
  );
};
