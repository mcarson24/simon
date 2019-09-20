import Vue from 'vue';

import Simon from './components/Simon.vue';

Vue.component('simon', Simon);

const app = new Vue({
	el: '#app'
});
