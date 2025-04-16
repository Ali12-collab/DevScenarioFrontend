import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';  // Import the Navbar component
import HomePage from './Pages/HomePage';
import AppsPage from './Pages/AppsPage';  // Import the AppsPage
import NewApplication from './Pages/NewApplication';  // Import the NewApplication page
import EditApplication from './Pages/EditApplication';  // Import the EditApplication page
import StatusLevelPage from '../src/Pages/StatusLevelPage';  // Import the StatusLevelPage
import CreateStatusLevel from '../src/Pages/CreateStatusLevel';  // Import the CreateStatusLevel page
import EditStatusLevel from '../src/Pages/EditStatusLevel';  // Import the EditStatusLevel page
import InquiriesPage from '../src//Pages/InquiriesPage';  // Import the InquiriesPage
import CreateInquiry from '../src/Pages/CreateInquiry';  // Import the CreateInquiry page
import EditInquiry from '../src/Pages/EditInquiry';  // Import the EditInquiry page


const App = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/applications" element={<AppsPage />} /> {/* Route for AppsPage */}
        <Route path="/create" element={<NewApplication />} />
        <Route path="/edit/:id" element={<EditApplication />} />
        <Route path="/status" element={<StatusLevelPage />} />
        <Route path="/status/create" element={<CreateStatusLevel />} />
        <Route path="/status/edit/:id" element={<EditStatusLevel />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/inquiries/create" element={<CreateInquiry />} />
        <Route path="/inquiries/edit/:id" element={<EditInquiry />} />
      </Routes>
    </div>
  </Router>
);

export default App;
