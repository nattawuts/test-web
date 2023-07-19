import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Table from "./table";
import { useEffect, useState } from "react";
import { callSearchEmpByFullname } from "@/api/apiHelper";

export default function Example1() {
  const [empName, setEmpName] = useState("");
  const [empLastname, setEmpLastname] = useState("");
  const [searchDataList, setSearchDataList] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);
  const handleSearch = async () => {
    const resp = await callSearchEmpByFullname(empName, empLastname);
    setSearchDataList(resp?.data);
  };
  return (
    <div className="flex flex-col mt-3 px-3">
      <div className="flex flex-row items-center gap-2 mb-2 bg-[#DEE2E6] px-3 py-3 justify-end">
        <span>ชื่อ: </span>
        <TextField
          id="text-name"
          placeholder="ชื่อ"
          size="small"
          className="w-[350px] bg-white"
          value={empName}
          onChange={e => setEmpName(e.target.value)}
        />
        <span>นามสกุล: </span>
        <TextField
          id="text-name"
          placeholder="นามสกุล"
          size="small"
          className="w-[350px] bg-white"
          value={empLastname}
          onChange={e => setEmpLastname(e.target.value)}
        />
        <Button
          className="!bg-[#1976d2] text-white"
          color="success"
          onClick={() => handleSearch()}
        >
          ค้นหา
        </Button>
      </div>
      <Table searchDataList={searchDataList} />
    </div>
  );
}
