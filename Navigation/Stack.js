import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init'
import Calendar from '../Screens/Calendar'

const stack = createStackNavigator(
  {
    Init: Init,
    Calendar: Calendar,
  },
  {
    initialRouteName: 'Calendar',
    headerMode: 'none',
  },

)

const Stack = createAppContainer(stack);
export default Stack