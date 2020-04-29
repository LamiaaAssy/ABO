import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init';
import Signup from '../Screens/Signup'
import Calendar from '../Screens/Calendar'
import AllRequests from '../Screens/AllRequests'
import ChatHome from '../Screens/Chat/ChatHome'
import ChatView from '../Screens/Chat/ChatView'
import RequestDetails from '../Screens/RequestDetails'
import Profile from '../Screens/Profile'
import EditProfile from '../Screens/EditProfile'

const stack = createStackNavigator(
  {
    Init: Init,
    Calendar: Calendar,
    Signup: Signup,
    AllRequests: AllRequests,
    ChatHome: ChatHome,
    ChatView: ChatView,
    RequestDetails: RequestDetails,
    Profile: Profile,
    EditProfile: EditProfile,
  },
  {
    initialRouteName: 'Init',
    headerMode: 'none',
  },

)
const Stack = createAppContainer(stack);
export default Stack