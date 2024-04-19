const API_BASE_URL = "http://localhost:8080";

export const endpoints = {
  files: {
    createDir: `${API_BASE_URL}/createDir`,
    upload: (folderPath: string) =>
      `${API_BASE_URL}/upload?dir=${encodeURIComponent(folderPath)}`,
    getFolders: `${API_BASE_URL}/getAllFiles`,
    //getFolders: `${API_BASE_URL}/getFolders`,
    getFiles: (getFilePath: string) =>
      `${API_BASE_URL}/getFiles?dir=${encodeURIComponent(getFilePath)}`,
    download: (folder: string, fileName: string) =>
      `${API_BASE_URL}/download/${encodeURIComponent(
        folder
      )}/${encodeURIComponent(fileName)}`,

    delete: (filename: string, dir: string) =>
      `${API_BASE_URL}/deleteFile?filename=${encodeURIComponent(
        filename
      )}&dir=${encodeURIComponent(dir)}`,
    deleteDir: (dir: string) =>
      `${API_BASE_URL}/deleteDir?dir=${encodeURIComponent(dir)}`,
  },
};
