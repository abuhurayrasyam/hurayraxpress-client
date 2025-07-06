import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../features/auth/pages/SignUp";
import SignIn from "../features/auth/pages/SignIn";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Coverage from "../features/coverage/pages/Coverage";
import SendParcel from "../features/send-parcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../features/my-parcels/pages/MyParcels";
import Dashboard from "../features/dashboard/pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Payment from "../features/payment/pages/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound></NotFound>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "/coverage",
          loader: () => fetch('./serviceCenter.json'),
          Component: Coverage
        },
        {
          path: "/send-parcel",
          loader: () => fetch('./serviceCenter.json'),
          element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
        }
    ]
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "signup",
        Component: SignUp
      },
      {
        path: "signin",
        Component: SignIn
      },
      {
        path: "forgot-password",
        Component: ForgotPassword
      },
      {
        path: "reset-password",
        Component: ResetPassword
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      },
      {
        path: "my-parcels",
        element: <PrivateRoute><MyParcels></MyParcels></PrivateRoute>
      },
      {
        path: "payment/:parcelId",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      }
    ]
  }
]);