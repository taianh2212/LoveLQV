export const uploadAPI = {
  upload: async (imageFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          
          const response = await fetch('http://localhost:5000/api/upload/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64String }),
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          resolve(data.url);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(imageFile);
    });
  },

  delete: async (publicId: string): Promise<void> => {
    await fetch(`http://localhost:5000/api/upload/delete/${publicId}`, {
      method: 'DELETE',
    });
  },
};
