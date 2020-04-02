import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Init from '../Screens/Init'


const stack = createStackNavigator(
    {
      Init : Init , 
    },
    {
      initialRouteName: 'Init',
      headerMode: 'none',
    },
    
  )

  const Stack=createAppContainer(stack);
 export default Stack