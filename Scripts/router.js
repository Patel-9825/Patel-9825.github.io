(function(core){

    class Router
    {
        //

        /**
         *
         *
         * @returns {string}
         */
        get ActiveLink()
        {
            return this.m_activeLink;
        }

        /**
         *
         *
         * @param {string} link
         */
        set ActiveLink(link)
        {
            this.m_activeLink = link;
        }

        //constructor

        /**
         * Creates an instance of Router.
         * @constructor
         */
        constructor()
        {
            this.ActiveLink = "";
        }

        //public methods

        /**
         * This method adds a new Route to the Routing Table
         *
         * @param {string} route
         * @returns {void}
         */
        Add(route)
        {
            this.m_routingTable.push(route);
        }

        /**
         * This replaces the currrent Routing table object (if it exists) with a reference to a new 
         * string array of routes
         * Routes should beign with the `/` character
         * 
         * @param {string[]} routingTable 
         * @returns {void}
         */
        AddTable(routingTable)
        {
            this.m_routingTable = routingTable;
        }

        /**
         *This method finds the index of the route in the routing table
         otherwise, it returns -1 if the route is not found
         *
         * @param {*} route
         * @returns {number}
         */
        Find(route)
        {
            return this.m_routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the Routing table
         *
         * @param {*} route
         * @returns {boolean}
         */
        Remove(route)
        {
            if(this.Find(route) > -1)
            {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        // public override functions

        /**
         * This method returns the routing table as a comma-separated string
         *
         * @returns {string}
         */
        toString()
        {
            return this.m_routingTable.toString();
        }
    }

    core.Router = Router;
})(core || (core = {}));

let router = new core.Router();
router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/products",
    "/login",
    "/register",
    "/edit"
]);

let route = location.pathname; // alias for location.pathname

if(router.Find(route) > -1)
{
    router.ActiveLink = (route == "/") ? "home" : route.substring(1);
}
else
{
    router.ActiveLink = "404";
}