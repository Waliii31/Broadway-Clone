import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import AdminPanel from "./Pages/AdminPanel";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import OrderDetails from "./Pages/OrderDetails";
import OrderSuccess from "./Pages/OrderSuccess";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import OrderReceiverPanel from "./Pages/OrderReceiverPanel";
import DeliveryPanel from "./Pages/DeliveryPanel";
import PrivateRoute from "./Components/PrivateRoute"; // ✅ Import PrivateRoute
import SelectRoles from "./Pages/SelectRoles";

function App() {
  const location = useLocation();

  // Define routes where Header/Footer should NOT be shown
  const hideHeaderFooterRoutes = ["/admin", "/select-roles", "/delivery", "/order-receiver", "/login", "/signup"];

  const shouldShowHeaderFooter = !hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <CartProvider>
      {shouldShowHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/menu" element={<Menu />} />

        {/* ✅ Protect Admin Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/select-roles" element={<SelectRoles />} />
          <Route path="/order-receiver" element={<OrderReceiverPanel />} />
          <Route path="/delivery" element={<DeliveryPanel />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {shouldShowHeaderFooter && <Footer />}
    </CartProvider>
  );
}

export default App;
