import axios from "axios";
let BaseURL = "http://localhost:3000/";
// let Base = process.env.API_URL;
// console.log("base",Base)

export const ApiGetMethod = async (type: string) => {
  try {
    const response = await axios.get(BaseURL + type);
    return response;
  } catch (error) {
    console.error("error", error.message);
    if (
      error &&
      error.hasOwnProperty("response") &&
      error.response &&
      error.response.hasOwnProperty("data") &&
      error.response.data &&
      error.response.data.hasOwnProperty("error") &&
      error.response.data.error
    ) {
      console.error(error.response.data.error);
      if (error.response.status === 401) {
        window.location.reload();
        return;
      }
    } else {
      console.error(error);
    }
  }
};

export const ApiPostMethod = async (type: string, userData: any) => {
  try {
    const response = await axios.post(BaseURL + type, userData);
    return response;
  } catch (error) {
    console.error("error", error.message);
    if (
      error &&
      error.hasOwnProperty("response") &&
      error.response &&
      error.response.hasOwnProperty("data") &&
      error.response.data
    ) {
      let errorMessage = "Server Error Please try again";
      if (
        error.response.data.hasOwnProperty("error") &&
        error.response.data.error
      ) {
        errorMessage = error.response.data.error;
      }

      if (
        error.response.data.hasOwnProperty("message") &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      if (error.response.status === 401) {
        window.location.reload();
        return;
      }
      console.error({ message: errorMessage });
    } else {
      console.error(error);
    }
  }
};

export const ApiPutMethod = async (type: string, userData: any) => {
  try {
    const response = await axios.put(BaseURL + type, userData);
    return response;
  } catch (error) {
    console.error("error", error.message);
    if (
      error &&
      error.hasOwnProperty("response") &&
      error.response &&
      error.response.hasOwnProperty("data") &&
      error.response.data
    ) {
      let errorMessage = "Server Error Please try again";
      if (
        error.response.data.hasOwnProperty("error") &&
        error.response.data.error
      ) {
        errorMessage = error.response.data.error;
      }

      if (
        error.response.data.hasOwnProperty("message") &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      if (error.response.status === 401) {
        window.location.reload();
        return;
      }
      console.error({ message: errorMessage });
    } else {
      console.error(error);
    }
  }
};

export const ApiDeleteMethod = async (type: string) => {
  try {
    const response = await axios.delete(BaseURL + type);
    return response;
  } catch (error) {
    console.error("error", error.message);
    if (
      error &&
      error.hasOwnProperty("response") &&
      error.response &&
      error.response.hasOwnProperty("data") &&
      error.response.data &&
      error.response.data.hasOwnProperty("error") &&
      error.response.data.error
    ) {
      console.error(error.response.data.error);
      if (error.response.status === 401) {
        window.location.reload();
        return;
      }
    } else {
      console.error(error);
      if (
        error &&
        error.hasOwnProperty("response") &&
        error.response &&
        error.response.hasOwnProperty("data") &&
        error.response.data
      ) {
        let errorMessage = "Server Error Please try again";
        if (
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }

        if (
          error.response.data.hasOwnProperty("message") &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }

        if (error.response.status === 401) {
          localStorage.clear();
          window.location.reload();
          return;
        }
        console.error({ message: errorMessage });
      } else {
        console.error(error);
      }
    }
  }
};
