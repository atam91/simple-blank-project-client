---
inject: true
to: src/config/resources.js
before: "/// HERE Inject Resources ///"
---
    <%= h.changeCase.camelCase(name) %>List: api.get('/admin/<%= h.changeCase.camelCase(name) %>'),
    <%= h.changeCase.camelCase(name) %>ShortList: api.get('/admin/<%= h.changeCase.camelCase(name) %>/short'),
    <%= h.changeCase.camelCase(name) %>CreateItem: api.post('/admin/<%= h.changeCase.camelCase(name) %>'),
    <%= h.changeCase.camelCase(name) %>Item: api.get('/admin/<%= h.changeCase.camelCase(name) %>/:id'),
    <%= h.changeCase.camelCase(name) %>EditItem: api.put('/admin/<%= h.changeCase.camelCase(name) %>/:id'),
    <%= h.changeCase.camelCase(name) %>DropItem: api.drop('/admin/<%= h.changeCase.camelCase(name) %>/:id'),
