import { Routes, Route } from "react-router-dom";

// PAGES

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";

import CatalogPage from "./pages/CatalogPage";

import InventoryPage from "./pages/InventoryPage";

import BookDetailsPage from "./pages/BookDetailsPage";

import BorrowRequestsPage from "./pages/BorrowRequestsPage";

import ReturnsPage from "./pages/ReturnsPage";

import UsersPage from "./pages/UsersPage";

import FineLedgerPage from "./pages/FineLedgerPage";

import MyBorrowsPage from "./pages/MyBorrowsPage";

import MyFinesPage from "./pages/MyFinesPage";

// COMPONENTS

import RoleProtectedRoute from "./routes/RoleProtectedRoute";

function App() {
  return (
    <Routes>
      {/* LOGIN */}

      <Route path="/" element={<LoginPage />} />

      {/* REGISTER */}

      <Route path="/register" element={<RegisterPage />} />

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <DashboardPage />
          </RoleProtectedRoute>
        }
      />

      {/* CATALOG */}

      <Route
        path="/books"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "librarian", "member"]}>
            <CatalogPage />
          </RoleProtectedRoute>
        }
      />

      {/* BOOK DETAILS */}

      <Route
        path="/books/:id"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "librarian", "member"]}>
            <BookDetailsPage />
          </RoleProtectedRoute>
        }
      />

      {/* INVENTORY */}

      <Route
        path="/inventory"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "librarian"]}>
            <InventoryPage />
          </RoleProtectedRoute>
        }
      />

      {/* BORROW REQUESTS */}

      <Route
        path="/borrow-requests"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "librarian"]}>
            <BorrowRequestsPage />
          </RoleProtectedRoute>
        }
      />

      {/* RETURNS */}

      <Route
        path="/returns"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "librarian"]}>
            <ReturnsPage />
          </RoleProtectedRoute>
        }
      />

      {/* USERS */}

      <Route
        path="/users"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <UsersPage />
          </RoleProtectedRoute>
        }
      />

      {/* FINES */}

      <Route
        path="/fines"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <FineLedgerPage />
          </RoleProtectedRoute>
        }
      />

      {/* MY BORROWS */}

      <Route
        path="/my-borrows"
        element={
          <RoleProtectedRoute allowedRoles={["member"]}>
            <MyBorrowsPage />
          </RoleProtectedRoute>
        }
      />

      {/* MY FINES */}

      <Route
        path="/my-fines"
        element={
          <RoleProtectedRoute allowedRoles={["member"]}>
            <MyFinesPage />
          </RoleProtectedRoute>
        }
      />

      {/* FALLBACK */}

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
