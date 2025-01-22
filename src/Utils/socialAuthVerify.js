import axios from 'axios';

export const verifyGoogleToken = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return {
      email: response.data.email,
      name: response.data.name,
      picture: response.data.picture,
      verified: response.data.email_verified
    };
  } catch (error) {
    throw new Error('Invalid Google token');
  }
};

export const verifyFacebookToken = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=name,email,picture&access_token=${accessToken}`
    );

    return {
      email: response.data.email,
      name: response.data.name,
      picture: response.data.picture?.data?.url
    };
  } catch (error) {
    throw new Error('Invalid Facebook token');
  }
};