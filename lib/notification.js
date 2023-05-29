import axios from 'axios';

export const sendNotification = async (data) => {
  try {
    const response = await axios.post('/api/notification', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
