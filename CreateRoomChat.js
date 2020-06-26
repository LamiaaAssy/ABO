import database from '@react-native-firebase/database';


export const CreateRoomChat = (user1, user2, callback) => {
    let isexist = true

    let reference = database().ref('/Chat');
    reference.on('value', snapshot => {

        for (var key in snapshot.val()) {
            console.log('lamiaa: ', snapshot.val()[key])

            if ((snapshot.val()[key].user1 == user1 && snapshot.val()[key].user2 == user2)
                || (snapshot.val()[key].user2 == user1 && snapshot.val()[key].user1 == user2)) {


                callback(key)
                return
                console.log('test: ', key)

            }
        }
        isexist = false
        // alert('lii')

    })
    //.then(()=>{
    //     let x = { user1, user2 }
    //     let ref = reference.push(x)


    // return (ref.key)

    // })

    //create room
    if (!isexist) {
        let x = { user1, user2 }
        let ref = reference.push(x)


        callback(ref.key)
    }



}