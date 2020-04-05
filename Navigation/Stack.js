import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Init from '../Screens/Init';
import RequestDetails from '../Screens/RequestDetails';


const stack = createStackNavigator(
  {
    Init: Init,
    RequestDetails: RequestDetails,

  },
  {
    initialRouteName: 'RequestDetails',
    headerMode: 'none',
  },

)

const Stack = createAppContainer(stack);
export default Stack