import React, { useEffect, useState } from "react";
import { TextInput } from "./Input";
import { Button } from "./Button";

export default function ProvinceFrom({
  onSave,
  item,
  value,
  districts = [],
  isEdit = false,
  onUpdate,
}) {
  const [form, setForm] = useState({ name: "", namekm: "" });
  

  useEffect(() => {

  

    
    if (value?.type === "provinces") {
      setForm(value);
      return;
    }
    setForm({ name: "", namekm: "" });
  }, [value]);
  

  const onChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClickSave = () => {
    setForm({ name: "", namekm: "" });
    if (value.id) {
      onUpdate(form);

      return;
    }
    onSave(form);
 
  };

  console.log(form)

  const isdisable = !form.name || !form.namekm 

  console.log(isdisable)
  return (
    <div className="text-white ">
      <div className="text-2xl font-bold ">Province</div>
      <div className="flex space-x-5">
        <TextInput
          label="Name latin"
          name={"name"}
          value={form.name}
          onChange={onChange}
        />
        <TextInput
          label="Name Khmer"
          name={"namekm"}
          value={form.namekm}
          onChange={onChange}
        />
      </div>

      <Button
      isDisable = {isdisable }
        style={isEdit && "bg-red"}
        label={isEdit == false ? "Save" : "Edit and Update"}
        onClick={onClickSave}
      />
    </div>
  );
}
