import React from 'react';
import { Link } from 'react-router-dom';
import { GoPackage } from 'react-icons/go';
import { IoLogoJavascript } from 'react-icons/io5';
import { IoLogoNodejs } from 'react-icons/io5';
import { AiOutlineProject } from 'react-icons/ai';
import { RiReactjsLine } from 'react-icons/ri';
import { IoBookSharp } from 'react-icons/io5';
import { SiCss3 } from 'react-icons/si';
import { AiFillDatabase } from 'react-icons/ai';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { MdMore } from 'react-icons/md';
import { RiTestTubeLine } from 'react-icons/ri';
import './styles.css';
import { useAppContext } from '../../context/AppContext';

const SideBar = () => {
    const { applicationState } = useAppContext();
    const { user } = applicationState;

    const isUserLogged = link => {
        return user ? link : '/login';
    };

    const sideBarLinks = [
        {
            title: 'Javascript',
            icon: <IoLogoJavascript className="icon" />,
            link: isUserLogged('/javascript'),
            id: 1,
        },
        {
            title: 'Npm-packages',
            icon: <GoPackage className="icon" />,
            link: isUserLogged('/npm-packages'),
            id: 2,
        },
        {
            title: 'Future-projects',
            icon: <AiOutlineProject className="icon" />,
            link: isUserLogged('/future-projects'),
            id: 3,
        },
        {
            title: 'Books',
            icon: <IoBookSharp className="icon" />,
            link: isUserLogged('/books'),
            id: 4,
        },
        {
            title: 'NodeJs',
            icon: <IoLogoNodejs className="icon" />,
            link: isUserLogged('/nodejs'),
            id: 5,
        },
        {
            title: 'ReactJs',
            icon: <RiReactjsLine className="icon" />,
            link: isUserLogged('/reactjs'),
            id: 6,
        },
        {
            title: 'Testing',
            icon: <RiTestTubeLine className="icon" />,
            link: isUserLogged('/testing'),
            id: 7,
        },
        {
            title: 'CSS',
            icon: <SiCss3 className="icon" />,
            link: isUserLogged('/css'),
            id: 8,
        },
        {
            title: 'Databases',
            icon: <AiFillDatabase className="icon" />,
            link: isUserLogged('/databases'),
            id: 9,
        },
        {
            title: 'Projects',
            icon: <AiOutlineFundProjectionScreen className="icon" />,
            link: isUserLogged('/projects'),
            id: 10,
        },
        {
            title: 'Others',
            icon: <MdMore className="icon" />,
            link: isUserLogged('/others'),
            id: 11,
        },
    ];

    const renderSideBarLinks = sideBarLinks.map(sideBarLink => (
        <div className="side-bar-link-wrapper" key={sideBarLink.id}>
            {sideBarLink.icon}
            <Link className="link" to={sideBarLink.link}>
                {sideBarLink.title}
            </Link>
        </div>
    ));

    return <div className="side-bar">{renderSideBarLinks}</div>;
};

export default SideBar;
