import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"


export const registerAPI = async (users) => {
    return await commonAPI('POST', `${BASE_URL}/users/register`, users, "")
}

export const loginAPI = async (users) => {
    return await commonAPI('POST', `${BASE_URL}/users/login`, users, "")
}

export const addProdutAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${BASE_URL}/product/addnew`, reqBody, reqHeader)
}

export const updateStockAPI = async (productId, reqBody, reqHeader) => {
    return await commonAPI('PUT', `${BASE_URL}/product/update/${productId}`, reqBody, reqHeader);
}

export const getAllUsersAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/project/all-users`)
}

export const addToCartAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${BASE_URL}/cart/add`, reqBody, reqHeader)
}

export const getCartItemsAPI = async (userId) => {
    return await commonAPI('GET', `${BASE_URL}/getcart/items?userId=${userId}`);
}

export const getAllprojectAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/project/all-project`)
}

export const getAllOrdersAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/orders/all`);
}

export const updateCartItemAPI = async (cartItemId, quantity) => {
    return await commonAPI('PUT', `${BASE_URL}/cart/update/${cartItemId}`, { quantity });
}


