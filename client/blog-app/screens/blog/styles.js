import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe4ea",
  },
  content: {
    alignContent: "center",
    alignItems: "center",
    //justifyContent: "center",
    marginTop: 120,
  },
  iconEdit: {
    marginTop: 5,
  },
  blogTitle: {
    color: "#2d3436",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 5,
    textAlign: "center",
  },
  blogBody: {
    fontSize: 18,
    marginTop: 16,
    marginHorizontal: 14,
  },
  backButton: {
    backgroundColor: "#008DD5",
    marginLeft: 22,
    marginTop: 60,
    marginBottom: -90,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  blogAuthor: {
    color: "#008DD5",
    fontSize: 15,
  },
});
export default styles;
