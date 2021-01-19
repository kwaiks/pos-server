export default class AppError extends Error {
    public status: number;
    public code: string;
    public err: any;
    constructor(code: string, err?: any){
        super();
        this.err = err;
        this.message = errorDictionary[code].message || "";
        this.status = errorDictionary[code].status;
        this.code = code;
        this.name = "App Error";
    }
}

interface ErrorItem {
    message: string;
    status: number;
}

interface Errors {
    [key: string] : ErrorItem;
}

const errorDictionary: Errors = {
    "email_duplicate" : {
        message: "Email has been used",
        status: 406
    },
    "phone_duplicate" : {
        message: "Phone number has been used",
        status: 406
    },
    "user_not_found" : {
        message: "User not found",
        status: 404
    },
    "password_incorrect" : { 
        message: "Password Incorrect",
        status: 406
    },
    "store_not_found": {
        message: "Store not found",
        status: 404
    },
    "inventory_not_found": {
        message: "Inventory not found",
        status: 404
    }
};