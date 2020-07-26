import { AsyncStorage } from 'react-native';


export const saveUser = async (id, email, name, gender, bloodType, address, phone) => {
    console.log('hello from saveUSer')

    try {
        await AsyncStorage.setItem('userId', id);
        await AsyncStorage.setItem('Email', email);
        await AsyncStorage.setItem('UserName', name);
        await AsyncStorage.setItem('Gender', gender);
        await AsyncStorage.setItem('BloodType', bloodType);
        await AsyncStorage.setItem('Address', address);
        await AsyncStorage.setItem('Phone', phone);

        console.log('user in save user finction ', id, email, name, gender, bloodType, address, phone)
        getUser();
    } catch (error) {
        console.log(error.message);
    }


}

export const getUser = async () => {
    let id = '';
    let email = '';
    let name = '';
    let gender = '';
    let bloodType = '';
    let address = '';
    let phone = '';
    try {

        id = await AsyncStorage.getItem('userId') || 'none';
        email = await AsyncStorage.getItem('Email') || 'none';
        name = await AsyncStorage.getItem('UserName') || 'none';
        gender = await AsyncStorage.getItem('Gender') || 'none';
        bloodType = await AsyncStorage.getItem('BloodType') || 'none';
        address = await AsyncStorage.getItem('Address') || 'none';
        phone = await AsyncStorage.getItem('Phone') || 'none';
        //console.log("User from storage in local screen", id, email, name, gender, bloodType, adress, phone)
        let user = {
            id: id,
            email: email,
            name: name,
            gender: gender,
            bloodType: bloodType,
            address: address,
            phone: phone
        }
        console.log("helloooooooo : ", user)
        return user

    } catch (error) {
        console.log(error.message);
    }



}