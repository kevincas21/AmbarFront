class User{
     constructor({
        id = null,
        username = '',
        email = '',
        role = '',
        password = '',
       
    }){
        this.id = id;
        this.username = username;
       this.email = email;
        this.role = role;
        this.password = password;
     
     
    }
    
  update(data) {
    Object.assign(this, data);
  }

}
export default User;