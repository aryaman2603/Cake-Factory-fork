// Lex chatbot configuration
const lexConfig = {
    Interactions: {
      bots: {
        "CakeFactoryAssistant": {
          name: "CakeFactoryAssistant", // your Lex bot name
          alias: "$LATEST",             // your bot alias
          region: "ap-southeast-1",         // Lex bot region
        },
      },
    },
  };
  
  export default lexConfig;
  