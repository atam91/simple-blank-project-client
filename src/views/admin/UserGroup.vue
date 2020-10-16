<style lang="stylus" scoped>
    .page
        width 100%;
</style>


<template>
    <div class="page">
        <user-group :id="id" />
    </div>
</template>


<script>
    import UserGroup from '../../components/pages/UserGroup/index';

    export default {
        components: { UserGroup },

        props: [ 'id' ]
    };
</script>