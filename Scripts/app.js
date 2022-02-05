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


        // old way
        //let AboutUsButton = document.getElementById("AboutUsButton");
        // AboutUsButton.addEventListener("click", function()
        // {
        //     // redirect to about page
        //     location.href = "about.html";
        // });

        // JQuery way - returns all elements that contain an id of AboutUsButton - attach the "click" event to each of them
        $("#AboutUsButton").on("click", function()
        {
            location.href = "about.html";
        });

        // Javascript way
        // document.querySelectorAll("#AboutUsButton").forEach(function(element)
        // {
        //     element.addEventListener("click", function()
        //     {
        //         location.href = "about.html";
        //     })
        // });

        
        
        //step 1 get a reference to an entry point(s)
        // let MainContent = document.getElementsByTagName("main")[0];
        // let DocumentBody = document.body;

        //step 2 create an element
        // let MainParagraph = document.createElement("p");
        // let Article = document.createElement("article");
        // let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

        //step 3 configure new element
        // MainParagraph.setAttribute("id", "MainParagraph");
        // MainParagraph.setAttribute("class", "mt-3");
        // MainParagraph.textContent = "This is the main Paragraph";
        // Article.setAttribute("class", "container");

        //step 4 add/insert new element
        //MainContent.appendChild(MainParagraph);
        $("main").append(`<p id="MainParagraph" class="mt-3"> This is the main paragraph </p>`);
        //Article.innerHTML = ArticleParagraph;
        //DocumentBody.appendChild(Article);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3"> This is the Article paragraph </p> 
        </article>`);

        // Deletion example
        // document.getElementById("ArticleParagraph").remove();

        // let NewH1 = document.createElement("h1");
        // NewH1.setAttribute("class", "display-1");

        // MainContent.before(NewH1);

        // NewH1.textContent = "Hello, World!";


    }

    /**
     * Adds a contact object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
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
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
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
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click",function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }
                
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        let page = location.hash.substring(1);
        
        switch (page) 
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        
                        // Add Contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);

                        //Refresh the contact-list page
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }    
                break;
            
            default:
                {
                    // get the cointact info from localStorage
                    let contact = new Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // when Edit is pressed - update the record
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in localstorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact-list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                    
                }
                break;
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
          case "Edit":
            DisplayEditPage();
            break;
        
        }

        
    }
    window.addEventListener("load", Start);
})();