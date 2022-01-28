// IIFE - Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{
    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayHomePage()
    {

        console.log("Home Page");

        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            // redirect to about page
            location.href = "about.html";
        });
        
        //step 1 get a reference to an entry point(s)
        let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        //step 2 create an element
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

        //step 3 configure new element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the main Paragraph";
        Article.setAttribute("class", "container");

        //step 4 add/insert new element
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

        // Deletion example
        // document.getElementById("ArticleParagraph").remove();

        // let NewH1 = document.createElement("h1");
        // NewH1.setAttribute("class", "display-1");

        // MainContent.before(NewH1);

        // NewH1.textContent = "Hello, World!";


    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckBox");

        // localStorage.setItem("1", "Dhruv");
        // console.log(localStorage.getItem("1"));
        // localStorage.removeItem("1");
        // console.log(localStorage.length);

        sendButton.addEventListener("click", function()
        {
            //event.preventDefault(); // for Debugging
            if(subscribeCheckBox.checked)
            {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact List Page");

        if(localStorage.length > 0) // check if localStorage has soemthing in it
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;

            //for every key in the keys collection loop
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // retrieve contact data from localstorage

                let contact = new Contact(); // creates an empty Contact object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td></td>
                <td></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;
        }
    }

    // named function
    function Start()
    {
        console.log("App Started!!");

        switch (document.title) 
        {
          case "Home":
            DisplayHomePage();
            break;
          case "Contact Us":
            DisplayContactPage();
            break;
          case "Contact-List":
            DisplayContactListPage();
            break;
          case "About Us":
            DisplayAboutPage();
            break;
          case "Our Products":
            DisplayProductsPage();
            break;
          case "Our Services":
            DisplayServicesPage();
            break;
        }

        
    }
    window.addEventListener("load", Start);
})();