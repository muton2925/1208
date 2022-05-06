import Connect from "@/libs/http/apiConfig";

export class unverifiedCheck extends Connect {

    unverifiedList(){
        return super.get('basic/unverified_list/')
    }

    /**
     * @param { String[] } form
     * @returns
     */

    adminCheck(form){
        return super.post('basic/admin_check/', form)
    }

}

