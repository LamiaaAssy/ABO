import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init';
import Signup from '../Screens/Signup'
import Calendar from '../Screens/Calendar'
import AllRequests from '../Screens/AllRequests'
import ChatHome from '../Screens/Chat/ChatHome'


const stack = createStackNavigator(
  {
    Init: Init,
    Calendar: Calendar,
    Signup: Signup,
    AllRequests: AllRequests,
    ChatHome: ChatHome,
  },
  {
    initialRouteName: 'Init',
    headerMode: 'none',
  },

)
const Stack = createAppContainer(stack);
export default Stack