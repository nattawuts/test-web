import { callSearchEmployeeById } from "@/api/apiHelper";
import { toMobileFormat } from "@/utils/format";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Example22 = () => {
  const [textEmp, setTextEmp] = useState();
  const [dataEmp, setDataEmp] = useState();
  useEffect(() => {
    handleSeach();
  }, []);
  const handleSeach = async () => {
    const resp = await callSearchEmployeeById(textEmp);
    setDataEmp(resp?.data);
  };

  return (
    <div className="flex flex-col mt-3 px-3">
      <div className="flex flex-row items-center gap-2 mb-2 bg-[#DEE2E6] px-3 py-3">
        <span>รหัสพนักงาน: </span>
        <TextField
          id="text-name"
          placeholder="รหัสพนักงาน"
          size="small"
          className="w-[350px] bg-white"
          value={textEmp}
          onChange={e => setTextEmp(e.target.value)}
        />
        <Button
          className="!bg-[#1976d2] text-white"
          color="success"
          onClick={() => handleSeach()}
        >
          ค้นหา
        </Button>
      </div>
      {dataEmp && (
        <div className="flex flex-col gap-2">
          <span>รายละเอียดพนักงาน</span>
          <div className="flex gap-2 mt-4">
            <span className="text-right w-[150px]">รหัสพนักงาน:</span>
            <span>{dataEmp?.employeeId}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-right w-[150px]">ชื่อ:</span>
            <span>{dataEmp?.employeeName}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-right w-[150px]">เบอร์ติดต่อ:</span>
            <span>{toMobileFormat(dataEmp?.mobileNo)}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-right w-[150px]">วันเริ่มงาน:</span>
            <span>{dayjs(dataEmp?.startDate).format("DD/MM/YYYY")}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-right w-[150px]">ชื่อส่วนงาน:</span>
            <span>{dataEmp?.deptName}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-right w-[150px]">หัวหน้างาน:</span>
            <span>{dataEmp?.headEmployeeName}</span>
          </div>
          <span className="mt-4">ทีมงาน</span>
          <table>
            <thead>
              <tr className="bg-gray-300">
                <th className=" px-1 py-2">ลำดับ</th>
                <th className=" px-1 py-2">รหัสพนักงาน</th>
                <th className=" px-1 py-2">ชื่อ</th>
                <th className=" px-1 py-2">เบอร์ติดต่อ</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dataEmp?.listTeam?.map((itm, ind) => (
                <tr key={ind} className="hover:bg-blue-200">
                  <td className="p-1">{ind + 1}</td>
                  <td className="p-1">{itm?.employeeId}</td>
                  <td className="p-1">{itm?.employeeName}</td>
                  <td className="p-1">{toMobileFormat(itm?.mobileNo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Example22;
