import React, { useContext,useEffect, useState,useRef } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../Components';
import {  contextMenuItems, ordersGrid } from '../data/dummy';
import { useGetDataProtected } from '../App/api/useGetData';
import { ContextUser } from '../App/context/UserContext';
import { useGetUserData } from '../App/api/useGetData';
import { toast } from 'react-toastify'
import { useDeleteData } from '../App/api/useDeleteData';
import { useNavigate } from 'react-router-dom';
import { useUpdateDataAdmin } from '../App/api/useUpdateData';
const Orders = () => {
  const navigate = useNavigate()
  const editing = { allowDeleting: true, allowEditing: true };
  const gridRef = useRef(null);
  const {user,setUser } = useContext(ContextUser)
  const [booking , setBooking] = useState([])
  let contextMenuItemsBooking = [...contextMenuItems,{ text: 'Details Page', target: '.e-content', id: 'detailsPage' }]
  useEffect(() => {

    useGetDataProtected(`/me`)
    .then((data) =>{
     setUser(data);
     if(data.data.role!=="admin"){
       navigate("/mainDasboard")
       
     }
   })
   .catch((error) =>{
     navigate('/mainDasboard')
     toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
   })
   useGetUserData("admin/bookings").then(booking => {
     const newBooking = booking.bookings.map(data => {
      let statusColor;
      let price
      if(data.bookingStatus === "pending"){
        statusColor = "#8be78b";
      }else{
        statusColor = "#fb9678";
      }
      if (data.isDemo) {
        price = "Demo"
      }
      else{
        price = data.totalPrice
      }
      return {
       
        OrderID: data._id,
        StudentName: data?.student.name,
        TotalAmount: price,
        Interest: data.specialization,
        link:data.locationUrl,
        Location: data?.student.street,
        Status: data.bookingStatus,
        StatusBg: statusColor,
        TeacherName:data.teacher.name,
        Approved:data.isApproved,
     
       }
     })
     setBooking(newBooking)

   }).catch(error => {
    toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
   })
   
 }, []);
 const handleActionBegin = async (args) => {

   if (args.requestType === 'delete') {
     const {OrderID}= args.data[0]
     try {
       const response = await useDeleteData(`/admin/booking/${OrderID}`);
       if (response.data.success) {
        toast.success("deleted ", { autoClose: 500, theme: 'colored' })
       }

     } catch (error) {
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
     }

   }
   if (args.requestType === 'save') {
     const {OrderID}= args.data

     try {
       const response = await useUpdateDataAdmin(`admin/booking/${OrderID}`,{isApproved: true});
       if (response.success) {
        toast.success(response.message, { autoClose: 500, theme: 'colored' })
       }

     } catch (error) {
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
     }

    
   }

 };
  const contextMenuClick = (args) => {
    const selectedRecords = gridRef.current.getSelectedRecords();
    if (gridRef.current && args.item.id === 'detailsPage') {
        navigate(`/bookingdetails/${selectedRecords[0].OrderID}`)

    } // This will give you the selected row data
 
  };


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Booking" />
      <GridComponent
        id="gridcomp"
        dataSource={booking}
        allowPaging
        allowSorting
        allowExcelExport
        contextMenuItems={contextMenuItemsBooking}
        editSettings={editing}
        ref={gridRef}
        contextMenuClick={contextMenuClick}
        actionBegin={handleActionBegin}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[ContextMenu, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit ]} />
      </GridComponent>
    </div>
  );
};

export default Orders;
