import { callSearchEmployeeByDept } from "@/api/apiHelper";
import { getConfig } from "@/config/env";
import { toMobileFormat } from "@/utils/format";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

const Example21 = () => {
  const [textDept, setTextDept] = useState();
  const [dataList, setDataList] = useState();
  const handleSeach = async () => {
    const resp = await callSearchEmployeeByDept(textDept);
    setDataList(resp?.data);
  };

  const handleExport = type => {
    window.open(
      `${getConfig(
        "baseApi"
      )}/api/profile/export?type=${type}&deptId=${textDept}`,
      "_blank",
      "noreferrer"
    );
  };
  return (
    <div className="flex flex-col mt-3 px-3">
      <div className="flex flex-row items-center gap-2 mb-2 bg-[#DEE2E6] px-3 py-3">
        <span>รหัสส่วนงาน: </span>
        <TextField
          id="text-dept"
          placeholder="รหัสส่วนงาน"
          size="small"
          className="w-[350px] bg-white"
          value={textDept}
          onChange={e => setTextDept(e.target.value)}
        />
        <Button
          className="!bg-[#1976d2] text-white"
          color="success"
          onClick={handleSeach}
        >
          ค้นหา
        </Button>
      </div>
      {dataList?.length > 0 && (
        <>
          <div className="flex justify-end items-center gap-2">
            <Button
              className="!bg-pink-400 text-white"
              color="success"
              onClick={() => handleExport("csv")}
            >
              export .csv
            </Button>
            <Button
              className="!bg-[#1976d2] text-white"
              color="success"
              onClick={() => handleExport("txt")}
            >
              export .txt
            </Button>
          </div>
          <table className="mt-4">
            <thead>
              <tr className="bg-gray-300">
                <th className=" px-1 py-2">รหัสพนักงาน</th>
                <th className=" px-1 py-2">ชื่อ</th>
                <th className=" px-1 py-2">เบอร์ติดต่อ</th>
                <th className=" px-1 py-2">วันเริ่มงาน</th>
                <th className=" px-1 py-2">ชื่อส่วนงาน</th>
                <th className=" px-1 py-2">หัวหน้างาน</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dataList?.map((itm, ind) => (
                <tr key={ind} className="hover:bg-blue-200">
                  <td className="p-1">{itm?.employeeId}</td>
                  <td className="p-1">{itm?.employeeName}</td>
                  <td className="p-1">{toMobileFormat(itm?.mobileNo)}</td>
                  <td className="p-1">
                    {dayjs(itm?.startDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="p-1">{itm?.deptName}</td>
                  <td className="p-1">{itm?.headEmployeeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
export default Example21;
