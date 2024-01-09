import { SelectInput, TextInput } from "./Input";
import { Button } from "./Button";
import { useEffect, useMemo, useState } from "react";
import { uuidv4 } from "@/utils";

export const VillageForm = ({
  onSave,
  provinces,
  communes,
  districts,
  isEdit = false,
  value,
  onUpdate,
}) => {
  const [form, setForm] = useState({
    district_id: "",
    name: "",
    namekm: "",
    province_id: "",
    commune_id: "",
  });
  const isdisable =
    !form.name ||
    !form.namekm ||
    !form.province_id ||
    !form.district_id ||
    !form.commune_id;

  const listdistricts = useMemo(() => {
    if (form.province_id !== "") {
      console.log(form);

      return districts.filter(
        (district) => district.province_id === form.province_id
      );
    }
    return [];
  }, [form]);

  const listcommunes = useMemo(() => {
    if (form.province_id !== "") {
      return communes.filter(
        (commune) => commune.district_id === form.district_id
      );
    }
    return [];
  }, [form]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === "province_id") {
      setForm({
        ...form,
        [name]: value,
        district_id: "",
      });
    }

    if (name === "district_id") {
      setForm({
        ...form,
        [name]: value,
        commune_id: "",
      });
    }

    if (name === "commune_id") {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const onClickSave = () => {
    setForm({
      name: "",
      namekm: "",
      commune_id: "",
      district_id: "",
      province_id: "",
    });
    if (isEdit === true) {
      onUpdate(form);

      return;
    }
    onSave(form);
  };

  useEffect(() => {
    if ((value?.type === "villages")) {
      setForm(value);
      return;
    }

    setForm({
      name: "",
      namekm: "",
      commune_id: "",
      district_id: "",
      province_id: "",
    });
  }, [value]);
  console.log(value);
  return (
    <div className="text-white ">
      <div className="text-2xl font-bold">Village Form</div>
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
        <SelectInput
          label="Communes:"
          onChange={onChange}
          name="commune_id"
          placeholder="Please Select Communes"
          value={form.commune_id}
          options={listcommunes}
        />
        <Button
          isDisable={isdisable}
          label={isEdit == false ? "Save" : "Edit and Update"}
          style={isEdit && "bg-slate-600 border-0"}
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};
