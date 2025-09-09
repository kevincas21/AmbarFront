class Terapeuta{
    constructor({
        id = null,
        name = '',
        cedula = '',
        phone = '',
        email = '', 
        address = '',
        createdat='',
        
    }){
        this.id = id;
        this.name = name;
        this.cedula = cedula;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.createdat = createdat;

     
    }
    
     // Método para actualizar los datos de la empresa
  update(data) {
    Object.assign(this, data);
  }
    
 

}

export default Terapeuta;