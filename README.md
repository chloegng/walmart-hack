# Team N.I.C.K. 
-----------
pitch notes:

categories:
our project is [short one line description]
we aim to help people save money by letting users find more easily, and instantly notify when things go on sale 

we used their api


------------
How it works:

we call walmart api to get data - fresh data
- if we had more than just 10 hours, we would save this stuff to mongodb and be able to play with trends

we list the ten items in it's own product card
- their name
- their price
- the picture 
- description 
- customer rating


users can sort by a few categories and web app will show accordingly
theoretically we could track click counts on products and with that knowledge, opt to show it higher on the


we also have this feature where enlisted users in this alerting program - when prices drop below msrp
would get a text whenever a product in a category (such as electronics) price drops below msrp

for example, here's two texts of two products that are selling below msrp
- user can register for certain category 
- every time product in that catergory drops below msrp
- text users registered to that "[product] is selling below msrp at $[price]"
- we could additionally send users a picture of the product and it's rating info it it is > 4 stars 
- also could send a bit.ly for a link to the product directly
that could help promote sales 
- WHATS GREAT?
- the user doesnt have to download an app or anything, we simply just have them enroll and they get it all via text messages
-given more time, we could implementt also a chat bot that helps users, they could text their query and our bot would text them back the API and data
- this can be integrated in the text service and also a web chat bot on the website


PITHC WE BELEIVE INFORMATION AND RESEARCH IS REALLY IMPORTANT
WITH THIS, we provide the user a plethora of information easily accessible
and this helps promote smart decisions(buying things at a good price)
 and user to save money and 
----------
Technologies used:
- Mongodb: phone number registry and what categories they register for 
- ExpressJS
- Node.js
- EJS
- HTML, CSS, JavaScript 
- Twilio
- and lastly, but not least
- Walmart API

----------
Thank you! 
