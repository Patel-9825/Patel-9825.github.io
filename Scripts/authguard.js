"use strict";
(function() 
{
    let protected_routes = [
        "contact-list"
    ];

    //console.log(protected_routes.indexOf(router.ActiveLink));

    if(protected_routes.indexOf(router.ActiveLink) > -1)
    {
        //check if user is logged in
        if(!sessionStorage.getItem("user"))
        {
            //redirect to login page
            location.href = "/login";
        }
    }

})();