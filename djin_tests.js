allDjinTests = function()
{
  //var djin = new Djin();
  module('Data Definition Module');
  test("Initialize an empty Database",
      function(){
        ok(Djin.create("myDataBase"),"Create a new database with 5MB of storage (default)");

      });

  test("Try to create a table with only one field in current database",
    function(){
      var tableMetaData = {'id':'pk'};
      ok(Djin.createTable('person',tableMetaData));
      equals(localStorage.getItem('myDataBaseMetaData_table_person'),serialize(tableMetaData),'Checks database metadata in localStorage');
    });
  
  

  module('Data Manipulation Module');
  test("Try to create a record in person's table",
      function(){
        ok(Djin.add('person',{'id':null}));
      } );
}
