REST API FOR Viso social media mobile application/web application

API:

```
"/signup" = for creating user account (name,email,password)
"/login" = for login user(email,password)
"/removeUser" = for deleting user account

******* for uploading images ***************

"/profileUpload" = for uploading profile image
"/otherUpload" = for uploading other images

******* for serving images *****************

"/profileImage" = for sending user profile image
"/listOfImages" = for sending a list of other uploaded images
"uploadImage/:name" = for sending other uploaded image (:name = image name)

************* friend suggestion *****************

"/suggestionList" = for getting list of friend id in same zip code
"/suggestion/profileImage/:id" = for getting profile image of suggested friend

```