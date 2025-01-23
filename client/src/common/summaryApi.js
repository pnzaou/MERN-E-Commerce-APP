export const baseURL = "http://localhost:8080"

const SummaryApi = {
    register : {
        url: '/api/user/register',
        method: 'post'
    },
    login : {
        url: '/api/user/login',
        method: 'post'
    },
    forgotPassword: {
        url: '/api/user/forgot-password',
        method: 'put'
    },
    otpVerification: {
        url: '/api/user/verify-forgot-password-otp',
        method: 'put'
    },
    resertPassword: {
        url: '/api/user/reset-password',
        method: 'put'
    },
    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'post'
    }
}

export default SummaryApi