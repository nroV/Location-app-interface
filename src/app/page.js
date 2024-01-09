"use client";
import ProvinceFrom from "@/components/ProvinceFrom";
import { DistrictForm } from "@/components/DistrictForm";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { uuidv4 } from "@/utils";
import TableData from "@/components/TableData";
import TableDistricts from "@/components/TableDistricts";
import { CommunesForm } from "@/components/CommunesForm";
import { VillageForm } from "@/components/VillageForm";
import Modal from "@/components/Modal";
import TableEditData from "@/components/Table/TableEditData";
import { Empty } from "antd";
export default function Home() {
  const [isEdit, setEdit] = useState({
    isProvinceEdit: false,
    isDistrictEdit: false,
    isCommuneEdit: false,
    isVillageEdit: false,
  });
  const [form, setForm] = useState({});

  const [districts, setDistricts] = useState([]);

  const [communes, setCommunes] = useState([]);

  const [villages, setVillages] = useState([]);

  const [provinces, setProvinces] = useState([]);

  const onSaveProvince = (param) => {
    const id = uuidv4();

    setProvinces((pre) => {
      const result = pre.concat();

      result.push({
        id: id,
        ...param,
      });

      return [...result];
    });
  };

  const onSaveDistrict = (param) => {
    const id = uuidv4();
    setForm({ name: "", namekm: "", province_id: "", id: "" });

    setDistricts((pre) => {
      return [
        ...pre,
        {
          ...param,
          id: id,
        },
      ];
    });
  };
  const onSaveCommunes = (param) => {
    const id = uuidv4();

    const provinceId = districts?.find(
      (district) => district.id === param.district_id
    )?.province_id;

    setCommunes((pre) => {
      return [
        ...pre,
        {
          ...param,
          id: id,
        },
      ];
    });
  };

  const onSaveVillage = (param) => {
    const id = uuidv4();
    setVillages((pre) => {
      return [
        ...pre,
        {
          ...param,
          id: id,
        },
      ];
    });
  };

  const onEditProvince = (param) => {
    setEdit((pre) => {
      return {
        ...pre,

        isProvinceEdit: !isEdit.isProvinceEdit,
      };
    });

    if (isEdit.isProvinceEdit === true) {
      setForm({ id: "", name: "", namekm: "" });
    } else {
      setForm({
        id: param?.id,
        name: param?.name,
        namekm: param?.namekm,
        type: "provinces",
      });
    }
  };

  const onEditDistict = (param) => {
    setEdit((pre) => ({ ...pre, isDistrictEdit: !isEdit.isDistrictEdit }));

    if (isEdit.isDistrictEdit == true) {
      setForm({ name: "", namekm: "", province_id: "", id: "" });
      return;
    }

    setForm({
      id: param?.id,
      name: param?.name,
      namekm: param?.namekm,
      province_id: param?.province_id,
      type: "districts",
    });
  };

  const onEditVillage = (param) => {
    setEdit((pre) => ({ ...pre, isVillageEdit: !isEdit.isVillageEdit }));

    if (isEdit.isVillageEdit == true) {
      setForm({ id: "", name: "", namekm: "" });
      return;
    }

    setForm({
      id: param?.id,
      name: param?.name,
      namekm: param?.namekm,
      province_id: param?.province_id,
      district_id: param?.district_id,
      commune_id: param?.commune_id,
      type: "villages",
    });
  };

  const onEditCommune = (param) => {
    console.log(param);
    setEdit((pre) => ({ ...pre, isCommuneEdit: !isEdit.isCommuneEdit }));

    if (isEdit.isCommuneEdit == true) {
      setForm({ id: "", name: "", namekm: "" });
      return;
    }

    console.log(param);
    setForm({
      id: param?.id,
      name: param?.name,
      namekm: param?.namekm,
      province_id: param?.province_id,
      district_id: param?.district_id,
      type: "communes",
    });
  };

  const data2 = useMemo(() => {
    const id = uuidv4();

    return provinces.map((province) => {
      const districtResults = districts.filter(
        (district) => district.province_id === province.id
      );

      console.log(districtResults);
      const communeResults = communes.filter(
        (commune) =>
          districtResults.filter(
            (district) => district.id === commune.district_id
          ).length
        //[] : true
        // [].length = 0: false
      );

      const villageResults = villages?.filter((vil) =>
        communeResults?.find((com) => com.id === vil.commune_id)
      );
      const result = {
        id: id,
        province,
        totalDistricts: districtResults?.length,
        totalCommunes: communeResults?.length,
        totalVillages: villageResults?.length,
      };
      return result;
    });
  }, [provinces, districts, communes, villages]);

  console.log(data2);

  function onDeleteDistrict(param) {
    console.log(param);

    const districtId = param?.id;

    setDistricts((pre) => {
      return pre.filter((district) => district.id !== param?.id);
    });
    setCommunes(
      communes.filter((commune) => commune.district_id !== districtId)
    );

    setVillages(
      villages.filter((village) => village.district_id !== districtId)
    );
  }
  function onDeleteCommunes(param) {
    setCommunes((pre) => {
      return pre.filter((commune) => commune.id !== param?.id);
    });

    setVillages((pre) => {
      return pre.filter((village) => village.commune_id !== param?.id);
    });
  }
  function onDeleteVillages(param) {
    const districtId = communes?.find(
      (commune) => commune.id === param?.commune_id
    ).district_id;

    const provinceId = districts?.find(
      (distrct) => distrct.id === districtId
    ).province_id;

    setVillages((pre) => {
      return pre.filter((village) => village.id !== param?.id);
    });
  }
  function onDeleteProvince(param) {
    const provinceId = param?.province?.id;

    console.log(param);

    setProvinces((pre) => {
      return pre.filter((province) => province.id !== provinceId);
    });

    setDistricts((pre) => {
      return pre.filter((district) => district.province_id !== provinceId);
    });

    setCommunes(
      communes.filter((commune) => commune.province_id !== provinceId)
    );

    setVillages((pre) => {
      return pre.filter((village) => village.province_id !== provinceId);
    });
  }

  const onUpdateProvince = (param) => {
    const result = provinces?.map((province) => {
      if (province?.id === param?.id) {
        province.name = param?.name;
        province.namekm = param?.namekm;
      }
      return province;
    });
    setEdit((pre) => {
      return {
        ...pre,
        isProvinceEdit: !isEdit.isProvinceEdit,
      };
    });
    console.log(param.id);
    setProvinces(result); //refactor
  };
  const onUpdateDistricts = (param) => {
    console.log(param);

    const result = districts?.map((district) => {
      if (district?.id === param?.id) {
        district.name = param?.name;
        district.namekm = param?.namekm;
        district.province_id = param?.province_id;
      }
      return district;
    });

    setEdit((pre) => {
      return {
        ...pre,
        isDistrictEdit: !isEdit.isDistrictEdit,
      };
    });

    setDistricts(result);
  };

  const onUpdateCommunes = (param) => {
    console.log(param);

    const result = communes?.map((commune) => {
      if (commune?.id === param?.id) {
        commune.name = param?.name;
        commune.namekm = param?.namekm;
        // commune.province_id = param?.province_id
        commune.district_id = param?.district_id;
      }
      return commune;
    });
    setEdit((pre) => {
      return {
        ...pre,
        isCommuneEdit: !isEdit.isCommuneEdit,
      };
    });

    setCommunes(result);
  };
  const onUpdateVillage = (param) => {
    console.log(param);
    // {
    //   id: '8f755865-c4d3-4929-9f9e-7d92153207fd',
    //   name: 'd1',
    //   namekm: 'd1',
    //   province_id: 'fb7537cb-e3a6-415a-a154-3f6d6a1939ec'
    // }
    const result = villages?.map((village) => {
      if (village?.id === param?.id) {
        village.name = param?.name;
        village.namekm = param?.namekm;
        village.commune_id = param?.commune_id;
      }
      return village;
    });
    setEdit((pre) => {
      return {
        ...pre,
        isVillageEdit: !isEdit.isVillageEdit,
      };
    });
    console.log(param.id);
    setVillages(result);
  };

  return (
    <div className="my-10 w-full flex justify-between gap-10">
      <div className="input space-y-8">
        <ProvinceFrom
          onSave={onSaveProvince}
          districts={districts}
          value={form}
          onUpdate={onUpdateProvince}
        />
        <DistrictForm
          onSave={onSaveDistrict}
          isEdit={isEdit.isDistrictEdit}
          value={form}
          onUpdate={onUpdateDistricts}
          provinces={provinces}
        />
        <CommunesForm
          onSave={onSaveCommunes}
          districts={districts}
          provinces={provinces}
          value={form}
          onUpdate={onUpdateCommunes}
          isEdit={isEdit?.isCommuneEdit}
        />
        <VillageForm
          onSave={onSaveVillage}
          communes={communes}
          value={form}
          provinces={provinces}
          onUpdate={onUpdateVillage}
          isEdit={isEdit?.isVillageEdit}
          districts={districts}
        />
      </div>

      <div className="data space-y-6">
        {provinces.length > 0 && (
          <TableData
            data={data2}
            onDelete={onDeleteProvince} //refactor onDelete
            onEdit={onEditProvince} //refactor onEdit
          />
        )}
        {districts.length > 0 && (
          <TableEditData
            data={districts}
            provinces={provinces}
            isEdit={isEdit?.isDistrictEdit}
            onEdit={onEditDistict}
            onRemove={onDeleteDistrict}
          >
            Districts
          </TableEditData>
        )}
        {communes.length > 0 && (
          <TableEditData
            data={communes}
            provinces={provinces}
            isEdit={isEdit?.isCommuneEdit}
            onEdit={onEditCommune}
            onRemove={onDeleteCommunes}
          >
            Communes
          </TableEditData>
        )}
        {villages.length > 0&& (
          <TableEditData
            data={villages}
            provinces={provinces}
            isEdit={isEdit?.isVillageEdit}
            onEdit={onEditVillage}
            onRemove={onDeleteVillages}
          >
            Villages
          </TableEditData>
        )}
      </div>
    </div>
  );
}
