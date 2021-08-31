import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      query:"",
      dataTable: [{name:"AZUL", id: "TCBIJ", stock:4866,price:5637},
                  {name:"ROJO", id: "AFINV", stock:375,price:8642},
                  {name:"AMARILLO", id: "QONDA", stock:674,price:7554},
                  {name:"VERDE", id: "ZNYRD", stock:234,price:7554},
                  {name:"AZUL", id: "PLHSB", stock:875,price:3654},
                  {name:"ROSA", id: "NLHDN", stock:875,price:7529},
                  {name:"MORADO", id: "DJTGF", stock:653,price:8626}
                  ]
    }
  }
//setea la variable username
  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  }
//setea la variable password
  handlePasswordChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }
//evt submit 
  handleSubmit(evt) {
    console.log(this.state.username);
    console.log(this.state.password);
    evt.preventDefault();
  }
//setea la variable query
  handleFilterChange(evt) {
    this.setState({
      query: evt.target.value,
    });  
  }

  //Detecta la actualización en la variable query para poder ir realizando el filtrado de la tabla
  componentDidUpdate(){
    if(this.state.query!==""){
      let auxQuery=this.state.query.toLowerCase().trim();
      let auxTable=document.getElementById("table").getElementsByTagName("tbody")[0].rows;
      for(let i=0; i<auxTable.length; i++){
        let tr = auxTable[i];
        let tableString = (tr.innerText).toLowerCase().trim();
          if(tableString.indexOf(auxQuery)>=0){
            document.getElementById("row"+i).style.display="block";          
            document.getElementById("row"+i).style.display="table-row";          
          }else{
            document.getElementById("row"+i).style.display="none";

          }
      }
    }else{
      //en caso de que query="" muestra la tabla completa
      let auxTable=document.getElementById("table").getElementsByTagName("tbody")[0].rows;
      for(let i=0; i<auxTable.length; i++){
        document.getElementById("row"+i).style.display="block";          
        document.getElementById("row"+i).style.display="table-row";          
      }
    }

  }

//retorna la tabla con los datos previamente cargados en la variable dataTable
  createTable(x){
    let lista=[];
    let data=this.state.dataTable;
    if(data.length!==0){
      data.forEach(function(value,key){
        let auxID="row"+key;
        lista.push(
            <tr key={key} id={auxID}>
              <td>{value.name}</td>
              <td>{value.id}</td>
              <td>{value.stock}</td>
              <td>{value.price}</td>
            </tr>
            );
        });
      return lista;
    }
  }
//login y ejemplo de tabla con filtro
  render() {
    return (
      <div className="App">
        <header className="head">
          <form  onSubmit={this.handleSubmit.bind(this)} id="login">   
            <div>
              <label>Username:</label>
              <input type= "text" onChange={this.handleUserChange.bind(this)} className="hinput"/> 
              <label>Password:</label>
              <input type="password" onChange={this.handlePasswordChange.bind(this)} className="hinput"/>
              <button  type="submit" data-test="submit" className="btnSubmit">Sign in</button>
            </div>
          </form>
        </header> 
        
        <div>
          <div className="table-responsive" id="mainTable">
             <table style={{textAlign:"center"}}  className="table" id="table">
               <thead>
                  <tr>
                    <td colSpan="4"><input className="table" type="text" id="filter" placeholder="Search" onKeyUp={this.handleFilterChange.bind(this)}/></td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Stock</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.createTable(this)}
                </tbody>
             </table>
            </div> 
        </div>
      </div>
    );
  }
}
export default App;
