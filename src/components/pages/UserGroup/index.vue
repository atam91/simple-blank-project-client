<template>
    <div>
        <user-group-form :id="id" @item="item = $event" />

        <user-group-users :user-group-id="id" :user-group="item" />
    </div>
</template>


<script>
    import UserGroupForm from './UserGroupForm';
    import UserGroupUsers from './UserGroupUsers';

    export default {
        components: {
            UserGroupForm,
            UserGroupUsers,
        },

        props: [ 'id' ],

        data: () => ({
            item: {}
        }),
    }
</script>
