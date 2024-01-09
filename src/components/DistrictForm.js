import { SelectInput, TextInput } from "./Input";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { uuidv4 } from "@/utils";

export const DistrictForm = ({
  onSave,
  provinces,
  isEdit = false,
  value ,
  onUpdate
}) => {
  const [form, setForm] = useState({
    name: "",
    namekm: "",
    province_id: "",
  });

  const isdisable = !form.name || !form.namekm  || !form.province_id 
  console.log(form)

  console.log(isdisable)

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name,value)
    setForm({
      ...form,
      [name]: value,
    });
  };


  useEffect(() => {
    setForm({
      name: "",
      namekm: "",
      province_id: "",
    });
    if (value?.province_id && value?.district_id === undefined  ) {
      setForm(value);
      return;
    }
   
  
  }, [value]);




  const onClickSave = () => {
    setForm({
      name: "",
      namekm: "",
      province_id: "",
    });
    if (value?.type === "districts") {
     
      onUpdate(form);
  
      return;
    }
  
    onSave(form);


  };

  return (
    <div className="text-white ">
      <div className="text-2xl font-bold">DistrictFrom</div>
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

      <div className="space-y-5">
        <SelectInput
          label="Provinces:"
          onChange={onChange}
          name="province_id"
          placeholder="Please Select Provinces"
          value={form.province_id}
          options={provinces}
        />
        <Button
        isDisable={isdisable}
              style = {isEdit && 'bg-slate-600 border-0'}
              label={isEdit == false ? "Save" : "Edit and Update"}
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};
