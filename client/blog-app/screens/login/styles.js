import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#4caad5",
  },
  loginContainer: {
    width: "100%",
    paddingHorizontal: 22,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#231651",
    marginBottom: 32,
  },
  input: {
    height: 40,
    marginVertical: 6,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#dae0e9",
    paddingLeft: 15,
    width: "100%",
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 1,
    color: "#dae0e9",
  },
  loginText: {
    fontSize: 16,
    color: "#231651",
  },
  loginButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#f6f9ff",
    paddingVertical: 10,
    paddingHorizontal: "12.5%",
    marginTop: 32,
    marginBottom: 150,
    marginRight: 22,
    backgroundColor: "#f6f9ff",
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4caad5",
  },

  backButton: {
    backgroundColor: "#f6f9ff",
    marginLeft: 22,
    marginBottom: 150,
    borderRadius: 50,
  },
});

export default styles;
