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
import { useSelector } from "react-redux";
import {
  callGetDepartment,
  callGetPosition,
  callGetPositionHist,
  callSaveEmployee,
} from "@/api/apiHelper";
import dayjs from "dayjs";

const Profile = ({ profileData = {} }) => {
  const [editMode, setEditMode] = useState(false);
  const imageRef = useRef();
  const [image, setImage] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [empStatus, setEmpStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentListData, setDepartmentListData] = useState();
  const [position, setPosition] = useState("");
  const [positionListData, setPositionListData] = useState();
  const [positionHistListData, setPositionHistListData] = useState();
  const [empName, setEmpName] = useState();
  const [empLastname, setEmpLastname] = useState();
  const [empBirthday, setEmpBirthday] = useState();
  const [empIdcard, setEmpIdcard] = useState();
  const [empcEmail, setEmpcEmail] = useState();
  const [empcAddress, setEmpcAddress] = useState();
  const rounter = useRouter();
  const employee = useSelector(state => state?.profile?.employeeSelect);
  const [currentEmp] = useState(employee);

  useEffect(() => {
    callGetDepartmentApi();
  }, []);
  useEffect(() => {
    if (employee) {
      if (employee?.posDeptId) callGetPositionApi(employee?.posDeptId);
      if (employee?.empId) callGetPositionHistApi(employee?.empId);

      setEmpName(employee?.empName);
      setEmpLastname(employee?.empLastname);
      setEmpBirthday(employee?.empBirthday);
      setEmpIdcard(employee?.empIdcard);
      setEmpcEmail(employee?.empEmail);
      setMobileNo(toMobileFormat(employee?.empMobileNo));
      setEmpcAddress(employee?.empAddress);
      setDepartment(employee?.posDeptId);
      setPosition(employee?.posId);
      setImage(employee?.empImage);
      setEmpStatus(employee?.empStatus);
    }
  }, [employee]);
  const handleMobileChange = e => {
    const newMobileText = toMobileFormat(verifyTextNumber(e?.target?.value));
    setMobileNo(newMobileText);
  };

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
  const callGetPositionHistApi = async empId => {
    const resp = await callGetPositionHist(empId);
    setPositionHistListData(resp?.data);
  };
  const handleCancel = () => {
    setEditMode(false);
  };
  const handleSaveData = async () => {
    const payload = {
      empId: employee?.empId,
      empName: empName,
      empLastname: empLastname,
      empBirthday: empBirthday,
      empStatus: empStatus,
      empIdcard: empIdcard,
      empImage: image,
      empMobileNo: mobileNo?.replaceAll("-", ""),
      empEmail: empcEmail,
      empAddress: empcAddress,
      // eposId: "",
      // eposEmpId: "",
      eposPosIdOld: employee?.posId,
      eposPosId: position,
      // eposStatus: "Avtive",
      // eposStartDate: "",
      // eposEndDate: "",
    };
    await callSaveEmployee(payload);
    rounter.push("/example1");
  };
  return (
    <div className="flex flex-col mx-auto justify-center my-10 bg-gray-50 p-8">
      <div className="mt-3 flex flex-row gap-2 justify-end">
        {editMode ? (
          <>
            <Button
              className="!bg-red-500 text-white"
              color="success"
              onClick={handleCancel}
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
          </>
        ) : (
          <>
            <Button
              className="!bg-red-500 text-white"
              color="success"
              onClick={() => rounter.push("/example1")}
            >
              ย้อนกลับ
            </Button>
            <Button
              className="!bg-[#1976d2] text-white"
              color="success"
              onClick={() => setEditMode(true)}
            >
              แก้ไขข้อมูล
            </Button>
          </>
        )}
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
                onClick={() => editMode && imageRef.current.click()}
                alt=""
              />
            ) : (
              <div
                className="flex border-[#e5e7eb] border cursor-pointer !h-[170px] !w-[170px] items-center text-center justify-center"
                onClick={() => editMode && imageRef.current.click()}
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
                disabled={!editMode}
                value={empName}
                onChange={e => setEmpName(e.target.value)}
              />
            </div>
            <div className="flex flex-col  gap-1 mt-2">
              <span>นามสกุล</span>
              <TextField
                id="text-lastname"
                placeholder="นามสกุล"
                size="small"
                disabled={!editMode}
                value={empLastname}
                onChange={e => setEmpLastname(e.target.value)}
              />
            </div>
            <div className="flex flex-col   gap-1 mt-2">
              <span>เลขบัตรประชาชน</span>
              <TextField
                id="text-id-card"
                placeholder="เลขบัตรประชาชน"
                size="small"
                disabled={!editMode}
                value={empIdcard}
                onChange={e => setEmpIdcard(e.target.value)}
              />
            </div>
            <div className="flex flex-col   gap-1 mt-2">
              <span>วัน/เดือน/ปีเกิด</span>
              <DatePicker
                placeholder="วัน/เดือน/ปีเกิด"
                disabled={!editMode}
                value={employee?.empBirthday}
                handleValue={setEmpBirthday}
              />
            </div>
            <div className="flex flex-row gap-1 mt-2 items-center">
              <span>สถานะ</span>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                disabled={!editMode}
              >
                <Select
                  id="demo-select-small"
                  value={empStatus}
                  onChange={e => setEmpStatus(e.target.value)}
                >
                  <MenuItem value="Active">ปกติ</MenuItem>
                  <MenuItem value="Inactive">ลาออก</MenuItem>
                </Select>
              </FormControl>
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
              disabled={!editMode}
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
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col basis-1/2  gap-1">
            <span>E-mail</span>
            <TextField
              id="text-email"
              placeholder="E-mail"
              size="small"
              disabled={!editMode}
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
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              disabled={!editMode}
            >
              <Select
                id="demo-select-department"
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
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              disabled={!editMode}
            >
              <Select
                id="demo-select-position"
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
        <div className="flex flex-row mt-1 gap-2">
          <div className="flex flex-col basis-1/2 gap-1">
            <span>วันที่เริ่มเข้าทำงาน : {employee?.posStartDate}</span>
          </div>
          <div className="flex flex-col basis-1/2  gap-1">
            <span>วันที่สิ้นสุดการทำงาน : {employee?.posEndDate || ""}</span>
          </div>
        </div>
      </div>
      <span className="mb-1 mt-8">ประวัติการทำงาน</span>
      <div className="flex flex-col">
        <table>
          <thead>
            <tr className="bg-gray-300">
              <th className=" px-1 py-2">แผนก</th>
              <th className=" px-1 py-2">ตำแหน่ง</th>
              <th className=" px-1 py-2">วันที่เริ่ม</th>
              <th className=" px-1 py-2">วันที่สิ้นสุด</th>
              <th className=" px-1 py-2">สถานะ</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {positionHistListData?.map((item, ind) => (
              <tr key={ind}>
                <td className="p-1 py-2">{item?.posDeptName}</td>
                <td className="p-1 py-2">{item?.posName}</td>
                <td className="p-1 py-2">
                  {item?.eposStartDate
                    ? dayjs(item?.eposStartDate).format("DD/MM/YYYY")
                    : ""}
                </td>
                <td className="p-1 py-2">
                  {item?.eposEndDate
                    ? dayjs(item?.eposEndDate).format("DD/MM/YYYY")
                    : ""}
                </td>
                <td className="p-1 py-2">{item?.eposStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Profile;
