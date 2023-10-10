import React, { useContext,useEffect, useState,useRef } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit} from '@syncfusion/ej2-react-grids';
import { useGetDataProtected } from '../App/api/useGetData';
import { contextMenuItems, employeesGrid } from '../data/dummy';
import { Header } from '../Components';
import { ContextUser } from '../App/context/UserContext';
import { useGetUserData } from '../App/api/useGetData';
import { useUpdateDataAdmin } from '../App/api/useUpdateData';
import { toast } from 'react-toastify'
import { useDeleteData } from '../App/api/useDeleteData';
import { useNavigate } from 'react-router-dom';
const Employees = () => {
  const navigate = useNavigate()
  const {user,setUser } = useContext(ContextUser)
  const [teacher , setTeacher] = useState([])
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {

     useGetDataProtected(`/me`)
     .then((data) =>{
      setUser(data);
      if(data.data.role!=="admin"){

        navigate("/mainDasboard")
        toast.error("something was wrong Please !login again", { autoClose: 500, theme: 'colored' })
      }
    })
    .catch((error) =>{

      navigate('/mainDasboard')
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    })
    useGetUserData("admin/teachers?limit=20").then(teacher => {
      const newTeacherData = teacher.data.map(data => {
        const {subject,hobbies,languages} = {...data } 
        const Specialization=[...subject,...hobbies,...languages]
        const d  = new Date(data.createdAt);
       return {
        
          EmployeeID: data._id,
          Name : data.name,
          Qualification: data.qualification,
          ApprovalDate: d,
          Address: data.street,
          Speciallization: Specialization,
          EmployeeImage:data.avatar,
          Status:data.isVerified,
          Resume:data.resume,
          background:'red',
      
        }
      })

      setTeacher(newTeacherData)
    }).catch(error => {
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    })
    
  }, []);
  const toolbarOptions = ['Search'];
  const handleActionBegin = async (args) => {
    
    if (args.requestType === 'save') {
      const {EmployeeID}= args.rowData
      try {
        const response = await useUpdateDataAdmin(`admin/teacher/verify/${EmployeeID}`, {isVerified:true
        });

        if (response.success === true) {
          toast.success(response.message, { autoClose: 500, theme: 'colored' })
        }
      } catch (error) {
        
      }

    }


    if (args.requestType === 'delete') {
      const {EmployeeID}= args.data[0]
      try {
   
        const response = await useDeleteData(`/admin/teacher/${EmployeeID}`);
        if(response.data.success){
          toast.success(response.message, { autoClose: 500, theme: 'colored' })
        }

      } catch (error) {
       toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      }

      
    }

  };



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Teacher" />
      <GridComponent
        dataSource={teacher}
        width="auto"
        allowPaging
        allowSorting
        allowExcelExport
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        contextMenuItems={contextMenuItems}
        actionBegin={handleActionBegin}

      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search,  Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit]} />

      </GridComponent>
    </div>
  );
};
export default Employees;
