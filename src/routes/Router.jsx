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
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../features/dashboard/merchant/pages/Dashboard";
import SendParcel from "../features/dashboard/merchant/pages/SendParcel";
import MyParcels from "../features/dashboard/merchant/pages/MyParcels";
import Payment from "../features/payment/pages/Payment";
import MyPaymentHistory from "../features/dashboard/merchant/pages/MyPaymentHistory";
import Loading from "../components/Loading";
import TrackParcel from "../features/dashboard/merchant/pages/TrackParcel";
import UpdateYourProfile from "../features/dashboard/merchant/pages/UpdateYourProfile";
import BeARider from "../features/dashboard/raider/pages/BeARider";
import PendingRiders from "../features/dashboard/admin/pages/PendingRiders";
import ActiveRiders from "../features/dashboard/admin/pages/ActiveRiders";

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
          hydrateFallbackElement: <Loading></Loading>,
          Component: Coverage
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
        path: "send-parcel",
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      },
      {
        path: "my-parcels",
        element: <PrivateRoute><MyParcels></MyParcels></PrivateRoute>
      },
      {
        path: "track-parcel",
        element: <PrivateRoute><TrackParcel></TrackParcel></PrivateRoute>
      },
      {
        path: "be-rider",
        element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
      },
      {
        path: "pending-riders",
        element: <PrivateRoute><PendingRiders></PendingRiders></PrivateRoute>
      },
      {
        path: "active-riders",
        element: <PrivateRoute><ActiveRiders></ActiveRiders></PrivateRoute>
      },
      {
        path: "payment/:parcelId",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path: "my-payment-history",
        element: <PrivateRoute><MyPaymentHistory></MyPaymentHistory></PrivateRoute>
      },
      {
        path: "update-profile",
        element: <PrivateRoute><UpdateYourProfile></UpdateYourProfile></PrivateRoute>
      }
    ]
  }
]);