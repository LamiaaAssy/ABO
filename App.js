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
import Maps from './Screens/Maps'
import LocationList from './Screens/Maps/LocationList'
import MyAcceptedReq from './Screens/MyAcceptedReq'
import MyRequests from './Screens/MyRequests'
import Covid from './Screens/Covid'
import BeDonor from './Screens/BeDonor'
import RequestBlazma from './Screens/RequestBlazma'
import PlasmaDonors from './Screens/PlasmaDonors'
const stack2 = createStackNavigator({
  //Logo: Logo,
  Calendar: Calendar,
  AllRequests: AllRequests,
  ChatHome: ChatHome,
  ChatView: ChatView,
  RequestDetails: RequestDetails,
  Profile: Profile,
  EditProfile: EditProfile,
  HomePage: HomePage,
  BloodRequestForm: BloodRequestForm,
  ExploreDonners: ExploreDonners,
  search: search,
  notification: notification,
  Maps: Maps,
  LocationList: LocationList,
  login: login,
  MyAcceptedReq: MyAcceptedReq,
  MyRequests: MyRequests,
  Covid: Covid,
  BeDonor: BeDonor,
  RequestBlazma: RequestBlazma,
  PlasmaDonors: PlasmaDonors

},
  {
    initialRouteName: 'HomePage',
    headerMode: 'none'
  },
)
////////////////////////////////////////////////////////////////
const stack = createStackNavigator(
  {

    Logo: Logo,
    Signup: Signup,
    login: login,
    forgetPassword: forgetPassword,
    Maps: Maps,
    LocationList: LocationList,
  },
  {
    initialRouteName: 'login',
    headerMode: 'none',
  },

)
///////////////////////////////////////////////////////
const SwitchNavigator = createSwitchNavigator({
  "before-login": stack,
  "after-login": stack2,
  Splash: Splash,


},
  {
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
)

const App = createAppContainer(SwitchNavigator);
export default App;