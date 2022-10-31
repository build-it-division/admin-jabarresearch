import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuIcon,
  HomeIcon,
  TableIcon,
  ChartPieIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import NavList from "./common/NavList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetInsight } from "./store/actions/InsightAction";
import { RootStore } from "./store";

const navList = [
  {
    title: "Home",
    icon: <HomeIcon className="h-5 w-5 text-gray-100" />,
    subMenu: [
      {
        name: "dashboard",
        route: "/dashboard",
      },
      {
        name: "aspirasi",
        route: "/aspirasi",
      },
    ],
  },
  {
    title: "Insight",
    icon: <TableIcon className="h-5 w-5 text-gray-100" />,
    subMenu: [
      {
        name: "Tables Insight",
        route: "/insight",
      },
      {
        name: "Question Insight",
        route: "/question",
      },
    ],
  },
  {
    title: "Charts",
    icon: <ChartPieIcon className="h-5 w-5 text-gray-100" />,
    subMenu: [
      {
        name: "charts",
        route: "/charts",
      },
    ],
  },
];
function App() {

  const token = localStorage.getItem('token');

  const logoutUrl = 'https://api.jabarresearch.com/api/logout';
  //const userUrl = 'https://api.jabarresearch.com/api/user';

  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate('/signin');
    }
  }, [token]);

  const handleLogout = async () => {

    if(!token){
      console.warn('no token');
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await axios.post(logoutUrl)
      .then(() => {
        localStorage.removeItem('token');

        navigate('/signin');
      })
      .catch(err => {
        console.log(err.response.data.message);
        if(err.response.data.message == 'Token has expired') {
          localStorage.removeItem('token');

          navigate('/signin');
        }
      });
    }
  };

  function wrapAsyncFunction<ARGS extends unknown[]>(fn: (...args: ARGS) => Promise<unknown>): (...args: ARGS) => void {
    return (...args) => {
      void fn(...args);
    };
  }

  const dispatch = useDispatch();
        useEffect(() => {
          dispatch(GetInsight() as any);
        },[]);
        const InsightState = useSelector((state: RootStore) => state.insight);
    console.log('ini data ',InsightState);

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-cyan-900 shrink-0">
        <div className="h-16 flex items-center justify-center shadow-md">
          <span className="text-white text-xl font-medium">Jabar Research</span>
        </div>
        <ul className="flex flex-col text-white space-y-2 text-sm mt-4">
          {navList.map((n, i) => (
            <NavList title={n.title} subMenu={n.subMenu} key={i}>
              {n.icon}
            </NavList>
          ))}
        </ul>
      </div>
      <div className="w-full bg-gray-200">
        <div className="h-16 px-4 shadow-md flex justify-between items-center bg-white">
          <div>
            <MenuIcon className="h-6 w-6 text-cyan-900" />
          </div>
          <div className="flex items-center">
            {/**<div>
              <img
                className="w-8 h-8 rounded-full"
                src={user.imageUrl}
                alt="avatar"
              />
          </div>*/}
            <LogoutIcon
              className="h-6 w-6 ml-4 text-cyan-700 cursor-pointer"
              onClick={wrapAsyncFunction(handleLogout)}
            />
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
