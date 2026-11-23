import React from 'react'
import {Link, NavLink} from "react-router-dom"
import logo from "../../../assets/logo/logo.svg"
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUndo } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import logoOnDark from "../../../assets/logo/logo-on-dark.svg"
import { MdLogout } from "react-icons/md";

const ASIDEMENUS = {
    patient : {
        heading: "My health",
        items:[
            {to: "/patient", label: "Overview", icon: CiHome},
            {to: "/doctors", label: "Find a doctor", icon: FaSearch},
            {to: "/patient/appointments", label: "My apppointments", icon: CiCalendar},
            {to: "/patient/notes", label: "Visit notes", icon: BsFillFileEarmarkTextFill},
            {to: "/patient/payments", label: "Payments", icon: MdOutlinePayment},
        ]
    },
    doctor : {
        heading: "Doctor workspace",
         items:[
            {to: "/doctor", label: "Overview", icon: CiHome},
            {to: "/doctor/schedule", label: "Schedule", icon: CiCalendar},
            {to: "/doctor/profile", label: "Profile & availability", icon: FaRegClock},
            {to: "/doctor/notes", label: "Visit notes", icon: BsFillFileEarmarkTextFill},
            {to: "/doctor/earning", label: "Earnings", icon: GiMoneyStack},
        ]
    },
    admin : {
        heading: "Admin",
        items:[
            {to: "/admin", label: "Overview", icon: CiHome},
            {to: "/admin/doctor", label: "Doctor approvals", icon: FaStethoscope, notificationBadge: "pendingDoctors"},
            {to: "/admin/users", label: "User", icon: FiUsers},
            {to: "/admin/appointments", label: "Appointments", icon: CiCalendar},
            {to: "/admin/payments", label: "Payment & refunds", icon: FaUndo, notificationBadge: "refundsNeeded"},
            {to: "/admin/revenue", label: "Revenue", icon: FaChartLine},
        ] 
    }
}

const ROLE_LABEL = {
    patient : "Patient",
    doctor : "Doctor",
    admin : "Administrator"
}
function DashboardLayout() {
    const [open, setOpen] = useState(false);
    const menu = ASIDEMENUS [role];

  return (
    <div className='dash'>
        <header className='dash-topbar'>
            <Link to = {"/"} className="dash-logo">
            <img sre={logo} alt='Carebook logo' />
            </Link>
            <button className="dash-menu-btn">
                {open ? <IoClose /> : <IoIosMenu />}
            </button>

        </header>
        <aside id='dash-sidebar' className={`dash-side $ {open ? 'open'} : ''}`}>
            <Link to={"/"} className='dash-logo'>
            <img src={logoOnDark} alt="Carebook logo" />
            </Link>
            <p className="dash-side-heading">{menu.heading}</p>
            <nav className="dash-nav">
                {
                    menu.items.map((item) => {
                        const MenuIcon = item.icon;
                        return(
                            <NavLink to={item.to} key={item.to}>
                                {MenuIcon && <MenuIcon size ={18} />}
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })
                }
            </nav>
            <button className="dash-logout">
                <MdLogout />
                <span className='sr-only'>Log out</span>
            </button>
        </aside>
        <main className="dash-main"></main>
    </div>
  )
}

export default DashboardLayout