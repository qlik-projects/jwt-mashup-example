# **Authorize Anonimous Users with JWT for Qlik Embedded**

> Published: January 2023 <br>
  Updated: January 2023
  
This example was created based on [Qlik Documentation](https://qlik.dev/tutorials/implement-jwt-authorization) and it is used only for demonstration by Presales team.
The instructions of this documentation is helper to create a demo on the local machine. 

## **How this project works?**

* gen-jwt project: generate jwt example
* mashup project: simple mashup example with iframe

These project are just code example, so it is not integrated automatically. It is necessary to copy token generated from gen-jwt and use it on the mashup project or on Postman endpoints.

## **Use Case**

Upon implementing JWT authorization to Qlik, there are a number of ways to add embedded content:

* JavaScript embedded visualization using nebula.js
* iframe embedded visualization using the single API
* Connect to REST endpoints when you need to in your web application front-end

In [Qlik Documentation](https://qlik.dev/tutorials/implement-jwt-authorization) there are many examples to help you.

## **Lab's ready**

* A public mashup using JWT, Analyzer Capacity Minutes, and Nebula.js: [https://qcs-anon-mashup.qlik-poc.com](https://qcs-anon-mashup.qlik-poc.com)

* A redirect link to access a Qlik Cloud Hub anonymously using JWT and Analyzer Capacity Minutes.

## **Setup**

#### **On PowerShell or Linux terminal (local machine)**

1. Gen certificate on local (using openssl)
    ```sh
    openssl genrsa -out privatekey.pem 4096
    openssl req -new -x509 -key privatekey.pem -out publickey.cer -days 1825
    ```
2. Generate base64 from privatekey.pem
    ```sh
    $cert = Get-Content privatekey.pem -Encoding UTF8 -Raw
    $cert_encoded = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($cert))
    echo $cert_encoded > private.key.txt
    ```

#### **On Qlik Cloud Tenant**

3. Create the JWT Identity Provider on Qlik Cloud Tenant (with *public key* certificate in a single line without spaces)
4. Create Web Integration ID on Qlik Cloud Tenant (whitelist)

    [For steps 3 and 4 there is more details in this link](https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization)
    
    It's important to include also [https://localhost] or [https://127.0.0.1] if you are using local machine to test.

5. Enable use Groups in Tenant 
6. Disable dynamic assignment of Professional users and Analyzer users, so all Anonymous users will be assigned with “Analyzer Capacity” license automatically.
7. Create a Anomynous Space -> Add Anonymous as Group Member. If anonymous group is not showing, you need logout, clean up browser’s cache and logon again.
8. Add Content Security Policy in the tenant to allow ```child-src``` ```frame-ancestors``` ```frame-src``` ```object-src```

#### **On Generate JWT Project (local machine)**

9. Install [Node](https://nodejs.org/en/download/)

10. Install Yarn package
    ```sh
    npm install --global yarn
    ````

11. Move the private.key.txt file generated in step 2 to the main folder at ```gen-jwt``` project

12. Modify config.js at ```gen-jwt``` project
    ```sh
    qlikWebIntegrationId: '<Web Integration ID configured step 4>',
    issuer: '<Issuer configured step 3>',
    keyid: '<keyid configured step 3>'
    ````

13. Modify server.js (just if you are using a existing user on Qlik Cloud; if you are testing with Anonymous User, skip this step)
    ```sh
    name: 'User Name';
    email: 'Email';
    ````

14. Start Project: 
    ```sh
    yarn start
    ````
15. Execute endpoint to get JWT:
    ```http://localhost:8080/tokenUser```
    ```http://localhost:8080/tokenAnon```

#### **On Mashup Project (local machine)**

16. Modify vars.js at ```mashup``` project
    ```sh
    const tenant = 'https://<tenant>.<region>.qlikcloud.com';
    const jwtEndpoint = 'https://<aws_api_gateway_url>/prod/jwt';
    const webInt = '<id from Web config on Qlik Cloud configured in step X>';
    const appId = '<app id used on mashup>';
    const sheetId = '<sheet ip from app>';
    const token = '<copy token from gen-jwt project step 12>';    
    ````
17. Create certificate for mashup
    ```sh
    openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
    ```
18. Include mashup fqdn.domain in the host file. In our case jwt-test.qlik-tech.com
19. Run mashup code at localhost by https://jwt-test.qliktech.com
    ```sh
    npx http-server -p 443 -S -c -1
    ```
## **How to know about User Analyzer consuming?**

https://community.qlik.com/t5/Support-Updates-Blog/Latest-Version-of-Entitlement-Analyzer-for-Qlik-Sense-Enterprise/ba-p/1817404

