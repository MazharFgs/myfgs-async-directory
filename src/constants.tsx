// export const apiUrl = `https://api.my.fgsglobal.com/api/`;
export const apiUrl = `http://localhost:5000/api/`;

export const getDirectoryAuthtoken = () => {
  const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");
  return checkDirectoryAuthToken?.replace(/^"(.*)"$/, "$1");
};

export const view_url =
  "https://my.fgsglobal.com/content/page/65d2c7a0ff842f089f9ca925";
