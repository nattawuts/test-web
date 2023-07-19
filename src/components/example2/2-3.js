import { callSearchDeptHirApi } from "@/api/apiHelper";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Example23 = () => {
  const [dataDept, setDataDept] = useState();
  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    const resp = await callSearchDeptHirApi();
    if (resp?.data) setDataDept(resp?.data);
  };
  const getChild = data => {
    return (
      <ul>
        {data?.map((itm, ind) => (
          <li key={ind}>
            - {itm?.deptId} : {itm?.deptName} ({itm?.employeeName})
            {itm?.listTeam ? getChild(itm?.listTeam) : <></>}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="flex flex-col mt-3 px-3">
      <div className="mb-4">
        <ul>
          {dataDept ? (
            <li>
              {dataDept?.deptId} : {dataDept?.deptName} (
              {dataDept?.employeeName})
              {dataDept?.listTeam ? getChild(dataDept?.listTeam) : <></>}
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Example23;
