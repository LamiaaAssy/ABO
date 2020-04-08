import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init'
import Calendar from '../Screens/Calendar'
import Signup from '../Screens/Signup'

const stack = createStackNavigator(
  {
    Init: Init,
    Calendar: Calendar,
    Signup: Signup,
  },
  {
    initialRouteName: 'Init',
    headerMode: 'none',
  },

)

const Stack = createAppContainer(stack);
export default Stack