const baseUrl = 'http://localhost:3000/';
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      throw { name: 'servicesError', message: data };
    }
  }
export default class DataService {
    constructor(endpoint){
        this.endpoint = endpoint;
        this.data = [];
    }
    async init(callback) {
        try {
            this.data = await this.getData();
            console.log(this.data);
            if(callback)
                callback(this.data);
        } catch (err) {
            console.log(err);
        }
    }
    async getData() {
        return await fetch(baseUrl+this.endpoint).then(convertToJson);
    }
    async postData(data) {
        try{
        const options = {
            method: 'POST',
            headers: {
                // if our server accepted FormData directly we would use the form header below
                // 'Content-Type': 'application/x-www-form-urlencoded'
                // since we are sending json we need to let the server know to expect that.
                'Content-Type': 'application/json'
            },
            // make sure to convert our object into a JSON string before sending it!
            body: JSON.stringify(data)
        }
            const results = await fetch(baseUrl + this.endpoint, options).then(convertToJson);
            return results;
        } catch (err) {
            console.log(err);
        }
    }
}