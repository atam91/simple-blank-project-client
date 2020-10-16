---
inject: true
to: src/router.js
before: "/// HERE Inject View Components Import ///"
---
import Admin<%= h.changeCase.pascalCase(name) %> from './views/admin/<%= h.changeCase.pascalCase(name) %>';