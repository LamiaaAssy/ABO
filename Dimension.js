import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

// const metrics = {

//     screenWidth : width < height ? width:height ,
//     screenWidth : width < height ?height:width ,  

// }

export const calcRatio = (target, parent = 375) => {
    let ratio = ((target / parent) * 100.0).toString() + "%"
    return ratio
}

export const calcWidth = (target) => {

    return width * (target / 375)

}

export const calcHeight = (target) => {

    return height * (target / 667)

}

