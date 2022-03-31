import { useRef, useEffect } from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';
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
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { closeBackdropAndRemoveChild } from '../../context/actions';

export const useSidebarLinks = () => {
    const { pathname } = useLocation();
    const { applicationState, dispatch } = useAppContext();
    const { user, backdrop } = applicationState;

    const isUserLogged = link => {
        return user ? link : '/login';
    };

    const sideBarLinks = [
        {
            title: 'Javascript',
            icon: <IoLogoJavascript className={classes.icon} />,
            link: isUserLogged('/javascript'),
            id: 1,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Npm-packages',
            icon: <GoPackage className={classes.icon} />,
            link: isUserLogged('/npm-packages'),
            id: 2,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Future-projects',
            icon: <AiOutlineProject className={classes.icon} />,
            link: isUserLogged('/future-projects'),
            id: 3,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Books',
            icon: <IoBookSharp className={classes.icon} />,
            link: isUserLogged('/books'),
            id: 4,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'NodeJs',
            icon: <IoLogoNodejs className={classes.icon} />,
            link: isUserLogged('/nodejs'),
            id: 5,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'ReactJs',
            icon: <RiReactjsLine className={classes.icon} />,
            link: isUserLogged('/reactjs'),
            id: 6,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Testing',
            icon: <RiTestTubeLine className={classes.icon} />,
            link: isUserLogged('/testing'),
            id: 7,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'CSS',
            icon: <SiCss3 className={classes.icon} />,
            link: isUserLogged('/css'),
            id: 8,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Databases',
            icon: <AiFillDatabase className={classes.icon} />,
            link: isUserLogged('/databases'),
            id: 9,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Projects',
            icon: (
                <AiOutlineFundProjectionScreen className={classes.icon} />
            ),
            link: isUserLogged('/projects'),
            id: 10,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
        {
            title: 'Others',
            icon: <MdMore className={classes.icon} />,
            link: isUserLogged('/others'),
            id: 11,
            ref: useRef(null),
            classOnClick: classes.classOnClick,
        },
    ];

    useEffect(() => {
        sideBarLinks.forEach(sidebarLink => {
            if (sidebarLink.ref.current) {
                if (
                    pathname !== '/login' &&
                    sidebarLink.link.includes(pathname)
                ) {
                    sidebarLink.ref.current.classList.add(
                        sidebarLink.classOnClick
                    );
                } else {
                    sidebarLink.ref.current.classList.remove(
                        sidebarLink.classOnClick
                    );
                }
            }
        });
    }, [pathname]);

    const addClassOnClick = sidebarLink => {
        if (sidebarLink.ref.current) {
            sidebarLink.ref.current.classList.add(
                sidebarLink.classOnClick
            );
        }
        sideBarLinks.forEach(link => {
            if (link.id !== sidebarLink.id) {
                link.ref.current.classList.remove(link.classOnClick);
            }
        });
    };

    const handleLinkClick = sideBarLink => {
        if (backdrop.open) {
            closeBackdropAndRemoveChild(dispatch);
        }
        addClassOnClick(sideBarLink);
    };

    const renderSideBarLinks = sideBarLinks.map(sideBarLink => (
        <div
            className={classes.sideBarLinkWrapper}
            key={sideBarLink.id}
            ref={sideBarLink.ref}
        >
            {sideBarLink.icon}
            <Link
                onClick={() => handleLinkClick(sideBarLink)}
                className="link"
                to={sideBarLink.link}
                ref={sideBarLink.ref}
            >
                {sideBarLink.title}
            </Link>
        </div>
    ));

    return { renderSideBarLinks };
};
