import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin-page/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/user-page/Navbar";
import UserRoutes from "./components/user-page/UserRoutes";
import Home from "./components/user-page/Home";
import {AuthProvider} from './firebase-context/AuthContext';
import Profile from "./components/user-page/Profile";
import AdminRoutes from "./components/admin-page/AdminRoutes";
import ListEvent from "./components/admin-page/ListEvent";
import Checkout from "./components/user-page/Checkout";
import TambahEvent from "./components/admin-page/TambahEvent";
import DeskripsiEvent from "./components/user-page/DeskripsiEvent";
import Pembayaran from "./components/user-page/Pembayaran";
import ListTransaksi from "./components/admin-page/ListTransaksi";
import UpdateStatusTransaksi from "./components/admin-page/UpdateStatusTransaksi";

function App() {
  return (
    <div className="relative bg-white">
        <AuthProvider>     
            <Routes>    

              {/*Global Route*/}
              <Route path="/" element={<Login/>} />    
              <Route path="/register-page" element={ <Register /> } />  
              
              {/*User Route*/}
              <Route path="/deskripsi/checkout/pembayaran/:id" element={
                <UserRoutes>
                  <Navbar />
                  <Pembayaran />
                </UserRoutes>
              }/>
              <Route path="/deskripsi/checkout" element={
                <UserRoutes>
                  <Navbar />
                  <Checkout />
                </UserRoutes>
              }/>
              <Route path="/deskripsi/:id" element={
                <UserRoutes>
                  <Navbar />
                  <DeskripsiEvent />
                </UserRoutes>
              }/>
              <Route path="/profile" element={
                <UserRoutes>
                  <Navbar />
                  <Profile />
                </UserRoutes>
              }/>
              <Route path="/home" element={
                <UserRoutes>
                  <Navbar />
                  <Home/>
                </UserRoutes>
              }/>

              {/*Admin Route*/}
              <Route path="/admin-pages/profile" element={
                <AdminRoutes>
                    <><h1>Profile</h1></>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/setting" element={
                <AdminRoutes>
                    <><h1>Setting</h1></>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/laporan" element={
                <AdminRoutes>
                    <><h1>Laporan</h1></>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/chat" element={
                <AdminRoutes>
                    <><h1>Chat</h1></>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/calendar" element={
                <AdminRoutes>
                    <><h1>Calendar</h1></>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/transaksi/update/:id" element={
                <AdminRoutes>
                    <UpdateStatusTransaksi/>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/transaksi" element={
                <AdminRoutes>
                    <ListTransaksi/>
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/event/tambah" element={
                <AdminRoutes>
                  <TambahEvent />
                </AdminRoutes>
              }/>
              <Route path="/admin-pages/event" element={
                <AdminRoutes>
                    <ListEvent/>
                </AdminRoutes>
              }/>
              <Route path="/admin-page" element={
                <AdminRoutes>
                    <Dashboard />
                </AdminRoutes>
              }/>
            </Routes>
        </AuthProvider>
      </div>
  );
}

export default App;
