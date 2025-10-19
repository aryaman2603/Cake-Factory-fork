const awsExports = {
    Auth: {
      Cognito: {
        userPoolId: "ap-south-1_ZgUxxKs1K",
        userPoolClientId: "3jak1rhca78c24bgartbv7ingn",
        region: "ap-south-1",
        signUpVerificationMethod: "code", // or "link"
        loginWith: {
          username: true,
          email: true,
        },
      },
    },
  };
  
  export default awsExports;
  
  