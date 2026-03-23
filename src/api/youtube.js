import axios from 'axios';

const KEY = 'AIzaSyCP1YB5VoAg5wR9AAWnezMagd1UxysN_Qc';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY,
        type: 'video'
    }
});