---
inject: true
to: src/router.js
before: "/// HERE Inject Routes ///"
---
    {
        path: '/admin/<%= h.changeCase.camelCase(name) %>',
        component: Admin<%= h.changeCase.pascalCase(name) %>,
        meta: { auth, headerBar, navigation }
    },