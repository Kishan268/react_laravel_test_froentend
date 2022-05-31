import axios from "./config";
import cookies from "js-cookie";
class AuthRepository {
    async UserRegister(params) {
        
        const reponse = await axios.post(`/admin/register`, params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return reponse;
    }

    async UserLogin(credentials) {
        
        const reponse = await axios.post(`/admin/login`, credentials)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return reponse;
    }

    async BookRegister(params) {
        
        const reponse = await axios.post(`/admin/add_books`, params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return reponse;
    }
    async userBooksListing(data) {
        const reponse = await axios.get(`admin/get_books/${data.user_id}`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.log(error.response);
            return error.response;
          });
        return reponse;
      }

}
export default new AuthRepository();