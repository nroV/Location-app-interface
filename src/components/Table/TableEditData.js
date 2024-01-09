import React from "react";

export default function TableEditData({
  children,
  data = [],
  onEdit,
  onRemove,
}) {
  const result = data;

  return (
    <>
      <table className="border-collapse w-full">
        <thead>
          <tr
            className="border-1 border-black text-center p-8 bg-slate-700 text-white
          "
          >
            <td className="text-md p-5">{children} Id </td>
            <td className="text-md p-5">Name </td>
            <td className="text-md p-5">Name/Kh </td>

            <td className="text-md p-5">Modify</td>
            <td className="text-md p-5">Delete</td>
          </tr>
        </thead>
        <tbody>
          {result?.map((item) => {
            console.log(item);
            return (
              <tr
                className="border-1
               border-black text-center p-8 bg-slate-100 text-black "
              >
                <td className="text-md p-5">{item?.id}</td>
                <td className="text-md p-5">{item?.name}</td>
                <td className="text-md p-5">{item?.namekm}</td>
                {/* <td>{item?.province_id}</td> */}
                <td className="text-md p-5">
                  {/* <!-- Modal toggle --> */}
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      // setForm({ name: "", namekm: "", id:"" });
                      onEdit(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="text-md p-5">
                  <button
                    className="text-red-600"
                    onClick={() => onRemove(item)}
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
