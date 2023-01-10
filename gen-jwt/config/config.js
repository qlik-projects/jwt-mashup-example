const loginTypes = {
    INTERACTIVE_LOGIN: 'interactive-login',
    JWT_LOGIN: 'jwt-login'
  }
  
  module.exports = {
    loginTypes,
    currentLoginType: loginTypes.JWT_LOGIN,
     
    qlikWebIntegrationId: 'xxxxxxxxxxxx',
    issuer: 'xxxxxxxx',
    keyid: 'xxxxxxxxxxx'
  };
  