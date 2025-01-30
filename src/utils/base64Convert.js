const base64Convert = (event, callback) => {
  const file = event.target.files[0];
  if (file) {
    const extension = event?.target?.value
      .substr(event?.target?.value?.lastIndexOf("\\") + 1)
      .split(".")[1];
    const reader = new FileReader();
    // Convert file to Base64
    reader.onload = () => {
      callback({ fileType: extension, file: reader.result });
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64: ", error);
    };
    reader.readAsDataURL(file); // Convert file to Base64
  }
};

export default base64Convert;

export const extensionsAllowed = ["png", "jpeg", "gif", "pdf", "jpg"];
