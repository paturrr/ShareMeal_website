import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MitraDashboard from "./pages/mitra/MitraDashboard";
import MitraInventory from "./pages/mitra/MitraInventory";
import MitraOrders from "./pages/mitra/MitraOrders";
import ConsumerDashboard from "./pages/consumer/ConsumerDashboard";
import ConsumerSearch from "./pages/consumer/ConsumerSearch";
import ConsumerHistory from "./pages/consumer/ConsumerHistory";
import ConsumerCheckout from "./pages/consumer/ConsumerCheckout";
import ConsumerEducation from "./pages/consumer/ConsumerEducation";
import LembagaDashboard from "./pages/lembaga/LembagaDashboard";
import LembagaDonations from "./pages/lembaga/LembagaDonations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVerification from "./pages/admin/AdminVerification";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEducation from "./pages/admin/AdminEducation";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  // Mitra Routes
  {
    path: "/mitra",
    Component: MitraDashboard,
  },
  {
    path: "/mitra/inventory",
    Component: MitraInventory,
  },
  {
    path: "/mitra/orders",
    Component: MitraOrders,
  },
  // Consumer Routes
  {
    path: "/consumer",
    Component: ConsumerDashboard,
  },
  {
    path: "/consumer/search",
    Component: ConsumerSearch,
  },
  {
    path: "/consumer/checkout",
    Component: ConsumerCheckout,
  },
  {
    path: "/consumer/history",
    Component: ConsumerHistory,
  },
  {
    path: "/consumer/education",
    Component: ConsumerEducation,
  },
  // Lembaga Sosial Routes
  {
    path: "/lembaga",
    Component: LembagaDashboard,
  },
  {
    path: "/lembaga/donations",
    Component: LembagaDonations,
  },
  // Admin Routes
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/verification",
    Component: AdminVerification,
  },
  {
    path: "/admin/users",
    Component: AdminUsers,
  },
  {
    path: "/admin/education",
    Component: AdminEducation,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);