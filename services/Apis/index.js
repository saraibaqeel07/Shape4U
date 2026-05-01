import { deleted, get, patch, post, put } from '../';
import routes from './routes';

const ApiServices = {
    Login: async (obj) => {
        const data = await post(routes.Login, obj);
        return data;
    },
    Signup: async (obj) => {
        const data = await post(routes.Signup, obj);
        return data;
    },
    Onboarding: async (obj) => {
        const data = await post(routes.Onboarding, obj);
        return data;
    },
    GetDashboard: async () => {
        const data = await get(routes.GetDashboard);
        return data;
    },
    GetWeeks: async () => {
        const data = await get(routes.GetWeeks);
        return data;
    },
    GetWeekByNumber: async (weekNumber) => {
        const data = await get(routes.GetWeekByNumber(weekNumber));
        return data;
    },
    SubmitWeight: async (weekNumber, weightKg) => {
        const data = await put(routes.SubmitWeight(weekNumber), { weightKg });
        return data;
    },
    SubmitReflection: async (weekNumber, payload) => {
        const data = await put(routes.SubmitReflection(weekNumber), payload);
        return data;
    },
    CompleteWeek: async (weekNumber) => {
        const data = await post(routes.CompleteWeek(weekNumber), {});
        return data;
    },
    GetPdf: async (path) => {
        const data = await get(routes.GetPdf, { path });
        if (data?.url) window.open(data.url, "_blank");
        return data;
    },
};

export default ApiServices;
