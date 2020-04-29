import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init';
import BloodRequestForm from '../Screens/BloodRequest'
import HomePage from '../Screens/HomePage'
import NavBar from '../Screens/NavBar'
import ExploreDonners from '../Screens/ExploreDonors'
const stack = createStackNavigator(
  {
    Init: Init,
    HomePage: HomePage,
    BloodRequestForm: BloodRequestForm,
    NavBar: NavBar,
    ExploreDonners: ExploreDonners,
  },
  {
    initialRouteName: 'Init',
    headerMode: 'none',
  },

)

const Stack = createAppContainer(stack);
export default Stack