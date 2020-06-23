import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Signup from './Screens/Signup'
import Calendar from './Screens/Calendar'
import AllRequests from './Screens/AllRequests'
import ChatHome from './Screens/Chat/ChatHome'
import ChatView from './Screens/Chat/ChatView'
import RequestDetails from './Screens/RequestDetails'
import Profile from './Screens/Profile'
import EditProfile from './Screens/EditProfile'
import Logo from './Screens/Logo'
import BloodRequestForm from './Screens/BloodRequest'
import HomePage from './Screens/HomePage'
// import NavBar from './Screens/NavBar'
import ExploreDonners from './Screens/ExploreDonors'
import forgetPassword from './Screens/forgetPassword'
import search from './Screens/search'
import login from './Screens/login'
import notification from './Screens/notification'
import Splash from './Screens/Splash'
import NavBar2 from './components/NavBar2'
import NavBar from './components/NavBar'
import matching from './Screens/matching'

const stack2 = createStackNavigator({
  Logo: Logo,
  Calendar: Calendar,
  AllRequests: AllRequests,
  ChatHome: ChatHome,
  ChatView: ChatView,
  RequestDetails: RequestDetails,
  Profile: Profile,
  EditProfile: EditProfile,
  HomePage: HomePage,
  BloodRequestForm: BloodRequestForm,
  NavBar: NavBar,
  NavBar2: NavBar2,
  ExploreDonners: ExploreDonners,
  search: search,
  notification: notification,
  matching: matching
},
  {
    initialRouteName: 'RequestDetails',
    headerMode: 'none',
  },
)
////////////////////////////////////////////////////////////////
const stack = createStackNavigator(
  {
    Splash: Splash,
    Logo: Logo,
    Signup: Signup,
    login: login,
    forgetPassword: forgetPassword,
    "after-login": stack2
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },

)
///////////////////////////////////////////////////////
const SwitchNavigator = createSwitchNavigator({
  "before-login": stack,
  "after-login": stack2


},
  {
    initialRouteName: 'before-login',
    headerMode: 'none'
  }
)

const App = createAppContainer(SwitchNavigator);
export default App;
