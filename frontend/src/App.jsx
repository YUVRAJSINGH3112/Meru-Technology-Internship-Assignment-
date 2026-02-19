import React from 'react'
import { SignupForm } from "./components/signup-form"
import { Routes,Route } from 'react-router-dom'
import AuthenticationPage from './pages/AuthenticationPage'
import DashboardPage from './pages/DashboardPage'
import CreateInvoice from './pages/CreateInvoice'
import ProtectedRoute from './pages/ProtectedRoute'

export default function App() {
  return (
    <Routes>
    <Route path="/auth/:type" element={<AuthenticationPage />} />
    <Route
       path="/dashboard"
       element={
       <ProtectedRoute>
         <DashboardPage />
       </ProtectedRoute>
       }
  />

    <Route
       path="/invoice/create"
       element={
        <ProtectedRoute>
           <CreateInvoice />
        </ProtectedRoute>
        }
    />
    <Route
       path="/"
       element={
        <ProtectedRoute>
           <DashboardPage />
        </ProtectedRoute>
        }
    />
    <Route path="/transactions" element={<h1>Transactions</h1>} />
    <Route path="/invoices" element={<h1>Invoices</h1>} />
    <Route path="/reports" element={<h1>Reports</h1>} />
    <Route path="/settings" element={<h1>Settings</h1>} />
    <Route path="/help" element={<h1>Help</h1>} />

    </Routes>
  )
}
