import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger-output.json"; // output file
const endpointsFiles = ["../server.js"]; // API endpoints

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log("Swagger documentation generated successfully!");
});
