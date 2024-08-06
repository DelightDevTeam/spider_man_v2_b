import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PromotionPage from "../pages/PromotionPage";
import GameLogsPage from "../pages/GameLogsPage";
import TransferHistoryPage from "../pages/TransferHistoryPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<HomePage/>
            },
            {
                path:'/profile',
                element:<ProfilePage/>
            },
            {
                path:'/change-password',
                element:<ChangePasswordPage/>
            },
            {
                path:'/promotion',
                element:<PromotionPage/>
            },
            {
                path:'/game-logs',
                element:<GameLogsPage/>
            },
            {
                path:'/transfer-history',
                element:<TransferHistoryPage/>
            },
         ],
    },
    {
        path:'/login',
        element:<LoginPage/>
    }
])
export default router;