import { Button, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setEmployeeSelect } from "@/store/slice/profilesSlice";

export default function Table({
  searchDataList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}) {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const handlePageChange = (event, value) => {
    setPageNo(value);
  };
  const rounter = useRouter();
  const dispath = useDispatch();
  const handleSelectRow = item => {
    dispath(setEmployeeSelect(item));
    setTimeout(() => {
      rounter.push("/example1/employee-detail");
    }, 200);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full px-8 pt-3 pb-1 gap-3 items-center">
        <span>
          {(pageNo - 1) * itemsPerPage +
            (searchDataList?.length > 0 ? 1 : 0) +
            "-" +
            (searchDataList?.length > itemsPerPage * pageNo
              ? itemsPerPage * pageNo
              : searchDataList?.length)}{" "}
          จาก {searchDataList?.length} รายการ
        </span>
        <div className="ml-auto flex flex-row gap-4">
          <Pagination
            count={Math.ceil(searchDataList?.length / itemsPerPage)}
            page={pageNo}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            sx={{
              "& li:first-child > button.MuiPaginationItem-previousNext": {
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderWidth: "1px 0.5px 1px 1px !important",
              },
              "& li:last-child > button.MuiPaginationItem-previousNext": {
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
                borderWidth: "1px 1px 1px 0.5px !important",
              },
              "& button": {
                margin: 0,
                color: "#1976d2",
                borderRadius: 0,
                borderColor: "#1976d2",
                borderWidth: "1px 0.5px 1px 0.5px",
                width: "36.5px",
                height: "36.5px",
              },
              "& button.Mui-selected": {
                backgroundColor: "#1976d2 !important",
                color: "#fff !important",
              },
            }}
          />
          <Button
            className="!bg-[#1976d2] text-white"
            startIcon={<AddIcon />}
            onClick={() => rounter.push("/example1/new-employee")}
          >
            เพิ่มพนักงานใหม่
          </Button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="w-full">
            <th className="border-x border-white text-white !bg-[#1976d2] p-[10px]">
              ชื่อ - นามสกุล
            </th>
            <th className="border-x border-white text-white !bg-[#1976d2] p-[10px]">
              เลขบัตรประชาชน
            </th>
            <th className="border-x border-white text-white !bg-[#1976d2] p-[10px]">
              วัน/เดือน/ปีเกิด
            </th>
            <th className="border-x border-white text-white !bg-[#1976d2] p-[10px]">
              เบอร์โทรศัพท์
            </th>
          </tr>
        </thead>
        <tbody>
          {searchDataList
            ?.slice((pageNo - 1) * itemsPerPage, itemsPerPage * pageNo)
            ?.map((item, ind) => (
              <tr
                key={ind}
                className="cursor-pointer hover:bg-pink-200"
                onClick={() => handleSelectRow(item)}
              >
                <td className="text-center border-x border-b border-[#1976d2] px-2 py-3">
                  {item?.empName + " " + item?.empLastname}
                </td>
                <td className="text-center border-x border-b border-[#1976d2] px-2 py-3">
                  {item?.empIdcard}
                </td>
                <td className="text-center border-x border-b border-[#1976d2] px-2 py-3">
                  {item?.empBirthday}
                </td>
                <td className="text-center border-x border-b border-[#1976d2] px-2 py-3">
                  {item?.empMobileNo}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
