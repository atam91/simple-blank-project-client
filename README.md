# Simple Blank Project SPA client
The part of [Simple Blank Project](https://github.com/atam91/simple-blank-project).

# About
Adaptive SPA based on Vue/Vuetify with simple admin CRUDs implementation which can be [fast generated](#code-generation) into extensible code snippets. 


# Project setup
    npm install
    cp src/config/index{.example,}.js

## Compiles and hot-reloads for development
    npm run serve

## Compiles and minifies for production
    npm run build


# Additional information
## Used Icons
[material-design-icons-iconfont](https://www.npmjs.com/package/material-design-icons-iconfont)
fork of [Google's Material Design icons](https://material.io/resources/icons/)



# Project structure

    /src
        /api
            /admin - Admin CRUDs APIs
            /base - Base makeRequest implementation
            user.js - base user API
        /assets
        /components
            /crudTables
            /elements - Small reusable components 
                /inputs
            /pages - Custom entity pages
            AppBar.vue
            SideMenu.vue
        /config
            index.js - Main config file
            resources.js - Server REST-API resources definition (uses in /api/base/index.js:makeRequest thru string keys)
        /constants
        /helpers
            shortEntityTextMapper.js - Some entityToString conversions
        /plugins
            base.js - Behavior injected into all components
            elements.js - Some components shortcut registration 
            vuetify.js
        /services - Some wrappers
            localStorage.js
            logger.js
            session.js
            toast.js - Toast notifications
        /store
        /utils - Non-project specific useful things
        /views - Top level components for routes
        App.vue
        main.js
        router.js


# Code Generation
    npm i -g hygen
    
    hygen crudEntity new %someNameEntities%

## Example CRUD generation
    hygen crudEntity new coldRivers
    
    git add -A && git status
    ## Changes to be committed:
        new file:   src/api/admin/coldRivers.js                 - Add Admin CRUD API
        modified:   src/components/SideMenu.vue                 - Inject Link
        new file:   src/components/crudTables/ColdRivers.vue    - Add crudTable component
        modified:   src/config/resources.js                     - Inject REST-API resources definition
        modified:   src/router.js                               - Inject Route
        new file:   src/views/admin/ColdRivers.vu               - Add Top level route view

+ Do not forget sync ACTIONS with server `cp ../server/app/constants/actions.js ./src/constants/actions.js`


# Implementation examples
You can explore crudTables to see how collections can be extended:
+ Departments: extend form, join organization, organization filter.
+ Users: extend form, join organization & department, organization/department filter.
+ UserGroups: extend form, join organization & owner, organization/owner filter, separated pageComponent for entityItem.

