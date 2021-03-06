import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './LoginPage';
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Routes,Route} from 'react-router-dom';
import ProductPage from './ProductPage';
import FavoriteProducts from "./FavoriteProducts";
import UserPage from "./UserPage";
import ShopPage from "./ShopPage";
import ReportPage from "./ReportPage";
import AddProductPage from "./AddProductPage";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path={"/add/product"} element={<AddProductPage/>}/>
          <Route path={"/shop/add"} element={<ShopPage/>}/>
          <Route path={"/seller/create"} element={<UserPage/>}/>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/product/:product_name" element={<ProductPage/>}/>
          <Route path="/favorites" element={<FavoriteProducts/>}/>
          <Route path="/report/:seller" element={<ReportPage/>}/>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
