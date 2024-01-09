import React, { useState } from "react";
import Modal from "./Modal";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
export default function TableDistricts({ data = [], deleteprovince, districts,children }) {
  const [isPopup, setPopup] = useState(false);
  const [province, setProvince] = useState({});

  const onshowPopup = (item) => {
    setPopup((pre) => !pre);
    setProvince(data.find((province) => province.id === item?.id));
  };
  const [modal, setModal] = useState(false);
  console.log(province);
  return (
    <>
      <table className="border-collapse w-full">
        <thead>

          {children}
        </thead>

        <tbody>
          {data?.map((item) => {
            return (
              <tr className="border-1 border-black text-center p-8 bg-slate-300 text-black">
                <td>{item?.districts?.name} </td>
                <td>{item?.totalCommunes}</td>
                <td>{item?.totalVillages}</td>
                <td>
                  {/* <!-- Modal toggle --> */}
                  <button
                    className="text-blue-600"
                    onClick={() => setModal(pre=>!pre)}
                  >
                    Edit
                  </button>

          
                  
                </td>
                <td>
                  <button
                    className="text-red-600"
                    onClick={() => deleteprovince(item?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
