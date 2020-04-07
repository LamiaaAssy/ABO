import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init';
import Signup from '../Screens/Signup'


const stack = createStackNavigator(
  {
    Init: Init,
    Signup: Signup,

  },
  {
    initialRouteName: 'Init',
    headerMode: 'none',
  },

)

const Stack = createAppContainer(stack);
export default Stack