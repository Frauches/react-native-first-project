import { createStackNavigator } from "react-navigation-stack";
import Main from "./pages/main";
import Product from "./pages/product";

const Routes = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: "Home",
      headerStyle: {
        backgroundColor: "#DA552F"
      },
      headerTintColor: "#FFF"
    }
  },
  Product: {
    screen: Product,
  }
});

export default Routes;
