class Patient{
    constructor({
        id = null,
        name = '',
        cedula = '',
        phone = '',
        email = '', 
        address = '',
        createdat='',
        terapias_faltantes='',
        ultima_terapia = ''
        
    }){
        this.id = id;
        this.name = name;
        this.cedula = cedula;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.createdat = createdat;
        this.terapias_faltantes = terapias_faltantes;
        this.ultima_terapia = ultima_terapia;

     
    }
    
     // Método para actualizar los datos de la empresa
  update(data) {
    Object.assign(this, data);
  }
    
 

}

export default Patient;