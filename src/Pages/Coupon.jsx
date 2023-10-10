import React,{useEffect,useContext,useState, useRef} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,  Inject, ContextMenu,Edit, Toolbar} from '@syncfusion/ej2-react-grids';

import {  couponGrid} from '../data/dummy';
import { Header } from '../Components';
import { ContextUser } from '../App/context/UserContext';
import { useGetUserData } from '../App/api/useGetData';
import { useGetDataProtected } from '../App/api/useGetData';
import { toast } from 'react-toastify'
import { useDeleteData } from '../App/api/useDeleteData';
import { useNavigate } from 'react-router-dom';
import { usePostWithoutRole } from '../App/api/usePostData';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
function Coupon() {
    const gridRef = useRef()
    const navigate = useNavigate()
    const toolbarOptions = ['Search',"Add"];
    const [coupon ,setCoupon] = useState([])
    function CouponTemplate() {

      return (
          <div>
             <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      name='Code'
                      placeholder="Enter Your Code"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      name='Percentage'
                      placeholder="Enter Your Percentage"
                    />
                  </div>
            <DateTimePickerComponent id="datetimepicker"  name='ExpiryDate' placeholder="Select a date and time"/>
          </div>
        );
  }

    const editing = { allowAdding: true,allowDeleting: true,mode: 'Dialog',
    template: CouponTemplate };
    const {user,setUser } = useContext(ContextUser)
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
      useGetUserData("admin/coupon").then(coupon => {
        const newCoupon = coupon.data.map(data => {
         return {
          CouponId: data._id,
          ExpiryDate: data.expirationDate,
          Percentage: data.percentage,
          Code: data.code,
         };
        })
        setCoupon(newCoupon)
      }).catch(error => {
        toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      })
      
    }, []);
    const handleActionBegin = async (args) => {
      try {
      if (args.requestType === 'delete') {
        const {CouponId}= args.data[0]
          const response = await useDeleteData(`/admin/coupon/${CouponId}`);
  
          if (response.data.success === true) {
            toast.success(response.message, { autoClose: 500, theme: 'colored' })
         
          }

          
        }
        

        if (args.requestType === 'save') {
          const add = await usePostWithoutRole("/admin/coupon",{
            expirationDate:args.data.ExpiryDate,
            percentage:args.data.Percentage,
            code:args.data.Code,
          })
        if (add.data.success) {
          toast.success(response.message, { autoClose: 500, theme: 'colored' })
        }
    
        }
      } catch (error) {
        toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      }
      
  
    };
  

    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Coupon" />
        <GridComponent
          dataSource={coupon}
          ref={gridRef}
          pageSettings={{ pageCount: 3 }}
          toolbar={toolbarOptions}
          editSettings={editing}
          actionBegin={handleActionBegin}
          contextMenuItems={["Delete"]}

        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {couponGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[ Toolbar,  ContextMenu, Edit]} />
        </GridComponent>
      </div>
    );
}

export default Coupon
