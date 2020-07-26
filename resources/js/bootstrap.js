window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const client = require('pusher-js');

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '99ac8370b9aa803cb529',
    cluster: 'ap1',
    forceTLS: true,
    client: client,
    auth: {
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzNkY2IzYzZhOWI2Mzc4NzFkYzQ2ZGI1Y2ExODg4MTlhNGZlZTUzOWRhZjBiNGFlOTNhZWNhYjc2ODE1ZmViZDNhOTk2ODQ4MGM1Y2U2ZjgiLCJpYXQiOjE1OTMxNTgyOTUsIm5iZiI6MTU5MzE1ODI5NSwiZXhwIjoxNjI0Njk0Mjk1LCJzdWIiOiI5MDkwOTAiLCJzY29wZXMiOltdfQ.jRJQVjkL-JUONLEk47BTvV512r0SY2R5zER4i7t0coJKRnSLKDc5UDZEIu3eFL3BoxL4lKgN201QzdhhSeJjMNa_NRdbJpAb7gb9Fx8bnmmNufkX59hm2lfdMzCox2uizsDAVrmpHb7q9d6ZlFmBw0bD1Ow_xMqWaTmrbD5CaMAHnfZOTnJ8eN3EZp3JmhdETYnNfL1HCykQ2_nbQyvqFET2GlWpVpGh1sgaIsE6I2Kpqd1ArMXl8Wy1nEE6bdJG3A7Ce8UzrfF5_MAlZdLZ4VeyTCJo4wEuH-sVh08sF7fVo1SA0JSvWEQqScqIbkx6bscnbQLucvGvSqKAMmTMUZbaQgnZ8K-Kpdg6rPoxDRWQHS7wb-KEAToU84H6Kz-gT22mGqsdzhRpuu6oiguVYl-oMBTdPcx9peh67KEZx_uBJbJ0HiJAYY37PQD25RqPtFwKVfM1fW7BWLX04r1xWeJmnc_UToRE5NzKp-1BRPtT-HMtJa794DED7-vUbUOb1vxOzH8SQBgH08eL6VJmKiwR60jgzi9bxoaBIaeGZP-IWiziNR9TLoodhp7DtvA5--2OLVm9-MCDfzD7ntKVcgAHe3Ip7fMT401bkymVk4HKDmflRV7TUCOcf_AvKplAbQgXtorIIuXM7RtbXkdxPmSWzvJU6h7D9EBMvRFbIWE'
        },
    },
});

