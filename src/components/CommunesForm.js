import { SelectInput, TextInput } from "./Input";
import { Button } from "./Button";
import { useEffect, useMemo, useState } from "react";
import { uuidv4 } from "@/utils";

export const CommunesForm = ({
  onSave,
  districts,
  provinces,
  isEdit = false,
  value,
  onUpdate,
}) => {
  const [form, setForm] = useState({
    district_id: "",
    name: "",
    namekm: "",
    province_id: "",
  } );
  //1

  const listdistricts = useMemo(() => {
    if (form.province_id !== "") {
      return districts.filter(
        (district) => district.province_id === form.province_id
      );
    }
    return [];
  }, [form]);

  //   const [communes, setCommunes] = useState([]);
  useEffect(() => {
    if (value?.district_id && value?.commune_id ===undefined) {
      setForm(value);
      return;
    }

    setForm({
      district_id: "",
      name: "",
      namekm: "",
      province_id: "",
    });
  }, [value]);


  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    let district_id;
    if (name === "province_id") {
      district_id = districts?.find(
        (district) => district?.province_id === value
      )?.id;

      console.log(district_id);

      console.log(form);
      setForm({
        ...form,
        [name]: value,
        district_id: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const onClickSave = () => {
    setForm({ name: "", namekm: "", district_id: "", province_id: "" });
    if (value?.type === "communes") {
      onUpdate(form);

      return;
    }

    onSave(form);
  };
  const isdisable = !form.name || !form.namekm  || !form.province_id || !form.district_id
  console.log(isdisable,form)
  return (
    <div className="text-white ">
      <div className="text-2xl font-bold">Communes Form</div>
      <div className="flex space-x-5 ">
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
          //e.target.name = province_id
          //e.target.value =

          placeholder="Please Select Provinces"
          value={form.province_id}
          options={provinces}
        />
        <SelectInput
          label="Districts:"
          onChange={onChange}
          name="district_id"
          placeholder="Please Select Districts"
          value={form.district_id}
          options={listdistricts}
        />
        <Button
        isDisable={isdisable}
          style={isEdit && "bg-slate-600 border-0"}
          label={isEdit == false ? "Save" : "Edit and Update"}
          onClick={() => onClickSave()}
        />
      </div>
    </div>
  );
};
