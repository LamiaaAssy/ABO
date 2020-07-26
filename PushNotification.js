import database from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';



export const sendPushNotification = (toUserId = null, title = "", message = "") => {
    let url = 'https://fcm.googleapis.com/fcm/send';
    let serverKey = "key=" + "AAAAk_J95Lg:APA91bETqmgW_b-yNBHugpZ4cfOYWy0mxBTBrq3KpbTsr4Tp1_OFkwKATkqmaabROFlr_5Re0DuDl5dMBdVdDVoRg2rpJ36vZDlf_Kou14USq69B7j01203S7HEOkcVYDy_HKHSmlw4z"


    if (toUserId) {
        database().ref(`users/${toUserId}/firebaseTokens`).once("value", snapShot => {
            console.log("Snapshot", snapShot.val())
            if (snapShot.val()) {
                try {
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": serverKey
                        },
                        body: JSON.stringify({
                            "registration_ids": snapShot.val(),
                            "notification": {
                                "title": title,
                                "body": message,
                                "priority": "high"
                            },
                            "data": {
                                "sender": auth().currentUser.uid,
                                "receiver": toUserId
                            }
                        })
                    }).then((response) => {
                        console.log("Send firebase response : ", response)
                    })
                } catch (error) {
                    console.log("Send firebase error", error)
                }
            }
            else {
                console.warn("There is no firebase tokens for this user")
            }
        })
    }
    else {
        console.error("Please send receiver user id in first paramter")
    }








}