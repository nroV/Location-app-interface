import React, { useState } from "react";
import Modal from "./Modal";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
export default function TableData({
  data = [],
  onDelete,
  children,
  onEdit,

}) {
  
  return (
    <>
      <table className="border-collapse w-full">
        <thead>
          <tr className="border-1 border-black text-center p-8 bg-slate-700 text-white p-10">
            
            <td className="text-md p-5">Provinces</td>

            <td className="text-md p-5">Total Districts</td>
            <td className="text-md p-5">Total Communes</td>
            <td className="text-md p-5">Total Villages</td>
            <td className="text-md p-5">Modify</td>
            <td className="text-md p-5">Delete</td>
          </tr>
          {children}
        </thead>

        <tbody>
          {data?.map((item) => {
            return (
              <tr className="border-1 border-black text-center p-8 bg-slate-300 text-black">
         
                <td className="text-lg p-5">{item?.province?.name}</td>
                <td>{item?.totalDistricts}</td>
                <td>{item?.totalCommunes}</td>
                <td>{item?.totalVillages}</td>
                <td>
                  {/* <!-- Modal toggle --> */}
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      onEdit(item.province);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="text-red-600"
                    onClick={() => onDelete(item)}
                  >
                    Remove
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
