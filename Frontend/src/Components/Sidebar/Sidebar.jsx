import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';


const Sidebar = () => {
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleClientsClick = () => {
    navigate('/company')
  };

  const handleServicesClick = () => {
    // Code to handle click on "Services" menu item
    navigate('/Service')
  };

  const handleInvoiceClick = () => {
    // Code to handle click on "Invoice" menu item
    navigate('/invoice')
  };

  const handleInvoictableclick=()=>{
    navigate('/table')
  }



  return (
    <div style={{ height: '100vh', position: 'sticky', top: 0 }}>
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}
          style={{ cursor: 'pointer' }} ><span onClick={handleHomeClick}>Home</span></CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            {/* Add onClick handlers to each SidebarMenuItem */}
            <CDBSidebarMenuItem icon="th-large" onClick={handleClientsClick}>
              Company
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleServicesClick}>
              Services
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleInvoiceClick}>
              Invoice
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleInvoictableclick}>
              Invoice Table
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid" onClick={handlelogout} >
                <i className="fa fa-sign-out" aria-hidden="true" /> {/* Font Awesome logout icon */}
                logout
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
