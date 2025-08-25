const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken ? user.getJWTToken() : jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  const isProd = process.env.NODE_ENV === 'production';
  const options = {
    expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
     sameSite: isProd ? 'None' : 'Lax',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    },
    token
  });
};

module.exports = sendToken;
