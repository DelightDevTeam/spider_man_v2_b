import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PromotionPage from "../pages/PromotionPage";
import GameLogsPage from "../pages/GameLogsPage";
import TransferHistoryPage from "../pages/TransferHistoryPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ContactPage from "../pages/ContactPage";
import GamesPage from "../pages/GamesPage";
import WalletPage from "../pages/WalletPage";
import DepositPage from "../pages/DepositPage";
import WithDrawPage from "../pages/WithDrawPage";

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
                path:'/games',
                element:<GamesPage/>
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
                path:'/wallet',
                element:<WalletPage/>
            },
            {
                path:'/deposit',
                element:<DepositPage/>
            },
            {
                path:'/with-draw',
                element:<WithDrawPage/>
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
            {
                path:'/contact',
                element:<ContactPage/>
            },
         ],
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/register',
        element:<RegisterPage/>
    }
])
export default router;