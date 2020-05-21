import * as Constants from './../Config/Constants'
export default class CheckLogin {   
    
    getUserLogin = () => {        
        if (localStorage && localStorage.getItem(Constants.LOCAL_STORAGE_USER))
            return JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER));            
    }
    getToken = () => {
        const userLogin = this.getUserLogin();
        if (userLogin)
            return userLogin.token;
    }
    getProfile = () => {
        const userLogin = this.getUserLogin();
        if (userLogin)
            return userLogin.Auth;
    }
    getIsLogin = () => {
        const userLogin = this.getUserLogin();
        if (userLogin) {
           if(userLogin.islogin){
            return true
           }           
        }
        return false;
    }
    deleteUserLogin=()=>{
        if(this.getIsLogin){
            localStorage.removeItem(Constants.LOCAL_STORAGE_USER);
        }
    }
    checkRoute=(route)=>{
        let arrRoute = Constants.Arrayroute;
        let index = arrRoute.indexOf(route);
        console.log(index);        
        if(index != -1){
            if(this.getIsLogin){
                return true;
            }            
        }
        return false;

    }
}
