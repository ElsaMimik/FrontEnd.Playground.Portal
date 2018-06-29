<template>
  <div id="app">
    <h1>{{name}} welcome to vue's world</h1>
    <br>
    <h2>total user profile: [{{profileCount}}] rows</h2>
    <br>
    <h3>{{errorMessage}}</h3>
  </div>
</template>

<script>

import axios from 'axios'

class UserProfile {
  static async getCount() {
    return axios.create({
      baseURL: '/api/v1/'
    }).request({
      url: 'user/profile-count',
      method: 'get'
    });
  }
};

export default {
  data() {
    return {
      name: 'alpha',
      profileCount: 0,
      errorMessage: 'no error'
    };
  },
  mounted() {
    // UserProfile.getCount().then(response => {
    //   this.profileCount = response.data;
    // }).catch(error => {
    //   this.errorMessage = error.toString();
    // });
  }
};
</script>
