import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { BrowsePage } from '@/pages/BrowsePage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { InvestmentAnalysisPage } from '@/pages/InvestmentAnalysisPage';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { ComparePage } from '@/pages/ComparePage';
import { RegisterPage } from '@/pages/RegisterPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { AccountSettingsPage } from '@/pages/AccountSettingsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ForDevelopersPage } from '@/pages/ForDevelopersPage';
import { DeveloperSignupPage } from '@/pages/DeveloperSignupPage';
import { DeveloperPortalPage } from '@/pages/DeveloperPortalPage';
import { MyProjectsPage } from '@/pages/MyProjectsPage';
import { ProjectUnitsPage } from '@/pages/ProjectUnitsPage';
import { LeadsPage } from '@/pages/LeadsPage';
import { CompanyProfilePage } from '@/pages/CompanyProfilePage';
import { VerificationStatusPage } from '@/pages/VerificationStatusPage';
import { AddProjectPage } from '@/pages/AddProjectPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { ApprovalsQueuePage } from '@/pages/ApprovalsQueuePage';
import { AdminReviewPage } from '@/pages/AdminReviewPage';
import { DeveloperVerificationPage } from '@/pages/DeveloperVerificationPage';
import { UserManagementPage } from '@/pages/UserManagementPage';
import { ScoreEditorPage } from '@/pages/ScoreEditorPage';
import { JourneysPage } from '@/pages/JourneysPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsOfUsePage } from '@/pages/TermsOfUsePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Toast, Modal } from '@/components/Feedback';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* investor */}
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/property/:id/analysis" element={<InvestmentAnalysisPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/settings" element={<AccountSettingsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* developer */}
        <Route path="/developers" element={<ForDevelopersPage />} />
        <Route path="/developers/apply" element={<DeveloperSignupPage />} />
        <Route path="/developer-portal" element={<DeveloperPortalPage />} />
        <Route path="/developer-portal/projects" element={<MyProjectsPage />} />
        <Route path="/developer-portal/units" element={<ProjectUnitsPage />} />
        <Route path="/developer-portal/leads" element={<LeadsPage />} />
        <Route path="/developer-portal/company" element={<CompanyProfilePage />} />
        <Route path="/developer-portal/verification" element={<VerificationStatusPage />} />
        <Route path="/developer-portal/add-project" element={<AddProjectPage />} />

        {/* admin */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/approvals" element={<ApprovalsQueuePage />} />
        <Route path="/admin/review" element={<AdminReviewPage />} />
        <Route path="/admin/verification" element={<DeveloperVerificationPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/scores" element={<ScoreEditorPage />} />
        <Route path="/admin/journeys" element={<JourneysPage />} />

        {/* legal */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfUsePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* One toast and one confirm dialog for the whole app, as in the prototype. */}
      <Toast />
      <Modal />
    </BrowserRouter>
  );
}
