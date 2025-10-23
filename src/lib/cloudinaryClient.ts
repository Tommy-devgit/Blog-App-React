// src/lib/cloudinaryClient.ts
export const uploadToCloudinary = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/dgy1shbbd/upload`; // your cloud name
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // replace with your unsigned preset name

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; // URL of uploaded image
};
