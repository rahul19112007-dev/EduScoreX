import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Leaderboard from "./pages/Leaderboard";
import ManageClasses from "./pages/ManageClasses";
import EditStudent from "./pages/EditStudent";
import ReportCard from "./pages/ReportCard";
import ActivityLogs from "./pages/ActivityLogs";
import Attendance from "./pages/Attendance";
import MyRank from "./pages/MyRank";
import MyAttendance from "./pages/MyAttendance";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<AddStudent />} />
<Route
  path="/my-attendance"
  element={<MyAttendance />}
/>
<Route
  path="/leaderboard"
  element={<Leaderboard />}
/>
        <Route path="/manage-classes" element={<ManageClasses />} />
	<Route path="/edit-student/:id" element={<EditStudent />} />
<Route
  path="/report/:id"
  element={<ReportCard />}
/>
<Route
  path="/activity"
  element={<ActivityLogs />}
/>
<Route
  path="/attendance"
  element={<Attendance />}
/>
<Route
  path="/my-rank"
  element={<MyRank />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;