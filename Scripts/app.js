// IIFE - Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

    function DisplayHomePage()
    {
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

        //deletion example
        // document.getElementById("ArticleParagraph").remove();

        // let NewH1 = document.createElement("h1");
        // NewH1.setAttribute("class", "display-1");

        // MainContent.before(NewH1);

        // NewH1.textContent = "Hello, World!";
    }

    // named function
    function Start()
    {
        console.log("App Started!!");

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
        }

        
    }
    window.addEventListener("load", Start);
})();