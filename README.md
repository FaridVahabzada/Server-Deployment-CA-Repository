![Brand Logo](/public/images/srv.jpg) 
 
# Application Name: **Census App**
## Purpose: **To let one logged-in admin with the given credentials to manually capture participants’ details.**
### Author: **Farid Vahabzada**

---

&nbsp;

# Application Installation and Usage Instructions
Not any special installation processes are required other than using the links given below when attempting the simple CRUD operations via **Postman**:
1. POST: https://server-deployment-ca-repository.onrender.com/login
2. POST: https://server-deployment-ca-repository.onrender.com/participants/add
3. GET: https://server-deployment-ca-repository.onrender.com/participants
4. GET: https://server-deployment-ca-repository.onrender.com/participants/details
5. GET: https://server-deployment-ca-repository.onrender.com/participants/details/:email
6. GET: https://server-deployment-ca-repository.onrender.com/participants/work/:email
7. GET: https://server-deployment-ca-repository.onrender.com/participants/home/:email
8. DELETE: https://server-deployment-ca-repository.onrender.com/participants/:email
9. PUT: https://server-deployment-ca-repository.onrender.com/participants/:email

It should be noted that only the **login** API endpoint is available as creating new admin users was **not** a CA requirement.\
All the routes given above except the first one needs authorization, so token lasting 1 hour recieved as a response from loging in needs to be utilized in every one of them.

# Environment Variables
Information on the environment variables needed:
```
TOKEN_SECRET = "685d29be5136972858b2a7e42be92344d914e51c1dab89a6263974a9c3c8ad0e4cfc4aaed41bf4f7614112ad3a1eee54b2baad5a74f2bc8bb3439152f6482b7b"
```
This environment variable was used on the Render platform while the hosting process was setup. Here's how it looked like:

![Settings](/public/images/settings.png)

The app went live as expected as shown below:

![Rendering](/public/images/rendered.png)

# Additional Libraries/Packages
The technologies / external libraries used are given below:

![Packages](/public/images/packages.png)

# NodeJS Version Used
Node version was accessed by the **node -v** command and it is shown below:

![Node Version](/public/images/node.png)

# Further recommendations and future plans

Remarks for the users or the issues to be fixed for the future app versions, as they do **NOT** cause any functionality problems, are: 
+ As shown above, on the Render platform we made use of the free instance which usually spins down after periods of inactivity, which can **delay** requests **by 50 seconds or more**.
+ All the possible errors that user might face was considered for and appropriate error messages should be received upon commiting any.
+ Recommended participant JSON example for a request body can be seen as follows:
![Request Body](/public/images/json.png)
+ **Date of birth**s should follow **"YYYY-MM-DD"** date convention, which considers using **zero** if month or day value is **less than 10**.
+ One possible bug, which is most likely related to how and in which order some codes are written, is after logging in and attempting to add a participant for the first time, we are getting a response as below:
![Possible Bug](/public/images/bug.png)
\
**This issue** can easily be solved by sending the **same** request over **again**.
+ For creating the JSON schema the [JSON Schema](https://www.jsonschema.net/) page was used. And for validating any created JSONs, we used the [JSON Schema Validator](https://www.jsonschemavalidator.net/) page.