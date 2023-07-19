import { getConfig } from "@/config/env";
import axios from "axios";
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
export const callSearchDeptHirApi = async () => {
  try {
    const response = await axios.get(
      `${getConfig("baseApi")}/api/profile/searchDeptHir`,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callSearchEmployeeByDept = async deptId => {
  try {
    const response = await axios.get(
      `${getConfig("baseApi")}/api/profile/searchEmployeeByDept?deptId=` +
        deptId,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callSearchEmployeeById = async empId => {
  try {
    const response = await axios.get(
      `${getConfig("baseApi")}/api/profile/searchEmployeeById?empId=` + empId,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callSearchEmpByFullname = async (empName, empLastname) => {
  try {
    const response = await axios.get(
      `${getConfig(
        "baseApi"
      )}/api/profile/searchEmp?empName=${empName}&empLastname=` + empLastname,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callGetDepartment = async (empName, empLastname) => {
  try {
    const response = await axios.get(
      `${getConfig("baseApi")}/api/profile/department`,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const callGetPosition = async deptId => {
  try {
    const response = await axios.get(
      `${getConfig("baseApi")}/api/profile/position?deptId=` + deptId,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const callGetPositionHist = async empId => {
  try {
    const response = await axios.get(
      `${getConfig("baseApi")}/api/profile/positionHist?empId=` + empId,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callNewEmployee = async (emp = {}) => {
  try {
    const response = await axios.post(
      `${getConfig("baseApi")}/api/profile/addNewEmp`,
      emp,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callSaveEmployee = async (emp = {}) => {
  try {
    const response = await axios.post(
      `${getConfig("baseApi")}/api/profile/updateEmp`,
      emp,
      config
    );
    if (response?.status == 200) {
      return response?.data || null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
