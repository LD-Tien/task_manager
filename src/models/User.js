class User {
  constructor(userData) {
    if (userData) {
      this._id = userData._id || "";
      this.email = userData.email || "";
      this.username = userData.username || "";
      this.password = userData.password || "";  

      this.login = async function () {
        return await fetch("/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this),
        })
          .then((res) => res.json())
          .catch(console.log);
      };

      this.signup = async function () {
        return await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this),
        })
          .then((res) => res.json())
          .catch(console.log);
      };
    } else {
      this._id = "";
      this.email = "";
      this.username = "";
      this.password = "";
      
      this.auth = async function () {
        return await fetch("/checkLoginToken")
          .then((res) => res.json())
          .catch(console.log);
      };
    }
  }
}

export default User;
