import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { SearchPage } from '@/pages/SearchPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { BrowsePage } from '@/pages/BrowsePage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { InvestmentAnalysisPage } from '@/pages/InvestmentAnalysisPage';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { ComparePage } from '@/pages/ComparePage';
import { RegisterPage } from '@/pages/RegisterPage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ForDevelopersPage } from '@/pages/ForDevelopersPage';
import { DeveloperSignupPage } from '@/pages/DeveloperSignupPage';
import { DeveloperPortalPage } from '@/pages/DeveloperPortalPage';
import { AddProjectPage } from '@/pages/AddProjectPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { ScoreEditorPage } from '@/pages/ScoreEditorPage';
import { JourneysPage } from '@/pages/JourneysPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsOfUsePage } from '@/pages/TermsOfUsePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/property/:id/analysis" element={<InvestmentAnalysisPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/developers" element={<ForDevelopersPage />} />
        <Route path="/developers/apply" element={<DeveloperSignupPage />} />
        <Route path="/developer-portal" element={<DeveloperPortalPage />} />
        <Route path="/developer-portal/add-project" element={<AddProjectPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/scores" element={<ScoreEditorPage />} />
        <Route path="/admin/journeys" element={<JourneysPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfUsePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
