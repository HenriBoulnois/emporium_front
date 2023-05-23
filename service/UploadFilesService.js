class UploadFilesService {
  upload (file, onUploadProgress) {
    const formData = new FormData();

    formData.append('file', file);

    return this.axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  }

  getFiles () {
    return this.axios.get('/files');
  }
}

export default new UploadFilesService();
