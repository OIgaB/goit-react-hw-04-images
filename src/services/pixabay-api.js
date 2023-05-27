import axios from "axios";

const API_KEY = '35060250-d524e63ae3659c305fff44fad';
const BASE_URL = 'https://pixabay.com/api/';

//'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12'

const fetchImages = async (query, pageNumber) => {
    try {
        return await axios.get(`${BASE_URL}`, {   //або const response = ... , а в кінці  return response.data; 
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: pageNumber,
                per_page: 12,
            },
        });
    } catch(error) {
        throw new Error(error.message);
    }

    // Якщо без axios:
    // ...
    // .then(response => {
    //     if(response.ok) {
    //         return response.json();
    //     }
    //     return Promise.reject(new Error(`Немає зображень з назвою ${query}`)); 
    // })
}

const api = {
    fetchImages,
};

export default api;