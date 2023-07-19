/* eslint-disable @next/next/no-img-element */
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DatePicker from "../datepicker";
import { useEffect, useRef, useState } from "react";
import { fileToBase64, toMobileFormat, verifyTextNumber } from "@/utils/format";
import { useRouter } from "next/router";
import {
  callGetDepartment,
  callGetPosition,
  callNewEmployee,
} from "@/api/apiHelper";

const Profile = () => {
  const imageRef = useRef();
  const [image, setImage] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [department, setDepartment] = useState("");
  const [departmentListData, setDepartmentListData] = useState();
  const [position, setPosition] = useState("");
  const [positionListData, setPositionListData] = useState();
  const [empName, setEmpName] = useState();
  const [empLastname, setEmpLastname] = useState();
  const [empBirthday, setEmpBirthday] = useState();
  const [empIdcard, setEmpIdcard] = useState();
  const [empcEmail, setEmpcEmail] = useState();
  const [empcAddress, setEmpcAddress] = useState();

  const rounter = useRouter();
  const handleMobileChange = e => {
    const newMobileText = toMobileFormat(verifyTextNumber(e?.target?.value));
    setMobileNo(newMobileText);
  };

  useEffect(() => {
    callGetDepartmentApi();
  }, []);
  useEffect(() => {
    if (department) callGetPositionApi(department);
  }, [department]);

  const handleImageChange = async event => {
    if (!(event.target.files && event.target.files[0])) {
      return;
    }
    const fileObj = event.target.files[0];
    var regExp = /(\.jpg|\.png|\.jpeg)$/i;
    if (regExp.exec(fileObj.name)) {
      const fileBase64 = await fileToBase64(fileObj);
      setImage(fileBase64);
    }
    event.target.value = null;
  };

  const callGetDepartmentApi = async () => {
    const resp = await callGetDepartment();
    setDepartmentListData(resp?.data);
  };
  const callGetPositionApi = async deptId => {
    const resp = await callGetPosition(deptId);
    setPositionListData(resp?.data);
  };

  const handleSaveData = async () => {
    const payload = {
      empId: null,
      empName: empName,
      empLastname: empLastname,
      empBirthday: empBirthday,
      empStatus: "Active",
      empIdcard: empIdcard,
      empImage: image,
      empMobileNo: mobileNo?.replaceAll("-", ""),
      empEmail: empcEmail,
      empAddress: empcAddress,
      eposEmpId: "",
      eposPosId: position,
      eposStatus: "Avtive",
      eposStartDate: "",
      eposEndDate: "",
    };
    await callNewEmployee(payload);
    rounter.push("/example1");
  };
  return (
    <div className="flex flex-col mx-auto  justify-center mt-10 bg-gray-50 p-8">
      <div className="mt-3 flex flex-row gap-2 justify-end">
        <Button
          className="!bg-red-500 text-white"
          color="success"
          onClick={() => rounter.push("/example1")}
        >
          ยกเลิก
        </Button>
        <Button
          className="!bg-[#1976d2] text-white"
          color="success"
          onClick={handleSaveData}
        >
          บันทึกข้อมูล
        </Button>
      </div>
      <span className="mb-1">ข้อมูลส่วนตัว</span>
      <div className="border-[#e5e7eb] bg-white flex  border px-3 py-4 rounded-md gap-4">
        <div className="flex flex-row w-full gap-3 grow-0">
          <div className="!w-[200px]">
            {image ? (
              <img
                id="file_esig"
                className="my-auto cursor-pointer !h-[170px] w-[170px]"
                src={image}
                onClick={() => imageRef.current.click()}
                alt=""
              />
            ) : (
              <div
                className="flex border-[#e5e7eb] border cursor-pointer !h-[170px] !w-[170px] items-center text-center justify-center"
                onClick={() => imageRef.current.click()}
              >
                <span>อัพโหลดรูป</span>
              </div>
            )}

            <input
              id="file_input"
              style={{ display: "none" }}
              ref={imageRef}
              type="file"
              onChange={handleImageChange}
              accept=".jpg,.png,.jpeg"
            />
          </div>
          <div className="flex flex-col basis-auto grow gap-1">
            <div className="flex flex-col  gap-1">
              <span>ชื่อ</span>
              <TextField
                id="text-name"
                placeholder="ชื่อ"
                size="small"
                value={empName}
                onChange={e => setEmpName(e.target.value)}
              />
            </div>
            <div className="flex flex-col  gap-1">
              <span>นามสกุล</span>
              <TextField
                id="text-lastname"
                placeholder="นามสกุล"
                size="small"
                value={empLastname}
                onChange={e => setEmpLastname(e.target.value)}
              />
            </div>
            <div className="flex flex-col   gap-1">
              <span>เลขบัตรประชาชน</span>
              <TextField
                id="text-id-card"
                placeholder="เลขบัตรประชาชน"
                size="small"
                value={empIdcard}
                onChange={e => setEmpIdcard(e.target.value)}
              />
            </div>
            <div className="flex flex-col   gap-1">
              <span>วัน/เดือน/ปีเกิด</span>
              <DatePicker
                placeholder="วัน/เดือน/ปีเกิด"
                handleValue={setEmpBirthday}
              />
            </div>
          </div>
        </div>
      </div>
      <span className="mb-1 mt-8">ข้อมูลการติดต่อ</span>
      <div className="border-[#e5e7eb] bg-white flex flex-col border px-3 py-4 rounded-md gap-4">
        <div className="flex flex-row mt-1 gap-2">
          <div className="flex flex-col basis-full gap-1">
            <span>ที่อยู่</span>
            <TextField
              id="text-name"
              placeholder="ที่อยู่"
              size="small"
              multiline
              rows={4}
              value={empcAddress}
              onChange={e => setEmpcAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row mt-1 gap-2">
          <div className="flex flex-col basis-1/2 gap-1">
            <span>เบอร์โทรศัพท์</span>
            <TextField
              id="text-phone"
              placeholder="เบอร์โทรศัพท์"
              size="small"
              onChange={handleMobileChange}
              value={mobileNo}
            />
          </div>
          <div className="flex flex-col basis-1/2  gap-1">
            <span>E-mail</span>
            <TextField
              id="text-email"
              placeholder="E-mail"
              size="small"
              value={empcEmail}
              onChange={e => setEmpcEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <span className="mb-1 mt-8">ข้อมูลการทำงาน</span>
      <div className="border-[#e5e7eb] bg-white flex flex-col border px-3 py-4 rounded-md gap-4">
        <div className="flex flex-row mt-1 gap-2">
          <div className="flex flex-col basis-1/2 gap-1">
            <span>แผนก</span>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                id="demo-select-dept"
                value={department}
                onChange={e => setDepartment(e.target.value)}
              >
                {departmentListData?.map((itm, ind) => (
                  <MenuItem key={ind} value={itm?.deptId}>
                    {itm?.deptName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col basis-1/2  gap-1">
            <span>ตำแหน่ง</span>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                id="demo-select-small"
                value={position}
                onChange={e => setPosition(e.target.value)}
              >
                {positionListData?.map((itm, ind) => (
                  <MenuItem key={ind} value={itm?.posId}>
                    {itm?.posName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
