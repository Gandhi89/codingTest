const EXTRA_BUNCH = "zzzzzz";
export default class Helper{

  constructor(){
    this.filteredData = [];
    this.DataA_Z = [];
    this.DataZ_A = [];
  }

/* ----------------------------------------------------------------------------- */

  // fetch data from URL
  async fetchDataFromURL(URL) {
  try {
    let response = await fetch(
      URL,
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
  }

/* ----------------------------------------------------------------------------- */

  // sort last_name from A to Z
  A_Z( a, b ) {
      if(a.last_name == null ){
        a.last_name = EXTRA_BUNCH
      }
      if(b.last_name == null ){
        b.last_name = EXTRA_BUNCH
      }
      if ( a.last_name < b.last_name ){
        return -1;
      }
      if ( a.last_name > b.last_name ){
        return 1;
      }
      return 0;
  }

/* ----------------------------------------------------------------------------- */

  // sort last_name from Z to A
  Z_A( a, b ) {
      if(a.last_name == null ){
        a.last_name = EXTRA_BUNCH
      }
      if(b.last_name == null ){
        b.last_name = EXTRA_BUNCH
      }
      if ( a.last_name > b.last_name ){
        return -1;
      }
      if ( a.last_name < b.last_name ){
        return 1;
      }
      return 0;
  }

/* ----------------------------------------------------------------------------- */

  // this function returns sorted (A_Z format) of customData
  getDataA_Z(data){
    this.emptyDataA_Z();
    for(let i=0; i<data.length; i++){
      this.DataA_Z.push(data[i]);
    }
    let tempA_Z =  this.DataA_Z.sort(this.A_Z);
    for(let i=0; i<tempA_Z.length; i++){
      if(tempA_Z[i].last_name == EXTRA_BUNCH){
        tempA_Z[i].last_name = null;
      }
    }
    return tempA_Z;
  }

/* ----------------------------------------------------------------------------- */

  // this function returns sorted (Z_A format) of customData
  getDataZ_A(data){
    this.emptyDataZ_A();
    for(let i=0; i<data.length; i++){
      this.DataZ_A.push(data[i]);
    }
    let tempZ_A = this.DataZ_A.sort(this.Z_A);
    for(let i=0; i<tempZ_A.length; i++){
      if(tempZ_A[i].last_name == EXTRA_BUNCH){
        tempZ_A[i].last_name = null;
      }
    }
    return tempZ_A;
  }

/* ----------------------------------------------------------------------------- */

  // filter out avatar_large == null
  getFilteredData(data){
    for(let i=0; i<data.length; i++){
      if(data[i].avatar_large){
          this.filteredData.push(data[i]);
      }
    }
    return this.filteredData;
  }

/* ----------------------------------------------------------------------------- */

  emptyDataA_Z(){
    this.DataA_Z = [];
  }

/* ----------------------------------------------------------------------------- */

  emptyDataZ_A(){
    this.DataZ_A = [];
  }

}
