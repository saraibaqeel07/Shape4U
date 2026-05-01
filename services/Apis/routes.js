const routes = {
    Login: '/auth/login',
    Signup: '/auth/signup',
    Onboarding: '/auth/onboarding',
    GetDashboard: '/user/dashboard',
    GetWeeks: '/user/weeks',
    GetWeekByNumber: (weekNumber) => `user/weeks/${weekNumber}`,
    SubmitWeight: (weekNumber) => `/user/weeks/${weekNumber}/weight`,
    SubmitReflection: (weekNumber) => `/user/weeks/${weekNumber}/reflection`,
    CompleteWeek: (weekNumber) => `/user/weeks/${weekNumber}/complete`,
    GetPdf: '/user/pdf',
};

export default routes;
