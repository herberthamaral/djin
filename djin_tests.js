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
      ok(Djin.createTable('person',{'id':'pk'}));
    });
  
  module('Data Manipulation Module');
  test("Try to create a record in person's table",
      function(){
        ok(Djin.add('person',{'id':null}));
      } );
}
