import React,{useEffect,useContext,useState, useRef} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page,ExcelExport, Resize, Inject, ContextMenu,Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import {  customersGrid,contextMenuItems } from '../data/dummy';
import { Header } from '../Components';
import { ContextUser } from '../App/context/UserContext';
import { useGetUserData } from '../App/api/useGetData';
import { useGetDataProtected } from '../App/api/useGetData';
import { toast } from 'react-toastify'
import { useDeleteData } from '../App/api/useDeleteData';
import { useNavigate } from 'react-router-dom';
import { useUpdateDataAdmin } from '../App/api/useUpdateData';

const Customers = () => {
  const gridRef = useRef()
  const navigate = useNavigate()
  const toolbarOptions = ['Search'];
  const editing = { allowAdding: true,allowDeleting: true, allowEditing: true };

  const {user,setUser } = useContext(ContextUser)
  const [student , setStudent] = useState([])
  let contextMenuItemsStudent = [...contextMenuItems,"Edit",{ text: 'Allot Teacher', target: '.e-content', id: 'teaherAllotment' },{ text: 'Add new User', target: '.e-content', id: 'AddNewUser' }]
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
    useGetUserData("admin/students?limit=20&sort=-createdAt").then(student => {
      const newstudentData = student.data.map(data => {
        const d = new Date(data.createdAt);
       return {
         CustomerID: data._id,
         StudentName: data.name,
         CustomerEmail: data.email,
         CustomerImage: data.avatar,
         Interest: data.studentCategory,
         bookingStatus: data.bookingStatus|| "ok",
         bookingStatusBg: "#8BE78B",
         phone: data.phone,
         Budget: `₹ ${data.budget}`,
         Location: data.street,
       };
      })
      setStudent(newstudentData)
    }).catch(error => {

      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    })
    
  }, []);

  const handleActionBegin = async (args) => {
    if (args.requestType === 'delete') {
      const {CustomerID}= args.data[0]
      try {
        const response = await useDeleteData(`/admin/student/${CustomerID}`);

        if (response.data.success === true) {
          toast.success(response.message, { autoClose: 500, theme: 'colored' })
       
        }
      } catch (error) {
        toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      }

    }
    if (args.requestType === 'save') {
      const {CustomerID}= args.data
      let buget;
      if (args.data.Budget.startsWith("₹")) {
        buget = args.data.Budget.slice(1)
      }else{
        buget = args.data.Budget
      }

      try {
        const response = await useUpdateDataAdmin(`admin/student/${CustomerID}`,{
          studentCategory:args.data.Interest,
          bookingStatus:args.data.bookingStatus,
          phone:args.data.phone,
          street:args.data.Location,
          budget:buget
        });

        if (response.success === true) {
          toast.success(response.message, { autoClose: 500, theme: 'colored' })
       
        }
      } catch (error) {
        toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      }

    }

  };

  const contextMenuClick = (args) => {
    if (gridRef.current && args.item.id === 'teaherAllotment') {
        navigate(`/search/all/all/${args.rowInfo.rowData.CustomerID}`)
    } 
    if (gridRef.current && args.item.id === 'AddNewUser') {
        navigate(`/register/student`)
      
    } 
 
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Students" />
      <GridComponent
        dataSource={student}
        allowPaging
        ref={gridRef}
        pageSettings={{ pageCount: 3 }}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        allowExcelExport
        contextMenuItems={contextMenuItemsStudent}
        actionBegin={handleActionBegin}
        contextMenuClick={contextMenuClick}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page,Resize, Toolbar,  ContextMenu,Sort, Filter,ExcelExport, Edit]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
