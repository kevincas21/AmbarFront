class Turno{
     constructor({
        id = null,
        cedula = '',
        client = '',
        createdat = '',
        numero_turno = ''
        
    }){
        this.id = id;
        this.cedula = cedula;
       this.client = client;
        this.createdat = createdat;
        this.numero_turno = numero_turno;

     
    }

}
export default Turno;