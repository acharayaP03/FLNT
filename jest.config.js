
 

export default {
  preset: 'ts-jest',
  globals: {},
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
     '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}