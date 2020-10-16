---
inject: true
to: src/components/SideMenu.vue
before: "/// HERE Inject SideMenu Items ///"
---
        {
            title: '<%= h.changeCase.pascalCase(name) %>',
            to: '/admin/<%= h.changeCase.camelCase(name) %>',
            permission: ACTIONS.<%= h.changeCase.constantCase(name) %>_READ
        },
