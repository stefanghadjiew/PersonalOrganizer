import React from "react";
import { Link } from "react-router-dom";
import {GiTeacher} from 'react-icons/gi'
import {GoPackage} from 'react-icons/go'
import {AiOutlineProject} from 'react-icons/ai'
import {IoBookSharp} from 'react-icons/io5'
import './styles.css'
import { useAppContext } from "../../context/AppContext";

const SideBar = () => {
    const { applicationState } = useAppContext()
    const { user } = applicationState

    const isUserLogged = link => {
        return user ? link : '/login'
    }
    
    const sideBarLinks = [
        {
            title: 'Learning-resources',
            icon: <GiTeacher className="icon"/>,
            link: isUserLogged('/learning-resources'),
            id: 1
        },
        {
            title: 'Npm-packages',
            icon: <GoPackage className="icon"/>,
            link: isUserLogged('/npm-packages'),
            id: 2
        },
        {
            title: 'Future-projects',
            icon: <AiOutlineProject className="icon"/>,
            link: isUserLogged('/future-projects'),
            id: 3
        },
        {
            title: 'Books',
            icon: <IoBookSharp className="icon"/>,
            link: isUserLogged('/books'),
            id: 4
        }
    ] 

    const renderSideBarLinks = sideBarLinks.map(sideBarLink => 
        <div className="side-bar-link-wrapper" key={sideBarLink.id}>
            {sideBarLink.icon}
            <Link className="link" to={sideBarLink.link}>{sideBarLink.title}</Link>    
        </div>
    )

    return (
        <div className="side-bar">
            {renderSideBarLinks}
        </div>
    )
}

export default SideBar

